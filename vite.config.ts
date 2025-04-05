import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.{ts,tsx}']
  },
})
