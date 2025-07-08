import { error, redirect } from "@sveltejs/kit";

import * as logger from "$lib/server/utils/logger";

import { ANNEES_DECLARATIVES } from "$lib/constants";
import type { AnneeDeclarative } from "$lib/types";

export const load = async ({ parent, params }) => {
	const { etablissement, declarations } = await parent();
	const { year } = params;

	if (!etablissement || !declarations) {
		redirect(307, "/producteur");
	}

	const safeYear = Number.parseInt(year);

	// récupérer l’année courante d’une variable d’environnement, mise à jour
	// quand la campagne démarre
	if (!(ANNEES_DECLARATIVES as ReadonlyArray<number>).includes(safeYear)) {
		error(404, "Not Found");
	}

	const declaration = declarations.get(safeYear as AnneeDeclarative);
	if (!declaration) {
		logger.error("Impossible de trouver la déclaration", {
			annee: safeYear,
			siret: etablissement.siret,
		});
		error(500);
	}
	return {
		annee: safeYear as AnneeDeclarative,
		donneesDeclaration: declaration.donnees,
		idDeclarationCourante: declaration?.id,
	};
};
