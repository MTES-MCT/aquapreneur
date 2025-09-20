import merge from "lodash/merge";

import { redirect } from "@sveltejs/kit";

import { ESPECES, type EspeceSlug } from "$lib/constants";

export const load = async ({ params, parent }) => {
	const { etablissement, donneesEspeces, progressionProduction } =
		await parent();
	const { annee, espece: especeSlug } = params;

	const espece = ESPECES.find((e) => e.slug === (especeSlug as EspeceSlug))!; // assuré par le ParamsMatcher

	const especeId = espece.id;
	const donneesEspece = donneesEspeces[especeId];
	if (donneesEspece == null) {
		redirect(307, "../");
	}

	merge(progressionProduction.especes, {
		[especeId]: {},
	});
	const progressionProdEspece = progressionProduction.especes[especeId]!;

	return {
		wide: true,
		espece,
		donneesEspece,
		progressionProdEspece,
		returnUrl: `/d/${etablissement.siret}/${annee}/production/recapitulatif`,
	};
};
