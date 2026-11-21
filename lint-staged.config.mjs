/**
 * コミット時（.husky/pre-commit）にステージ済みファイルのみ lint / 整形する
 * 自動修正できた内容はそのままコミットに含まれ、修正できないエラーがあればコミットを中止する
 *
 * @type {import('lint-staged').Configuration}
 */
export default {
  'src/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write']
};
