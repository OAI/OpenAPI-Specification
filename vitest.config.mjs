import { defineConfig } from 'vitest/config'
import { jsonSchemaCoveragePlugin } from "@hyperjump/json-schema-coverage/vitest"

export default defineConfig({
  plugins: [jsonSchemaCoveragePlugin()],
  test: {
    globalSetup: ["tests/schema/oas-schema.mjs"],
    coverage: {
      include: ["src/schemas/validation/**/*.yaml"],
      thresholds: process.env.BASE !== "dev" ? {
        statements: 60.94, // should be 100% but we are missing some tests
        lines: 60.94,      // should be 100% but we are missing some tests
        functions: 51.63,  // should be 100% but we are missing some tests
        // branches: 56.77,   // need to discuss whether we should check/increase this
      } : {}
    },
    forceRerunTriggers: ['**/scripts/**', '**/tests/**'],
    testTimeout: 10000, // 10 seconds
  },
})
