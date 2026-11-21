/// <reference types="vitest" >
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { cloudflare } from '@cloudflare/vite-plugin';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import vinext from 'vinext';

/**
 * @vanilla-extract/vite-plugin は ssr.external に自身のパッケージを無条件で追加するが、
 * Cloudflare Vite plugin は Worker 環境での resolve.external を許可しないため取り除く。
 * (Worker 側ではバンドルに含めれば問題ない)
 */
function stripVanillaExtractSsrExternal(): Plugin {
  return {
    name: 'strip-vanilla-extract-ssr-external',
    enforce: 'post',
    config(config) {
      const external = config.ssr?.external;
      if (Array.isArray(external)) {
        config.ssr!.external = external.filter(
          (id) => !id.startsWith('@vanilla-extract/')
        );
      }
    }
  };
}

/** mode ごとのアプリ用プラグイン構成 */
function getAppPlugins(mode: string): PluginOption[] {
  // テストは React の変換だけでよい
  if (mode === 'test') {
    return [react()];
  }

  const app = vinext({ prerender: { routes: '*' } });

  // 静的アセットのみの Worker 構成では dev 時にページを描画できないため、
  // dev は Cloudflare plugin を使わず vinext 単体で動かす
  if (mode === 'development') {
    return [app];
  }

  return [
    app,
    cloudflare({
      viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] }
    }),
    stripVanillaExtractSsrExternal()
  ];
}

export default defineConfig(({ mode }) => {
  // BASE_URL はビルド時に確定させてバンドルへ埋め込む。
  // Workers の実行時には build variables が process.env に存在しないため。
  const { BASE_URL } = { ...loadEnv(mode, process.cwd(), ''), ...process.env };

  return {
    plugins: [...getAppPlugins(mode), vanillaExtractPlugin()],
    define:
      mode === 'test'
        ? {}
        : { 'process.env.BASE_URL': JSON.stringify(BASE_URL ?? '') },
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
