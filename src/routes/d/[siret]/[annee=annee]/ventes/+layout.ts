import merge from "lodash/merge";

import type { StatutProgression } from "$lib/schemas/donnees-declaration-schema";
import { submitDeclarationUpdate, typeStatut } from "$lib/utils";

export const load = async ({ parent, fetch }) => {
	const { declaration, persona } = await parent();

	merge(declaration.donnees.progression, {
		ventes: { especes: {} },
	});

	const statutCourantVentes = declaration.donnees.progression.ventes!.globale;
	let nouveauStatutVentes: StatutProgression = statutCourantVentes;

	if (statutCourantVentes == null) {
		nouveauStatutVentes =
			persona === "comptable" ? "en cours comptable" : "en cours producteur";
	}

	if (
		persona === "producteur" &&
		typeStatut(statutCourantVentes) === "comptable"
	) {
		nouveauStatutVentes = "préremplissage comptable à valider";
	}

	if (nouveauStatutVentes !== statutCourantVentes) {
		declaration.donnees.progression.ventes!.globale = nouveauStatutVentes;
		declaration.donnees = await submitDeclarationUpdate(declaration, {
			fetchFct: fetch,
		});
	}

	return {
		donneesEspeces: declaration.donnees.especes,
		progressionVentes: declaration.donnees.progression.ventes!,
		step: "ventes",
	};
};
