import assert from "assert";
import equal from "deep-equal";
import { and, eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import { declarationsTable } from "$lib/server/db/schema/declaration";

import { prefillDeclaration } from "$lib/prefill";

import { DeclarationSchema } from "./schemas/declaration-schema";
import { type DeclarationEntry } from "./server/db/types";
import type { EtablissementSelect } from "./server/db/types";

export const getOrCreateDeclaration = async (
	etablissement: EtablissementSelect,
	annee: number,
) => {
	let declaration: DeclarationEntry;
	const declarationsResult = await db
		.select()
		.from(declarationsTable)
		.where(
			and(
				eq(declarationsTable.siret, etablissement.siret),
				eq(declarationsTable.annee, annee),
			),
		);

	if (declarationsResult.length) {
		// TODO: différencier version préremplie, comptable / producteur, etc
		assert(declarationsResult.length == 1);
		declaration = declarationsResult[0];
	} else {
		declaration = (
			await db
				.insert(declarationsTable)
				.values({
					annee,
					siret: etablissement.siret,
					donnees: await prefillDeclaration(etablissement, annee),
				})
				.returning()
		)[0];
	}
	return declaration;
};

export const updateDeclaration = async (
	declarationId: number,
	donneesDeclaration: DeclarationSchema,
) => {
	const parsedData = DeclarationSchema.assert(donneesDeclaration);

	const currentValue = (
		await db
			.select()
			.from(declarationsTable)
			.where(eq(declarationsTable.id, declarationId))
	)[0];
	if (!equal(currentValue.donnees, parsedData)) {
		return (
			await db
				.update(declarationsTable)
				.set({ donnees: parsedData, dateMaj: new Date() })
				.where(eq(declarationsTable.id, declarationId))
				.returning()
		)[0];
	}
	return currentValue;
};
