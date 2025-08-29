import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { utilisateur } = await parent();

	if (utilisateur) redirect(307, "/tableau-de-bord");

	return {
		title: "Accueil",
	};
};
