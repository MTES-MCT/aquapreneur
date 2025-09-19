import assert from "assert";
import { and, asc, eq } from "drizzle-orm";

import { redirect } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { etablissementsTable } from "$lib/server/db/schema/entreprise";
import { getOrCreateDeclaration } from "$lib/server/declaration-store";

import type { AnneeDeclarative } from "$lib/types";

export const load = async ({ params, parent }) => {
	const { persona } = await parent();
	const { siret, annee } = params;

	const etablissements = await db
		.select()
		.from(etablissementsTable)
		.where(and(eq(etablissementsTable.siret, siret)))
		.orderBy(asc(etablissementsTable.denomination));

	if (!etablissements) {
		// TODO log, display error, etc.
		redirect(307, "/tableau-de-bord");
	}
	assert(etablissements.length === 1);
	const etablissement = etablissements[0];

	// Le ParamMatcher s’assure que l’année est correcte
	const anneeNum = Number.parseInt(annee) as AnneeDeclarative;

	// On prérempli la déclaration si elle ne l’est pas encore
	const declarationAPI = await getOrCreateDeclaration(
		etablissement,
		anneeNum,
		"api",
	);
	const declarationComptable = await getOrCreateDeclaration(
		etablissement,
		anneeNum,
		"comptable",
	);
	const declarationProducteur = await getOrCreateDeclaration(
		etablissement,
		anneeNum,
		"producteur",
	);
	const declaration =
		persona === "comptable" ? declarationComptable : declarationProducteur;

	return {
		// TODO supprimer
		annee: anneeNum,
		// TODO supprimer
		etablissement,
		declarationAPI,
		declarationComptable,
		declarationProducteur,
		declaration,
		title: `${etablissement.denomination} • Déclaration ${annee}`,
	};
};
