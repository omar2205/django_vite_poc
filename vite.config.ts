import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/',
  root: resolve('./static/src'),
  build: {
    manifest: true,
    outDir: resolve('./assets'),
    rollupOptions: {
      input: {
        main: resolve('./static/src/main.tsx')
      }
    }
  }
})
