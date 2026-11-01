import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Output to repo root /dist so Cloudflare Pages finds it at the default location
    outDir: resolve(__dirname, '../dist'),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    {
      name: 'copy-sitemap-robots-redirects',
      apply: 'build',
      closeBundle() {
        const outDir = resolve(__dirname, '../dist')
        try {
          if (existsSync(resolve(__dirname, 'sitemap.xml'))) {
            copyFileSync(resolve(__dirname, 'sitemap.xml'), resolve(outDir, 'sitemap.xml'))
          }
          if (existsSync(resolve(__dirname, 'robots.txt'))) {
            copyFileSync(resolve(__dirname, 'robots.txt'), resolve(outDir, 'robots.txt'))
          }
          if (existsSync(resolve(__dirname, '_redirects'))) {
            copyFileSync(resolve(__dirname, '_redirects'), resolve(outDir, '_redirects'))
          }
          if (existsSync(resolve(__dirname, '_headers'))) {
            copyFileSync(resolve(__dirname, '_headers'), resolve(outDir, '_headers'))
          }
          console.log('Copied sitemap.xml, robots.txt, _redirects, and _headers to dist folder.')
        } catch (err) {
          console.error('Error copying files:', err)
        }
      }
    }
  ]
})
