/**
 * OGP 画像を public/ogp/ に生成するスクリプト (yarn build の前段で実行)
 * 使い方: node scripts/generate-ogp.mjs
 * 前提: yarn sync で public/blog/contents が取得済みであること
 *
 * TSX と '@/' エイリアスを解決するため、Vite の module runner で読み込む。
 */
import { resolve } from 'node:path';
import { runnerImport } from 'vite';

const root = resolve(import.meta.dirname, '..');

const { module } = await runnerImport(resolve(root, 'scripts/ogp/index.tsx'), {
  root,
  configFile: false,
  logLevel: 'warn',
  resolve: {
    alias: [{ find: '@', replacement: resolve(root, 'src') }]
  }
});

const count = await module.generateOgpImages();
console.log(`✓ generated ${count} OGP images into public/ogp/`);
