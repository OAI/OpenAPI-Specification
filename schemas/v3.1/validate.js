const fs = require("fs");
const yaml = require("yaml");
const JsonSchema = require("@hyperjump/json-schema");
const dialect = require("./dialect/base.schema.json");
const vocabulary = require("./meta/base.schema.json");


JsonSchema.setMetaOutputFormat(JsonSchema.BASIC);
//JsonSchema.setShouldMetaValidate(false);

(async function () {
  try {
    // Compile / meta-validate
    JsonSchema.add(dialect);
    JsonSchema.add(vocabulary);
    JsonSchema.add(yaml.parse(fs.readFileSync(`${__dirname}/schema.yaml`, "utf8")));
    const schema = await JsonSchema.get("https://spec.openapis.org/oas/3.1/schema/2021-03-02");
    const validateSchema = await JsonSchema.validate(schema);

    // Validate instance
    const instance = yaml.parse(fs.readFileSync(`${__dirname}/${process.argv[2]}`, "utf8"));
    const results = validateSchema(instance, JsonSchema.BASIC);
    console.log(JSON.stringify(results, null, "  "));
  } catch (error) {
    console.log("************* Error ***************");
    console.log(error);
    console.log(JSON.stringify(error.output, null, "  "));
    //console.log(error.output);
  }
}());
