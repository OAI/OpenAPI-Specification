import { readdirSync, readFileSync } from "node:fs";
import YAML from "yaml";
import { registerSchema, validate, setMetaSchemaOutputFormat } from "@hyperjump/json-schema/openapi-3-1";
import { BASIC, addKeyword, defineVocabulary } from "@hyperjump/json-schema/experimental";
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

addKeyword({
  id: "https://spec.openapis.org/oas/schema/vocab/keyword/discriminator",
  interpret: (discriminator, instance, context) => {
    return true;
  },
  /* discriminator is not exactly an annotation, but it's not allowed
   * to change the validation outcome (hence returing true from interopret())
   * and for our purposes of testing, this is sufficient.
   */
  annotation: (discriminator) => {
    return discriminator;
  },
});

addKeyword({
  id: "https://spec.openapis.org/oas/schema/vocab/keyword/example",
  interpret: (example, instance, context) => {
    return true;
  },
  annotation: (example) => {
    return example;
  },
});

addKeyword({
  id: "https://spec.openapis.org/oas/schema/vocab/keyword/externalDocs",
  interpret: (externalDocs, instance, context) => {
    return true;
  },
  annotation: (externalDocs) => {
    return externalDocs;
  },
});

addKeyword({
  id: "https://spec.openapis.org/oas/schema/vocab/keyword/xml",
  interpret: (xml, instance, context) => {
    return true;
  },
  annotation: (xml) => {
    return xml;
  },
});

defineVocabulary(
  "https://spec.openapis.org/oas/3.2/vocab/base",
  {
    "discriminator": "https://spec.openapis.org/oas/schema/vocab/keyword/discriminator",
    "example": "https://spec.openapis.org/oas/schema/vocab/keyword/example",
    "externalDocs": "https://spec.openapis.org/oas/schema/vocab/keyword/externalDocs",
    "xml": "https://spec.openapis.org/oas/schema/vocab/keyword/xml",
  },
);

registerSchema(parseYamlFromFile("./src/schemas/validation/meta.yaml"));
registerSchema(parseYamlFromFile("./src/schemas/validation/dialect.yaml"));
registerSchema(parseYamlFromFile("./src/schemas/validation/schema.yaml"));
const validateOpenApi = await validate("./src/schemas/validation/schema-base.yaml");
const fixtures = './tests/schema';

describe("v3.2", () => {
  describe("Pass", () => {
    readdirSync(`${fixtures}/pass`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
      .forEach((entry) => {
        test(entry.name, () => {
          const instance = parseYamlFromFile(`${fixtures}/pass/${entry.name}`);
          const output = validateOpenApi(instance, BASIC);
          expect(output).to.deep.equal({ valid: true });
        });
      });
  });

  describe("Fail", () => {
    readdirSync(`${fixtures}/fail`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
      .forEach((entry) => {
        test(entry.name, () => {
          const instance = parseYamlFromFile(`${fixtures}/fail/${entry.name}`);
          const output = validateOpenApi(instance, BASIC);
          expect(output.valid).to.equal(false);
        });
      });
  });
});
