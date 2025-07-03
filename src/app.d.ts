// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Session } from "$lib/server/db/types";
import type { Utilisateur } from "$lib/server/db/types";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			utilisateur: Utilisateur | null;
			session: Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
