import merge from "lodash/merge";

import type { StatutProgression } from "$lib/schemas/donnees-declaration-schema";
import { submitDeclarationUpdate, typeStatut } from "$lib/utils";

export const load = async ({ parent, fetch }) => {
	const { declaration, persona } = await parent();

	merge(declaration.donnees.progression, {
		retourAnnee: {},
	});

	const statutCourantRetourAnnee =
		declaration.donnees.progression.retourAnnee!.globale;
	let nouveauStatutRetourAnnee: StatutProgression = statutCourantRetourAnnee;

	if (statutCourantRetourAnnee == null) {
		nouveauStatutRetourAnnee =
			persona === "comptable" ? "en cours comptable" : "en cours producteur";
	}

	if (
		persona === "producteur" &&
		typeStatut(statutCourantRetourAnnee) === "comptable"
	) {
		nouveauStatutRetourAnnee = "préremplissage comptable à valider";
	}

	if (nouveauStatutRetourAnnee !== statutCourantRetourAnnee) {
		declaration.donnees.progression.retourAnnee!.globale =
			nouveauStatutRetourAnnee;
		declaration.donnees = await submitDeclarationUpdate(declaration, {
			fetchFct: fetch,
		});
	}

	return {
		retourAnnee: declaration.donnees.retourAnnee,
		progressionRetourAnnee: declaration.donnees.progression.retourAnnee!,
		step: "retourAnnee",
	};
};
