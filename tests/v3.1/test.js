const fs = require("fs");
const yaml = require("yaml");
const JsonSchema = require("@hyperjump/json-schema");
const { expect } = require("chai");
const dialect = require("../../schemas/v3.1/dialect/base.schema.json");
const vocabulary = require("../../schemas/v3.1/meta/base.schema.json");


JsonSchema.setMetaOutputFormat(JsonSchema.BASIC);
//JsonSchema.setShouldMetaValidate(false);

let metaSchema;
before(async () => {
  JsonSchema.add(dialect);
  JsonSchema.add(vocabulary);
  JsonSchema.add(yaml.parse(fs.readFileSync(`${__dirname}/../../schemas/v3.1/schema.yaml`, "utf8"), { prettyErrors: true }));
  metaSchema = await JsonSchema.get("https://spec.openapis.org/oas/3.1/schema/2021-03-02");
});

describe("Pass", () => {
  fs.readdirSync(`${__dirname}/pass`, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
    .forEach((entry) => {
      const file = `${__dirname}/pass/${entry.name}`;

      it(entry.name, async () => {
        const instance = yaml.parse(fs.readFileSync(file, "utf8"));

        const output = await JsonSchema.validate(metaSchema, instance, JsonSchema.BASIC);
        expect(output.valid).to.equal(true);
      });
    });
});

describe("Fail", () => {
  fs.readdirSync(`${__dirname}/fail`, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
    .forEach((entry) => {
      const file = `${__dirname}/fail/${entry.name}`;

      it(entry.name, async () => {
        const instance = yaml.parse(fs.readFileSync(file, "utf8"));

        const output = await JsonSchema.validate(metaSchema, instance);
        expect(output.valid).to.equal(false);
      });
    });
});
