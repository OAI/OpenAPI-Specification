import { readFileSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import YAML from "yaml";
import { join } from "node:path";
import { argv } from "node:process";
import { registerSchema, validate } from "@hyperjump/json-schema/openapi-3-1";
import "@hyperjump/json-schema/draft-04";
import { BASIC, defineVocabulary } from "@hyperjump/json-schema/experimental";

/**
 * @import { EvaluationPlugin } from "@hyperjump/json-schema/experimental"
 * @import { Json } from "@hyperjump/json-pointer"
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

/** @implements EvaluationPlugin */
class TestCoveragePlugin {
  constructor() {
    /** @type Set<string> */
    this.visitedLocations = new Set();
  }

  beforeSchema(_schemaUri, _instance, context) {
    if (this.allLocations) {
      return;
    }

    /** @type Set<string> */
    this.allLocations = [];

    for (const schemaLocation in context.ast) {
      if (
        schemaLocation === "metaData" ||
        // Do not require coverage of standard JSON Schema
        schemaLocation.includes("json-schema.org") ||
        // Do not require coverage of default $dynamicAnchor
        // schemas, as they are not expected to be reached
        schemaLocation.endsWith("/schema/WORK-IN-PROGRESS#/$defs/schema")
      ) {
        continue;
      }

      if (Array.isArray(context.ast[schemaLocation])) {
        for (const keyword of context.ast[schemaLocation]) {
          if (Array.isArray(keyword)) {
            this.allLocations.push(keyword[1]);
          }
        }
      }
    }
  }

  beforeKeyword([, schemaUri]) {
    this.visitedLocations.add(schemaUri);
  }
}

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

/**
 * @typedef {{
 *   allLocations: string[];
 *   visitedLocations: Set<string>;
 * }} Coverage
 */

/** @type (schemaUri: string, testDirectory: string) => Promise<Coverage> */
const runTests = async (schemaUri, testDirectory) => {
  const testCoveragePlugin = new TestCoveragePlugin();
  const validateOpenApi = await validate(schemaUri);

  for await (const [name, test] of tests(testDirectory)) {
    const result = validateOpenApi(test, {
      outputFormat: BASIC,
      plugins: [testCoveragePlugin],
    });

    if (!result.valid) {
      console.log("Failed:", name, result.errors);
    }
  }

  return {
    allLocations: testCoveragePlugin.allLocations ?? new Set(),
    visitedLocations: testCoveragePlugin.visitedLocations
  };
};

const parseYamlFromFile = (filePath) => {
  const schemaYaml = readFileSync(filePath, "utf8");
  return YAML.parse(schemaYaml, { prettyErrors: true });
};

const meta = parseYamlFromFile("./src/schemas/validation/meta.yaml");
const oasBaseVocab = Object.keys(meta.$vocabulary)[0];

defineVocabulary(oasBaseVocab, {
  "discriminator": "https://spec.openapis.org/oas/3.0/keyword/discriminator",
  "example": "https://spec.openapis.org/oas/3.0/keyword/example",
  "externalDocs": "https://spec.openapis.org/oas/3.0/keyword/externalDocs",
  "xml": "https://spec.openapis.org/oas/3.0/keyword/xml"
});

registerSchema(meta);
registerSchema(parseYamlFromFile("./src/schemas/validation/dialect.yaml"));
registerSchema(parseYamlFromFile("./src/schemas/validation/schema.yaml"));

///////////////////////////////////////////////////////////////////////////////

const { allLocations, visitedLocations } = await runTests(argv[2], argv[3]);
const notCovered = allLocations.filter(
  (location) => !visitedLocations.has(location),
);
if (notCovered.length > 0) {
  console.log("NOT Covered:", notCovered.length, "of", allLocations.length);
  const maxNotCovered = 20;
  const firstNotCovered = notCovered.slice(0, maxNotCovered);
  if (notCovered.length > maxNotCovered) firstNotCovered.push("...");
  console.log(firstNotCovered);
  process.exitCode = 1;
}

console.log(
  "Covered:",
  (allLocations.length - notCovered.length),
  "of",
  allLocations.length,
  "(" + Math.floor(((allLocations.length - notCovered.length) / allLocations.length) * 100) + "%)",
);
