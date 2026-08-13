import { registerSchema } from "@hyperjump/json-schema/draft-2020-12";
import { defineVocabulary } from "@hyperjump/json-schema/experimental";
import { readFile } from "node:fs/promises";
import YAML from "yaml";

const parseYamlFromFile = async (filePath) => {
  const schemaYaml = await readFile(filePath, "utf8");
  return YAML.parse(schemaYaml, { prettyErrors: true });
};

export default async () => {
  try {
    const dialect = await parseYamlFromFile("./src/schemas/validation/dialect.yaml");
    const meta = await parseYamlFromFile("./src/schemas/validation/meta.yaml");
    const oasBaseVocab = Object.keys(meta.$vocabulary)[0];

    defineVocabulary(oasBaseVocab, {
        "discriminator": "https://spec.openapis.org/oas/3.0/keyword/discriminator",
        "example": "https://spec.openapis.org/oas/3.0/keyword/example",
        "externalDocs": "https://spec.openapis.org/oas/3.0/keyword/externalDocs",
        "xml": "https://spec.openapis.org/oas/3.0/keyword/xml"
    });

    registerSchema(meta);
    registerSchema(dialect);
  } catch (error) {}
};
