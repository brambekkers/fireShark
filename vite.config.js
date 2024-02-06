import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import eslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Icons({ autoInstall: true }), {
    ...eslint({
      failOnWarning: false,
      failOnError: false,
    }),
    apply: 'serve',
    enforce: 'post',
  },
  AutoImport({
    // global imports to register
    imports: [
      // presets
      'vue',
      'vue-router',
      'pinia',
      'vue-i18n'
    ]}),
  VueI18nPlugin({
    runtimeOnly: true,
    compositionOnly: true,
    include: path.resolve(__dirname, './src/locales/**'),
  }),
],
  resolve: {
    alias: [
      // { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '@composables', replacement: fileURLToPath(new URL('./src/composables', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
    ],
  },
});
