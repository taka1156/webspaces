const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  turbopack: {},
  compiler: {
    reactRemoveProperties: isProd
      ? {
          properties: ['^data-testid$']
        }
      : false
  }
};

export default nextConfig;
