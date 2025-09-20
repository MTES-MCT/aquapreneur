import { redirect } from "@sveltejs/kit";

import { ESPECES, type EspeceSlug } from "$lib/constants";
import { dProd } from "$lib/declaration-utils";

export const load = async ({ params, parent }) => {
	const { etablissement, declaration } = await parent();
	const { annee, espece: especeSlug } = params;

	const espece = ESPECES.find((e) => e.slug === (especeSlug as EspeceSlug))!; // assuré par le ParamsMatcher

	const especeId = espece.id;
	if (!dProd(declaration.donnees, especeId).active()) {
		redirect(307, "../");
	}
	return {
		wide: true,
		espece,
		returnUrl: `/d/${etablissement.siret}/${annee}/production/recapitulatif`,
	};
};
