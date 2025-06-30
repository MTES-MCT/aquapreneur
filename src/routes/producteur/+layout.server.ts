import { redirect } from "@sveltejs/kit";

import * as logger from "$utils/logger";

import { ADMIN_CURRENT_SIRET_COOKIE_NAME } from "$lib/constants";
import { getOrCreateEtablissement } from "$lib/sirene";

export const load = async ({ parent, cookies, route }) => {
	const { utilisateur } = await parent();

	// Cette route n’est accessible qu’aux utilisateurs connectés, et validés
	if (!utilisateur) redirect(307, "/");
	if (!utilisateur.valide) redirect(307, "/validation");

	let siret: string | null = null;
	// Pour les administrateurs, leur propre siret n’est pas pertinent, on utilise
	// celui qui a été éventuellement choisi manuellement et stocké dans le cookie
	// `ADMIN_CURRENT_SIRET_COOKIE_NAME`
	if (utilisateur.estAdmin) {
		siret = cookies.get(ADMIN_CURRENT_SIRET_COOKIE_NAME) ?? null;
	} else {
		siret = utilisateur.siret;
	}

	let etablissement = null;
	let sireneError = false;
	if (siret) {
		try {
			etablissement = await getOrCreateEtablissement(siret);
		} catch (err) {
			logger.exception(err);
			sireneError = true;
		}
	}

	if (!etablissement && route.id != "/producteur") {
		redirect(307, "/producteur");
	}

	// TODO gérer le cas où l’utilisateur n’a pas de siret ?
	return {
		siret,
		sireneError,
		etablissement,
		// on renvoie de nouveau l’objet utilisateur ici, au lieu de compter sur
		// celui du layout global puisque son type est maintenant plus precis
		// (non null)
		utilisateur,
	};
};
