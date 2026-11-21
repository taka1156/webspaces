import { defineConfig, defineWorker } from 'cf/config';

export default defineConfig({
  worker: defineWorker({
    name: 'webspaces',
    compatibilityDate: '2026-10-09',
    assets: { notFoundHandling: '404-page' }
  })
});
