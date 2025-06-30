import { error, redirect } from "@sveltejs/kit";

import { getOrCreateDeclaration } from "$lib/declaration-store";

export const load = async ({ parent, params }) => {
	const { etablissement } = await parent();
	const { year } = params;

	const safeYear = Number.parseInt(year);

	// récupérer l’année courante d’une variable d’environnement, mise à jour
	// quand la campagne démarre
	if (![2020, 2021, 2022, 2023, 2024].includes(safeYear)) {
		error(404, "Not Found");
	}

	if (!etablissement) {
		redirect(307, "/producteur");
	}

	const declaration = await getOrCreateDeclaration(etablissement, safeYear);

	return {
		year: safeYear,
		donneesDeclaration: declaration.donnees,
		idDeclarationCourante: declaration.id,
	};
};
