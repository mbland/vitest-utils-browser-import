import { defineConfig } from 'vite'

export default defineConfig({
  base: '/strcalc',
  test: {
    browser: {
      enabled: true,
      name: 'chrome'
    }
  }
})
