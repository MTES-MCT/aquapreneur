import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { persona, progressionProduction } = await parent();
	if (
		persona === "producteur" &&
		progressionProduction.globale === "préremplissage comptable à valider"
	) {
		redirect(307, "./verification");
	}

	return {};
};
