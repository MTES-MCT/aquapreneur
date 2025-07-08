import * as dotenvx from "@dotenvx/dotenvx";

import { defineConfig, devices } from "@playwright/test";

dotenvx.config({ path: [".env.test", ".env"], quiet: true });

export default defineConfig({
	projects: [
		{
			name: "setup",
			testMatch: /setup\/.*\.setup\.ts/,
		},
		{
			name: "chrome",
			testMatch: /web\/.*\.test\.ts/,
			use: {
				storageState: "./tests/.auth/user.json",
				...devices["Desktop Chrome"],
			},
			dependencies: ["setup"],
		},
	],
	webServer: {
		command: "npm run build && npm run preview",
		port: 4173,
		reuseExistingServer: true,
	},
	use: {
		baseURL: "http://localhost:4173",
		bypassCSP: true,
	},
	testDir: "./tests",
	outputDir: "./tests/_results",
});
