import merge from "lodash/merge";

import type { StatutProgression } from "$lib/schemas/declaration-schema";
import { submitDeclarationUpdate, typeStatut } from "$lib/utils";

export const load = async ({ parent, fetch }) => {
	const { declaration, persona } = await parent();

	merge(declaration.donnees.progression, {
		equipe: { dirigeants: [] },
	});

	const statutCourantEquipe = declaration.donnees.progression.equipe!.globale;
	let nouveauStatutEquipe: StatutProgression = statutCourantEquipe;

	if (statutCourantEquipe == null) {
		nouveauStatutEquipe =
			persona === "comptable" ? "en cours comptable" : "en cours producteur";
	}

	if (
		persona === "producteur" &&
		typeStatut(statutCourantEquipe) === "comptable"
	) {
		nouveauStatutEquipe = "préremplissage comptable à valider";
	}

	if (nouveauStatutEquipe !== statutCourantEquipe) {
		declaration.donnees.progression.equipe!.globale = nouveauStatutEquipe;
		declaration.donnees = await submitDeclarationUpdate(declaration, {
			fetchFct: fetch,
		});
	}

	return {
		equipe: declaration.donnees.equipe,
		progressionEquipe: declaration.donnees.progression.equipe!,
		step: "equipe",
	};
};
