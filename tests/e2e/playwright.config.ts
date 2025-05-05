import * as dotenvx from '@dotenvx/dotenvx';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, devices } from '@playwright/test';

dotenvx.config({ path: ['.env.test', '.env'], quiet: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /setup\/.*\.setup\.ts/
    },
    {
      name: 'chrome',
      testMatch: /web\/.*\.test\.ts/,
      use: {
        storageState: path.join(__dirname, '.auth/user.json'),
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup']
    }
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://localhost:4173',
    bypassCSP: true
  },
  testDir: '.',
  outputDir: './_results'
});
