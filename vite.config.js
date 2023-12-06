import { defineConfig } from 'vite'

export default defineConfig({
  base: '/foobar',
  test: {
    browser: {
      enabled: true,
      name: 'chrome'
    }
  }
})
