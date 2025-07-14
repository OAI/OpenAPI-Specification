import { defineConfig } from 'vitest/config'
import { jsonSchemaCoveragePlugin } from "@hyperjump/json-schema-coverage/vitest"

export default defineConfig({
  plugins: [jsonSchemaCoveragePlugin()],
  test: {
    globalSetup: ["tests/schema/oas-schema.mjs"],
    coverage: {
      include: ["src/schemas/validation/**/*.yaml"],
      thresholds: process.env.BASE !== "dev" ? {
        100: true
      } : {}
    },
    forceRerunTriggers: ['**/scripts/**', '**/tests/**'],
    testTimeout: 10000, // 10 seconds
  },
})
