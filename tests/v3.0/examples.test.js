import { readdirSync, readFileSync } from "node:fs";
import YAML from "yaml";
import { validate, setMetaSchemaOutputFormat } from "@hyperjump/json-schema/openapi-3-0";
import { BASIC } from "@hyperjump/json-schema/experimental";
import { describe, test, expect } from "vitest";

const parseYamlFromFile = (filePath) => {
    const schemaYaml = readFileSync(filePath, "utf8");
    return YAML.parse(schemaYaml, { prettyErrors: true });
};

setMetaSchemaOutputFormat(BASIC);

const validateOpenApi = await validate("./schemas/v3.0/schema.json");
const folder = './examples/v3.0/';

describe("v3.0 - Validate examples", async () => {
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
