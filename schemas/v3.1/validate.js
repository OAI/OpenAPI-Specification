const JsonSchema = require("@hyperjump/json-schema");
JsonSchema.setMetaOutputFormat(JsonSchema.BASIC);
JsonSchema.setShouldMetaValidate(false);
(async function () {
  try {
    // Compile / meta-validate
    const schema = await JsonSchema.get(`file://${__dirname}/schema.json`);
    const validateSchema = await JsonSchema.validate(schema);
    // Validate instance
    const instance = "";
    const results = validateSchema(instance, JsonSchema.DETAILED);
    console.log(JSON.stringify(results, null, "  "));
  } catch (error) {
    console.log("************* Error ***************");
    console.log(error);
    console.log(JSON.stringify(error.output, null, "  "));
    //console.log(error.output);
  }
}());
