// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/nextjs-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path, { dirname } from 'path';
import { loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      builder: {
        viteConfigPath: path.resolve(__dirname, 'vite.config.story.ts')
      }
    }
  },
  staticDirs: ['../public'],
  // NOTE: Codespacesの場合、CORSで動かない
  previewHead: (head) => {
    // Web Componentsのogp-cardを利用するために、ogp-card.es.jsを読み込む
    const env = loadEnv(
      process.env.NODE_ENV || 'development',
      process.cwd(),
      'NEXT_PUBLIC_'
    );

    return `
    ${head}
    <script src="${env.NEXT_PUBLIC_OGP_BACKEND_URL}/lib/ogp-card.es.js" type='module'></script>
  `;
  },
  viteFinal: async (config) => {
    config.base = './';
    config.plugins = [...(config.plugins || []), vanillaExtractPlugin()];

    config.resolve!.alias = {
      ...config.resolve?.alias,
      '@': path.resolve(__dirname, '../src')
    };

    config.server = {
      ...config.server,
      allowedHosts: ['localhost'],
      ws: {
        ...config.server?.ws,
        clientPort: 443
      }
    };

    return config;
  }
};

export default config;
