import assert from "assert";
import equal from "deep-equal";
import { and, eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import { declarationsTable } from "$lib/server/db/schema/declaration";

import { prefillDeclaration } from "$lib/prefill";

import { type DeclarationType } from "../constants";
import { DeclarationSchema } from "../schemas/declaration-schema";
import { type DeclarationEntry } from "./db/types";

import type { AnneeDeclarative } from "../types";
import type { EtablissementSelect } from "./db/types";

export const getOrCreateDeclaration = async (
	etablissement: EtablissementSelect,
	annee: AnneeDeclarative,
	declarationType: DeclarationType,
) => {
	let declaration: DeclarationEntry;
	const declarationsResult = await db
		.select()
		.from(declarationsTable)
		.where(
			and(
				eq(declarationsTable.siret, etablissement.siret),
				eq(declarationsTable.annee, annee),
				eq(declarationsTable.type, declarationType),
			),
		);

	if (declarationsResult.length) {
		assert(declarationsResult.length == 1);
		declaration = declarationsResult[0];
	} else {
		declaration = (
			await db
				.insert(declarationsTable)
				.values({
					annee,
					denomination: etablissement.denomination,
					type: declarationType,
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
	const parsedData = DeclarationSchema.parse(donneesDeclaration);
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

export const deleteDeclarations = async (
	siret: string,
	annee: AnneeDeclarative,
) => {
	await db
		.delete(declarationsTable)
		.where(
			and(
				eq(declarationsTable.siret, siret),
				eq(declarationsTable.annee, annee),
			),
		);
};
