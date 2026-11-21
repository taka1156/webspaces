/// <reference types="vitest" >
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
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

export default defineConfig(({ mode }) => {
  // BASE_URL はビルド時に確定させてバンドルへ埋め込む。
  // Workers の実行時には build variables が process.env に存在しないため。
  const { BASE_URL } = { ...loadEnv(mode, process.cwd(), ''), ...process.env };

  const appPlugins =
    mode === 'test'
      ? [react()]
      : [
          vinext({ prerender: { routes: '*' } }),
          cloudflare({
            viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] }
          }),
          stripVanillaExtractSsrExternal()
        ];

  return {
    plugins: [...appPlugins, vanillaExtractPlugin()],
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
