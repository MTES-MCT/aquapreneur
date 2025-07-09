import { error, redirect } from "@sveltejs/kit";

import * as logger from "$lib/server/utils/logger";

import type { AnneeDeclarative } from "$lib/types";

export const load = async ({ parent, params }) => {
	const { etablissement, declarations } = await parent();
	const { annee } = params;

	if (!etablissement || !declarations) {
		redirect(307, "/producteur");
	}

	// Le ParamMatcher s’assure que l’année est correcte
	const anneeNum = Number.parseInt(annee) as AnneeDeclarative;

	const declaration = declarations.get(anneeNum);

	if (!declaration) {
		logger.error("Impossible de trouver la déclaration", {
			annee: anneeNum,
			siret: etablissement.siret,
		});
		error(500);
	}
	return {
		annee: anneeNum,
		donneesDeclaration: declaration.donnees,
		idDeclarationCourante: declaration?.id,
	};
};
