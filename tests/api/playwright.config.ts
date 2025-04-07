import * as dotenvx from '@dotenvx/dotenvx';

import { defineConfig } from '@playwright/test';

dotenvx.config({ path: ['.env.test', '.env'], quiet: true });

export default defineConfig({
  name: 'api',
  fullyParallel: false,

  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    reuseExistingServer: true
  },

  testDir: '.',
  outputDir: './_results'
});
