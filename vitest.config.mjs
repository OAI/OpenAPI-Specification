import { defineConfig } from 'vitest/config'
import { jsonSchemaCoveragePlugin } from "@hyperjump/json-schema-coverage/vitest"

export default defineConfig({
  plugins: [jsonSchemaCoveragePlugin()],
  test: {
    globalSetup: ["tests/schema/oas-schema.mjs"],
    coverage: {
      include: ["src/schemas/validation/**/*.yaml"],
      thresholds: process.env.BASE !== "dev" ? {
        statements: 100,    // JSON Schema keywords
        lines: 100,
        // functions: 100,  // subschemas, for example with `properties` - to be discussed
        // branches: 56.77, // branch coverage isn't that useful
      } : {}
    },
    forceRerunTriggers: ['**/scripts/**', '**/tests/**'],
    testTimeout: 20000, // 20 seconds, sometimes needed on slower machines
  },
})
