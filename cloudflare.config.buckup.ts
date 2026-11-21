import { bindings, defineConfig, defineWorker } from 'cf/config';

// 現在は、Cloudflare Pagesでホスティングしているため未使用
export default defineConfig({
  worker: defineWorker({
    name: 'webspaces',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-10-09',
    compatibilityFlags: ['nodejs_compat'],
    assets: { notFoundHandling: 'none' },
    env: {
      ASSETS: bindings.assets()
    }
  })
});
