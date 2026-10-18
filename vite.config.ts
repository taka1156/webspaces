/// <reference types="vitest" >
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vinext from 'vinext';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(({ mode }) => {
  const reactPlugin =
    mode === 'test' ? react() : vinext({ prerender: { routes: '*' } });

  return {
    plugins: [reactPlugin, vanillaExtractPlugin()],
    test: {
      include: ['**/*.test.{ts,tsx}'],
      globals: true,
      setupFiles: ['setupTest.ts'],
      environment: 'jsdom',
      reporters: ['default'],
      coverage: {
        reporter: ['json', 'html'],
        thresholds: {
          statements: 90,
          functions: 90,
          branches: 90,
          lines: 90
        }
      }
    },
    resolve: {
      alias: [{ find: '@', replacement: resolve(import.meta.dirname, 'src') }]
    }
  };
});
