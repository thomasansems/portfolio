import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.jsx'],
    include: ['**/*.{test,spec}.{js,jsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.js',
        '.next/',
        'public/',
        'data/',
        'scripts/',
      ],
    },
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, './components'),
      '@/data': path.resolve(__dirname, './data'),
      '@/layouts': path.resolve(__dirname, './layouts'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/css': path.resolve(__dirname, './css'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
