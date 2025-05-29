import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    forceRerunTriggers: ['**/scripts/**', '**/tests/**'],
    testTimeout: 10000, // 10 seconds
  },
})