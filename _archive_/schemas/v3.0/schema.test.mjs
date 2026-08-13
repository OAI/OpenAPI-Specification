import { readdirSync, readFileSync } from "node:fs";
import { describe, test, expect } from "@oai/build-infra/test";
import {
  addMediaTypePlugin,
  BASIC,
  buildSchemaDocument,
  contentTypeParser,
  setMetaSchemaOutputFormat,
  validate,
  YAML
} from "@oai/build-infra/schema/openapi-3-0-test";

addMediaTypePlugin("application/schema+yaml", {
    parse: async (response) => {
      const contentType = contentTypeParser.parse(response.headers.get("content-type") ?? "");
      const contextDialectId = contentType.parameters.schema ?? contentType.parameters.profile;
  
      const foo = YAML.parse(await response.text());
      return buildSchemaDocument(foo, response.url, contextDialectId);
    },
    fileMatcher: (path) => path.endsWith(".yaml")
  });

const parseYamlFromFile = (filePath) => {
    const schemaYaml = readFileSync(filePath, "utf8");
    return YAML.parse(schemaYaml, { prettyErrors: true });
};

setMetaSchemaOutputFormat(BASIC);

const validateOpenApi = await validate("./_archive_/schemas/v3.0/schema.yaml");
const folder = './_archive_/schemas/v3.0/pass/';

describe("pass", async () => {
    readdirSync(folder, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
        .forEach((entry) => {
            test(entry.name, () => {
                const instance = parseYamlFromFile(folder + entry.name);
                const output = validateOpenApi(instance, BASIC);
                expect(output.valid).to.equal(true);
            });
        });
});
