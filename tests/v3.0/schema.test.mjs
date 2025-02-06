import { readdirSync, readFileSync } from "node:fs";
import YAML from "yaml";
import { validate, setMetaSchemaOutputFormat } from "@hyperjump/json-schema/openapi-3-0";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { describe, test, expect } from "vitest";

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

const parseYamlFromFile = (filePath) => {
    const schemaYaml = readFileSync(filePath, "utf8");
    return YAML.parse(schemaYaml, { prettyErrors: true });
};

setMetaSchemaOutputFormat(BASIC);

const validateOpenApi = await validate("./schemas/v3.0/schema.yaml");
const folder = './tests/v3.0/pass/';

describe("pass", async () => {
    readdirSync(folder, { withFileTypes: true })
        .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
        .forEach((entry) => {
            test(entry.name, () => {
                const instance = parseYamlFromFile(folder + entry.name);
                const output = validateOpenApi(instance, BASIC);
                expect(output).to.deep.equal({ valid: true });
            });
        });
});
