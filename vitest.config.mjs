import { createVitestConfig } from "@oai/build-infra/vitest-config";

export default await createVitestConfig({
  globalSetup: ["tests/schema/oas-schema.mjs"],
  thresholds: process.env.BASE !== "dev" ? {
    statements: 100,
    lines: 100
  } : {}
});
