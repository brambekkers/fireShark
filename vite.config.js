import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url";
import eslint from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), { 
    ...eslint({
      failOnWarning: false,
      failOnError: false,
    }),
    apply: 'serve',
    enforce: 'post'
  }],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '@composables', replacement: fileURLToPath(new URL('./src/composables', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
    ],
  },

})
