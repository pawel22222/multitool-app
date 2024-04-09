/// <reference types="vitest" />
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },

  build: {
    outDir: 'build',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/scss/_index.scss" as *;',
      },
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  },
});
