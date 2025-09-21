import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { persona, progressionVentes } = await parent();
	if (
		persona !== "producteur" ||
		progressionVentes.globale !== "préremplissage comptable à valider"
	) {
		redirect(307, "./recapitulatif");
	}

	return {};
};
