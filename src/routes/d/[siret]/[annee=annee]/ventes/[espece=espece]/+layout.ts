import { redirect } from "@sveltejs/kit";

import { ESPECES, type EspeceSlug } from "$lib/constants";

export const load = async ({ params, parent }) => {
	const { etablissement, declaration } = await parent();
	const { annee, espece: especeSlug } = params;

	const espece = ESPECES.find((e) => e.slug === (especeSlug as EspeceSlug))!; // assuré par le ParamsMatcher

	const donneesVentesEspece = declaration.donnees.ventes[espece.id];
	if (donneesVentesEspece == null) {
		redirect(307, "../");
	}

	return {
		wide: true,
		espece,
		donneesVentesEspece,
		returnUrl: `/d/${etablissement.siret}/${annee}/ventes/recapitulatif`,
	};
};
