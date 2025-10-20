import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Ensure asset paths resolve correctly in Netlify
  base: '/',
  // Ensure Netlify reads redirects from the default public directory
  publicDir: 'public',
});
