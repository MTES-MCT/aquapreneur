import { redirect } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
	const { persona, progressionEquipe } = await parent();
	if (
		persona === "producteur" &&
		progressionEquipe.globale === "préremplissage comptable à valider"
	) {
		redirect(307, "./verification");
	}

	return {};
}) satisfies PageLoad;
