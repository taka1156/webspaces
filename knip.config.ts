import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // 設定ファイルやスクリプトから間接的に読み込まれるため、knip が自動検出できないエントリ
  entry: [
    '.cz-config.cjs',
    '.storybook/vite.config.story.ts',
    'cloudflare.config.ts',
    'scripts/ogp/index.tsx'
  ],
  ignore: ['src/hooks/usePagination.ts', 'src/utils/testtool/index.ts'],
  ignoreDependencies: [
    '@eslint/compat',
    '@eslint/eslintrc',
    '@eslint/js',
    '@storybook/cli',
    'commitizen',
    'eslint-plugin-import',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    // devcontainer の postCreateCommand で実行
    'husky',
    'inquirer',
    'typescript-eslint',
    // vinext-cloudflare deploy が内部で利用
    'wrangler',
    'yarn-audit-fix'
  ]
};

export default config;
