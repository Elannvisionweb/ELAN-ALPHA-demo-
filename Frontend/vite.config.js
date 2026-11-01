import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-sitemap-robots-redirects',
      apply: 'build',
      closeBundle() {
        try {
          if (existsSync(resolve(__dirname, 'sitemap.xml'))) {
            copyFileSync(resolve(__dirname, 'sitemap.xml'), resolve(__dirname, 'dist/sitemap.xml'));
          }
          if (existsSync(resolve(__dirname, 'robots.txt'))) {
            copyFileSync(resolve(__dirname, 'robots.txt'), resolve(__dirname, 'dist/robots.txt'));
          }
          console.log('Copied sitemap.xml and robots.txt to dist folder.');
        } catch (err) {
          console.error('Error copying files:', err);
        }
      }
    }
  ]
})
