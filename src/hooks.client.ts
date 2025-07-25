// sort-imports-ignore
// La configuration d’arktype doit avoir lieu avant le premier import de {type}
// Coté backend, elle est gérée dans vite.config.js,
import "./lib/arktype.config.js";

// Reste des imports
import { handleErrorWithSentry } from "@sentry/sveltekit";
import * as Sentry from "@sentry/sveltekit";

import {
	PUBLIC_SENTRY_DSN,
	PUBLIC_SENTRY_ENVIRONMENT,
	PUBLIC_SENTRY_TRACE_SAMPLE_RATE,
} from "$env/static/public";

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: Number(PUBLIC_SENTRY_TRACE_SAMPLE_RATE || 0),
	environment: PUBLIC_SENTRY_ENVIRONMENT,
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();

export const init = async () => {};
