import { readdirSync, readFileSync } from "node:fs";
import YAML from "yaml";
import { describe, test, expect } from "vitest";
import { registerSchema } from "@hyperjump/json-schema-coverage/vitest";
import registerOasSchema from "./oas-schema.mjs";

const parseYamlFromFile = (filePath) => {
  const schemaYaml = readFileSync(filePath, "utf8");
  return YAML.parse(schemaYaml, { prettyErrors: true });
};

await registerOasSchema();
await registerSchema("./src/schemas/validation/schema.yaml");
const fixtures = './tests/schema';

describe("v3.2", () => {
  test("schema.yaml schema test", async () => {
    // Hardcode this simple document instead of putting it in pass/fail directories because
    // documents in those folders get run against schema-base.yaml instead of schema.yaml.
    const oad = {
      // Also need to include required properties
      openapi: "3.2.0",
      info: {
        title: "API",
        version: "1.0.0"
      },
      components: {
        schemas: {
          foo: {}
        }
      }
    };
    await expect(oad).to.matchJsonSchema("./src/schemas/validation/schema.yaml"); // <-- "schema.yaml" instead of "schema-base.yaml"
  });

  test("schema.yaml invalid Schema Object type", async () => {
    // Hardcode this simple document instead of putting it in pass/fail directories because
    // documents in those folders get run against schema-base.yaml instead of schema.yaml.
    const oad = {
      // Also need to include required properties
      openapi: "3.2.0",
      info: {
        title: "API",
        version: "1.0.0"
      },
      components: {
        schemas: {
          foo: 42
        }
      }
    };
    await expect(oad).to.not.matchJsonSchema("./src/schemas/validation/schema.yaml"); // <-- "schema.yaml" instead of "schema-base.yaml"
  });

  describe("Pass", () => {
    readdirSync(`${fixtures}/pass`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
      .forEach((entry) => {
        test(entry.name, async () => {
          const instance = parseYamlFromFile(`${fixtures}/pass/${entry.name}`);
          await expect(instance).to.matchJsonSchema("./src/schemas/validation/schema-base.yaml");
        });
      });
  });

  describe("Fail", () => {
    readdirSync(`${fixtures}/fail`, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.yaml$/.test(entry.name))
      .forEach((entry) => {
        test(entry.name, async () => {
          const instance = parseYamlFromFile(`${fixtures}/fail/${entry.name}`);
          await expect(instance).to.not.matchJsonSchema("./src/schemas/validation/schema-base.yaml");
        });
      });
  });
});
