import { readdir, readFile } from "node:fs/promises";
import YAML from "yaml";
import { join } from "node:path";
import { argv } from "node:process";
import "@hyperjump/json-schema/draft-2020-12";
import "@hyperjump/json-schema/draft-04";
import {
  compile,
  getSchema,
  interpret,
  Validation,
  BASIC,
} from "@hyperjump/json-schema/experimental";
import * as Instance from "@hyperjump/json-schema/instance/experimental";

/**
 * @import { AST } from "@hyperjump/json-schema/experimental"
 * @import { Json } from "@hyperjump/json-schema"
 */

import contentTypeParser from "content-type";
import { addMediaTypePlugin } from "@hyperjump/browser";
import { buildSchemaDocument } from "@hyperjump/json-schema/experimental";

addMediaTypePlugin("application/schema+yaml", {
  parse: async (response) => {
    const contentType = contentTypeParser.parse(
      response.headers.get("content-type") ?? "",
    );
    const contextDialectId =
      contentType.parameters.schema ?? contentType.parameters.profile;

    const foo = YAML.parse(await response.text());
    return buildSchemaDocument(foo, response.url, contextDialectId);
  },
  fileMatcher: (path) => path.endsWith(".yaml"),
});

/** @type (testDirectory: string) => AsyncGenerator<[string,Json]> */
const tests = async function* (testDirectory) {
  for (const file of await readdir(testDirectory, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!file.isFile() || !file.name.endsWith(".yaml")) {
      continue;
    }

    const testPath = join(file.parentPath, file.name);
    const testJson = await readFile(testPath, "utf8");

    yield [testPath, YAML.parse(testJson)];
  }
};

/** @type (testDirectory: string) => Promise<void> */
const runTests = async (testDirectory) => {
  for await (const [name, test] of tests(testDirectory)) {
    const instance = Instance.fromJs(test);

    const result = interpret(compiled, instance, BASIC);

    if (!result.valid) {
      console.log("Failed:", name, result.errors);
    }
  }
};

/** @type (ast: AST) => string[] */
const keywordLocations = (ast) => {
  /** @type string[] */
  const locations = [];
  for (const schemaLocation in ast) {
    if (schemaLocation === "metaData") {
      continue;
    }

    if (Array.isArray(ast[schemaLocation])) {
      for (const keyword of ast[schemaLocation]) {
        if (Array.isArray(keyword)) {
          locations.push(keyword[1]);
        }
      }
    }
  }

  return locations;
};

///////////////////////////////////////////////////////////////////////////////

const schema = await getSchema(argv[2]);
const compiled = await compile(schema);

/** @type Set<string> */
const visitedLocations = new Set();
const baseInterpret = Validation.interpret;
Validation.interpret = (url, instance, ast, dynamicAnchors, quiet) => {
  if (Array.isArray(ast[url])) {
    for (const keywordNode of ast[url]) {
      if (Array.isArray(keywordNode)) {
        visitedLocations.add(keywordNode[1]);
      }
    }
  }
  return baseInterpret(url, instance, ast, dynamicAnchors, quiet);
};

await runTests(argv[3]);
Validation.interpret = baseInterpret;

// console.log("Covered:", visitedLocations);

const allKeywords = keywordLocations(compiled.ast);
const notCovered = allKeywords.filter(
  (location) => !visitedLocations.has(location),
);
if (notCovered.length > 0) {
  console.log("NOT Covered:", notCovered.length, "of", allKeywords.length);
  const maxNotCovered = 20;
  const firstNotCovered = notCovered.slice(0, maxNotCovered);
  if (notCovered.length > maxNotCovered) firstNotCovered.push("...");
  console.log(firstNotCovered);
}

console.log(
  "Covered:",
  visitedLocations.size,
  "of",
  allKeywords.length,
  "(" + Math.floor((visitedLocations.size / allKeywords.length) * 100) + "%)",
);
