import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';
import vitest from '@vitest/eslint-plugin';

export default defineConfig([
  globalIgnores(['**/next.config.js', '**/*.test.js', '**/*.stories.js']),
  ...nextVitals,
  ...nextTs,
  ...storybook.configs['flat/recommended'],
  prettier,
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      '@next/next/no-img-element': 'off',
      'unused-imports/no-unused-imports': 'error',
      // if / else / for / while は1行でも必ずブロック {} で囲む
      // （eslint-config-prettier で無効化されるため、ここで再度有効化する。"all" は Prettier と競合しない）
      curly: ['error', 'all']
    },
    settings: {
      react: { version: '19' } // Avoids auto-detection crash
    }
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    ...vitest.configs.recommended,
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'it' }],
      'vitest/require-top-level-describe': 'error'
    }
  }
]);
