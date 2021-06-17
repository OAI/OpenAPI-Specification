#!/usr/bin/env node

const fs = require("fs");
const yaml = require("yaml");
const JsonSchema = require("@hyperjump/json-schema");
const dialect = require("../schemas/v3.1/dialect/base.schema.json");
const vocabulary = require("../schemas/v3.1/meta/base.schema.json");


if (process.argv.length < 3) {
  console.log("Usage: validate [--schema=schema] [--version=2021-03-02] [--format=BASIC] path-to-file.yaml");
  console.log("\t--schema: (Default: schema) The name of the yaml schema file to use");
  console.log("\t--version: (Default: 2021-03-02) The version of the yaml schema file to use");
  console.log("\t--format: (Default: BASIC) The JSON Schema output format to use. Options: FLAG, BASIC, DETAILED, VERBOSE");
  process.exit(1);
}

const args = process.argv.reduce((acc, arg) => {
  if (!arg.startsWith("--")) return acc;

  const [argName, argValue] = arg.substring(2).split("=", 2);
  return { ...acc, [argName]: argValue };
}, {});

(async function () {
  try {
    const schemaType = args.schema || "schema";
    const schemaVersion = args.version || "2021-03-02";
    const outputFormat = args.format || JsonSchema.BASIC;

    // Config
    JsonSchema.setMetaOutputFormat(outputFormat);
    //JsonSchema.setShouldMetaValidate(false);

    // Load schemas
    JsonSchema.add(dialect);
    JsonSchema.add(vocabulary);
    fs.readdirSync(`${__dirname}/../schemas/v3.1`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
      .map((entry) => fs.readFileSync(`${__dirname}/../schemas/v3.1/${entry.name}`, "utf8"))
      .map((schemaYaml) => yaml.parse(schemaYaml))
      .forEach((schema) => JsonSchema.add(schema));

    // Compile / meta-validate
    const schema = await JsonSchema.get(`https://spec.openapis.org/oas/3.1/${schemaType}/${schemaVersion}`);
    const validateSchema = await JsonSchema.validate(schema);

    // Validate instance
    const instanceYaml = fs.readFileSync(`${process.cwd()}/${process.argv[process.argv.length - 1]}`, "utf8");
    const instance = yaml.parse(instanceYaml);
    const results = validateSchema(instance, outputFormat);
    console.log(JSON.stringify(results, null, "  "));
  } catch (error) {
    console.log("************* Error ***************");
    console.log(error);
    console.log(JSON.stringify(error.output, null, "  "));
  }
}());
