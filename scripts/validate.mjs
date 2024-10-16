#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import YAML from "yaml";
import { setMetaSchemaOutputFormat, validate } from "@hyperjump/json-schema/openapi-3-1";
import { BASIC } from "@hyperjump/json-schema/experimental";

import contentTypeParser from "content-type";
import { addMediaTypePlugin } from "@hyperjump/browser";
import { buildSchemaDocument } from "@hyperjump/json-schema/experimental";

addMediaTypePlugin("application/schema+yaml", {
    parse: async (response) => {
      const contentType = contentTypeParser.parse(response.headers.get("content-type") ?? "");
      const contextDialectId = contentType.parameters.schema ?? contentType.parameters.profile;
  
      const foo = YAML.parse(await response.text());
      return buildSchemaDocument(foo, response.url, contextDialectId);
    },
    fileMatcher: (path) => path.endsWith(".yaml")
  });

const defaultOutputFormat = BASIC;

if (process.argv.length < 3) {
  console.log(`Usage: validate [--schema=schema] [--format=${defaultOutputFormat}] path-to-file.yaml`);
  console.log("\t--schema: (schema (default) | schema-base) The name of the schema file to use");
  console.log(`\t--format: (Default: ${defaultOutputFormat}) The JSON Schema output format to use. Options: FLAG, BASIC, DETAILED, VERBOSE`);
  process.exit(1);
}

const args = process.argv.reduce((acc, arg) => {
  if (!arg.startsWith("--")) return acc;

  const [argName, argValue] = arg.substring(2).split("=", 2);
  return { ...acc, [argName]: argValue };
}, {});

const schemaType = args.schema || "schema";
const outputFormat = args.format || defaultOutputFormat;

// Config
setMetaSchemaOutputFormat(outputFormat);

// Compile / meta-validate
const validateOpenApi = await validate(`./schemas/v3.1/${schemaType}.yaml`);

// Validate instance
const instanceYaml = await readFile(`${process.argv[process.argv.length - 1]}`, "utf8");
const instance = YAML.parse(instanceYaml);
const results = validateOpenApi(instance, outputFormat);
console.log(JSON.stringify(results, null, "  "));
