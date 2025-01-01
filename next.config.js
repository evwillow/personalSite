const path = require('path');

class VeliteWebpackPlugin {
  static started = false;

  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;

      const dev = compiler.options.mode === 'development';
      const { build } = await import('velite');

      await build({
        watch: dev,
        clean: !dev,
        outputPath: 'public/velite',
      });
    });
  }
}

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    domains: ['images.ctfassets.net'], // Add Contentful's domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(new VeliteWebpackPlugin());

    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    };

    return config;
  },
};

module.exports = nextConfig;
