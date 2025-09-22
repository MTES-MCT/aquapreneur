import merge from "lodash/merge";

import { redirect } from "@sveltejs/kit";

import { ESPECES, type EspeceSlug } from "$lib/constants";

export const load = async ({ params, parent }) => {
	const { etablissement, donneesEspeces, progressionVentes } = await parent();
	const { annee, espece: especeSlug } = params;

	const espece = ESPECES.find((e) => e.slug === (especeSlug as EspeceSlug))!; // assuré par le ParamsMatcher

	const especeId = espece.id;
	const donneesEspece = donneesEspeces[especeId];
	if (donneesEspece == null) {
		redirect(307, "../");
	}

	merge(progressionVentes, {
		especes: {
			[especeId]: {},
		},
	});

	const progressionVentesEspece = progressionVentes.especes![especeId]!;

	return {
		wide: true,
		espece,
		donneesEspece,
		progressionVentesEspece,
		returnUrl: `/d/${etablissement.siret}/${annee}/ventes/recapitulatif`,
	};
};
