import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://saketupadhyay.com',
  // Serve site from the root by default so built assets are referenced from '/'
  // Remove or change this if you intentionally host the site under a subpath.
  base: '/mftbrew',
});
