import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Run `npm run build:analyze` to open an interactive treemap of the bundle.
    mode === 'analyze' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        // Split heavy vendor libraries into their own cacheable chunks
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('embla-carousel')) return 'vendor-embla'
        },
      },
    },
  },
}))
