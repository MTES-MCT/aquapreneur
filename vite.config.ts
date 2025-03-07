import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: 'betagouv',
        project: 'aquapreneur',
        url: 'https://sentry.incubateur.net/',
        authToken: process.env.SENTRY_AUTH_TOKEN
      }
    }),
    sveltekit()
  ]
});
