import { readdirSync, readFileSync } from "node:fs";
import YAML from "yaml";
import { describe, test, expect } from "vitest";
import { defineVocabulary, registerSchema } from "@hyperjump/json-schema-coverage/vitest";

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

await registerSchema("./src/schemas/validation/meta.yaml");
await registerSchema("./src/schemas/validation/dialect.yaml");
await registerSchema("./src/schemas/validation/schema.yaml");
await registerSchema("./src/schemas/validation/schema-base.yaml");
const fixtures = './tests/schema';

describe("v3.1", () => {
  describe("Pass", () => {
    readdirSync(`${fixtures}/pass`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
      .forEach((entry) => {
        test(entry.name, async () => {
          const instance = parseYamlFromFile(`${fixtures}/pass/${entry.name}`);
          await expect(instance).to.matchJsonSchema("https://spec.openapis.org/oas/3.1/schema-base/WORK-IN-PROGRESS");
        });
      });
  });

  describe("Fail", () => {
    readdirSync(`${fixtures}/fail`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
      .forEach((entry) => {
        test(entry.name, async () => {
          const instance = parseYamlFromFile(`${fixtures}/fail/${entry.name}`);
          await expect(instance).to.not.matchJsonSchema("https://spec.openapis.org/oas/3.1/schema-base/WORK-IN-PROGRESS");
        });
      });
  });
});
