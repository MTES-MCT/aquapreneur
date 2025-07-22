import { redirect } from "@sveltejs/kit";

import { ADMIN_CURRENT_SIRET_COOKIE_NAME } from "$lib/constants";

export const load = async ({ parent, cookies }) => {
	const { utilisateur } = await parent();

	// Cette route n’est accessible qu’aux utilisateurs connectés, et validés
	if (!utilisateur) redirect(307, "/");
	if (!utilisateur.valide) redirect(307, "/validation");

	let siret: string | null = null;
	if (utilisateur.estAdmin) {
		siret = cookies.get(ADMIN_CURRENT_SIRET_COOKIE_NAME) ?? null;
	} else {
		siret = utilisateur.siret;
	}

	return {
		siret,
		// on renvoie de nouveau l’objet utilisateur ici, au lieu de compter sur
		// celui du layout global puisque son type est maintenant plus precis
		// (non null)
		utilisateur,
	};
};
