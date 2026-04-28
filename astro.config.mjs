import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://nikhilhegde.com',
  server: {
    port: 5173
  },
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
  vite: {
    plugins: [
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { lossless: true },
        avif: { lossless: true },
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            lucide: ['lucide-react'],
          },
        },
      },
    },
  }
});
