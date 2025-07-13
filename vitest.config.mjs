import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globalSetup: ["tests/schema/oas-schema.mjs"],
    coverage: {
      provider: "custom",
      customProviderModule: "@hyperjump/json-schema-coverage/vitest/coverage-provider",
      include: ["src/schemas/validation/**/*.yaml"]
    },
    forceRerunTriggers: ['**/scripts/**', '**/tests/**'],
    testTimeout: 10000, // 10 seconds
  },
})
