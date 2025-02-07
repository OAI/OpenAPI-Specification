import { readdirSync, readFileSync } from "node:fs";
import YAML from "yaml";
import { validate as validate30 } from "@hyperjump/json-schema/openapi-3-0";
import { validate as validate31, setMetaSchemaOutputFormat } from "@hyperjump/json-schema/openapi-3-1";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { describe, test, expect } from "vitest";

import contentTypeParser from "content-type";
import { addMediaTypePlugin } from "@hyperjump/browser";
import { buildSchemaDocument } from "@hyperjump/json-schema/experimental";
import { validate } from "mdv";

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

const SCHEMAS = [
  { schema: "./schemas/v3.0/schema.yaml", fixtures: "./tests/schemas/v3.0", validate: validate30 },
  { schema: "./schemas/v3.1/schema.yaml", fixtures: "./tests/schemas/v3.1" },
  { schema: "./src/schemas/validation/schema.yaml", fixtures: "./tests/schemas/dev" }
];


for (const s of SCHEMAS) {
  const validate = s.validate || validate31;
  const validateOpenApi = await validate(s.schema);
  const folder = s.fixtures;

  describe(folder, () => {
    describe("Pass", () => {
      readdirSync(`${folder}/pass`, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
        .forEach((entry) => {
          test(entry.name, () => {
            const instance = parseYamlFromFile(`${folder}/pass/${entry.name}`);
            const output = validateOpenApi(instance, BASIC);
            expect(output).to.deep.equal({ valid: true });
          });
        });
    });

    describe("Fail", () => {
      readdirSync(`${folder}/fail`, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
        .forEach((entry) => {
          test(entry.name, () => {
            const instance = parseYamlFromFile(`${folder}/fail/${entry.name}`);
            const output = validateOpenApi(instance, BASIC);
            expect(output.valid).to.equal(false);
          });
        });
    });
  });
}
