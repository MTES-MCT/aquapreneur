import { redirect } from "@sveltejs/kit";

import { ESPECES, type EspeceSlug } from "$lib/constants";

export const load = async ({ params, parent }) => {
	const { etablissement, declaration } = await parent();
	const { annee, espece: especeSlug } = params;

	const espece = ESPECES.find((e) => e.slug === (especeSlug as EspeceSlug))!; // assuré par le ParamsMatcher

	const donneesEspece = declaration.donnees.especes[espece.id];
	if (donneesEspece == null) {
		redirect(307, "../");
	}

	return {
		wide: true,
		espece,
		donneesEspece,
		returnUrl: `/d/${etablissement.siret}/${annee}/ventes/recapitulatif`,
	};
};
