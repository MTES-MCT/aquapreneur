import { sentrySvelteKit } from "@sentry/sveltekit";
import { defineConfig } from "vite";

import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
	build: {
		sourcemap: true,
	},
	plugins: [
		sentrySvelteKit({
			autoUploadSourceMaps:
				!!process.env.ENVIRONMENT &&
				["staging", "production"].includes(process.env.ENVIRONMENT),
			sourceMapsUploadOptions: {
				org: "betagouv",
				project: "aquapreneur",
				url: "https://sentry.incubateur.net",
				authToken: process.env.SENTRY_AUTH_TOKEN ?? "",
				telemetry: false,
				sourcemaps: {
					filesToDeleteAfterUpload: [],
				},
			},
		}),
		sveltekit(),
	],
});
