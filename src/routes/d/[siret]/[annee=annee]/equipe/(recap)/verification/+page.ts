import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { persona, progressionEquipe } = await parent();
	if (
		persona !== "producteur" ||
		progressionEquipe.globale !== "préremplissage comptable à valider"
	) {
		redirect(307, "./recapitulatif");
	}

	return {};
};
