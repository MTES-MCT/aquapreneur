import merge from "lodash/merge";

import type { StatutProgression } from "$lib/schemas/donnees-declaration-schema";
import { submitDeclarationUpdate, typeStatut } from "$lib/utils";

export const load = async ({ parent, fetch }) => {
	const { declaration, persona } = await parent();

	merge(declaration.donnees.progression, {
		production: { especes: {} },
	});

	const statutCourantProduction =
		declaration.donnees.progression.production!.globale;
	let nouveauStatutProduction: StatutProgression = statutCourantProduction;

	if (statutCourantProduction == null) {
		nouveauStatutProduction =
			persona === "comptable" ? "en cours comptable" : "en cours producteur";
	}

	if (
		persona === "producteur" &&
		typeStatut(statutCourantProduction) === "comptable"
	) {
		nouveauStatutProduction = "préremplissage comptable à valider";
	}

	if (nouveauStatutProduction !== statutCourantProduction) {
		declaration.donnees.progression.production!.globale =
			nouveauStatutProduction;
		declaration.donnees = await submitDeclarationUpdate(declaration, {
			fetchFct: fetch,
		});
	}

	return {
		donneesEspeces: declaration.donnees.especes,
		progressionProduction: declaration.donnees.progression.production!,
		step: "production",
	};
};
