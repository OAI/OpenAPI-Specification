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

describe("v3.3", () => {
  test("schema.yaml schema test", async () => {
    // Files in the pass/fail folders get run against schema-base.yaml.
    // This instance is instead run against schema.yaml.
    const oad = {
      openapi: "3.3.0",
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

  describe("Unevaluated properties in schema.yaml subschemas", () => {
    const schema = "https://spec.openapis.org/oas/3.3/schema/WORK-IN-PROGRESS";
    const minimalObjects = parseYamlFromFile("./tests/schema/minimal-objects.yaml");

    for (const { objectName, subSchemaPath, minimalInstance } of minimalObjects) {
      test(objectName, async () => {
        // verify that minimal instance passes
        await expect(minimalInstance).to.matchJsonSchema(`${schema}#${subSchemaPath}`);
        // verify that adding a very unlikely property fails
        const extendedInstance = { ...minimalInstance, not_allowed: true };
        await expect(extendedInstance).to.not.matchJsonSchema(`${schema}#${subSchemaPath}`);
      });
    }
  });
});
