import { redirect } from "@sveltejs/kit";

import { ESPECES, type ESPECES_SLUG } from "$lib/constants";

export const load = async ({ params, parent }) => {
	const { etablissement, declaration } = await parent();
	const { annee, espece: especeSlug } = params;

	const espece = ESPECES.find((e) => e.slug === (especeSlug as ESPECES_SLUG))!; // assuré par le ParamsMatcher

	if (declaration.donnees.ventes[espece.id] == null) {
		redirect(307, "../");
	}

	return {
		wide: true,
		espece,
		returnUrl: `/d/${etablissement.siret}/${annee}/ventes/recapitulatif`,
	};
};
