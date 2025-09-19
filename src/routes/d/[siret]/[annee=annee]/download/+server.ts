import assert from "assert";
import { and, asc, eq } from "drizzle-orm";

import { error, json } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { etablissementsTable } from "$lib/server/db/schema/entreprise";
import { getOrCreateDeclaration } from "$lib/server/declaration-store";

import type { AnneeDeclarative } from "$lib/types";

export const GET = async ({ params, locals }) => {
	if (!locals.utilisateur) {
		error(401);
	}
	if (!(locals.utilisateur.estAdmin && locals.utilisateur.valide)) {
		error(403);
	}

	const { siret, annee } = params;

	const etablissements = await db
		.select()
		.from(etablissementsTable)
		.where(and(eq(etablissementsTable.siret, siret)))
		.orderBy(asc(etablissementsTable.denomination));

	if (!etablissements.length) {
		error(404);
	}
	assert(etablissements.length === 1);
	const etablissement = etablissements[0];

	const anneeNum = Number.parseInt(annee) as AnneeDeclarative;
	const declaration = await getOrCreateDeclaration(
		etablissement,
		anneeNum,
		"producteur",
	);

	return json(declaration);
};
