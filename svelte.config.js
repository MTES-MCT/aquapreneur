import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const sentryReportURI = process.env.SENTRY_CSP_REPORT_URI
  ? new URL(process.env.SENTRY_CSP_REPORT_URI)
  : null;
if (sentryReportURI && process.env.PUBLIC_SENTRY_ENVIRONMENT)
  sentryReportURI.searchParams.append('sentry_environment', process.env.PUBLIC_SENTRY_ENVIRONMENT);

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
        'report-uri': [sentryReportURI?.toString() ?? '']
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
