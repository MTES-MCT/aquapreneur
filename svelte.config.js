import * as dotenvx from '@dotenvx/dotenvx';

import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

dotenvx.config({ ignore: ['MISSING_ENV_FILE'], quiet: true });

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    csp: {
      mode: 'nonce',
      directives: {
        'base-uri': ['none'],
        'default-src': ['none'],
        'object-src': ['none'],
        'script-src': [],
        'style-src': ['none'],
        'style-src-elem': ['self'],
        'style-src-attr': ['unsafe-inline'],
        'connect-src': ['self'],
        'font-src': ['self'],
        'frame-ancestors': ['none'],
        'form-action': ['self'],
        'img-src': ['self', 'data:'],
        'require-trusted-types-for': ['script'],
        'report-uri': [
          process.env.SENTRY_CSP_REPORT_URI ? process.env.SENTRY_CSP_REPORT_URI : 'none'
        ]
      }
    },
    alias: {
      $db: './db',
      $data: './data',
      $utils: './utils'
    }
  },

  compilerOptions: {
    runes: true,
    sourcemap: true
  }
};

export default config;
