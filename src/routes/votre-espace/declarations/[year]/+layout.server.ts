import { and, eq, sql } from "drizzle-orm";

import { error, redirect } from "@sveltejs/kit";

import { db } from "$db";

import { bilans } from "$db/schema/api";
import { concessions } from "$db/schema/atena";

import * as logger from "$utils/logger";

import { prefillDeclaration } from "$lib/prefill";

export const load = async ({ parent, params }) => {
	const { etablissement } = await parent();
	const { year } = params;

	const safeYear = Number.parseInt(year);

	if (![2020, 2021, 2022, 2023, 2024].includes(safeYear)) {
		error(404, "Not Found");
	}

	let bilan = null;
	let bilanMoins1 = null;

	if (!etablissement) {
		redirect(307, "/votre-espace");
	}

	const reqBilans = await db
		.select()
		.from(bilans)
		.where(
			and(
				eq(bilans.siret, etablissement.siret),
				eq(sql<string>`DATE_PART('year', ${bilans.finExercice})`, year),
			),
		);
	const reqBilansMoins1 = await db
		.select()
		.from(bilans)
		.where(
			and(
				eq(bilans.siret, etablissement.siret),
				eq(
					sql<string>`DATE_PART('year', ${bilans.finExercice})`,
					(Number.parseInt(year) - 1).toString(),
				),
			),
		);

	if (reqBilans.length > 1) {
		logger.error("Bilans multiples");
		error(500, "Bilans multiples");
	}

	if (reqBilans.length === 1) {
		bilan = reqBilans[0];
	}

	if (reqBilansMoins1.length > 1) {
		logger.error("Bilans N-1 multiples");
		error(500, "Bilans N-1 multiples");
	}

	if (reqBilansMoins1.length === 1) {
		bilanMoins1 = reqBilans[0];
	}

	// 			lieu: sql<string>`concat(${concessions.libLocalite} ,  ' – ', ${concessions.nomLieuDit})`,

	const reqConcessions = await db
		.select()
		.from(concessions)
		.where(and(eq(concessions.siren, etablissement.siret.substring(0, 9))))
		.orderBy(
			concessions.quartierParcelle,
			concessions.libLocalite,
			concessions.nomLieuDit,
			concessions.numeroParcelle,
		);

	const declaration = prefillDeclaration(bilan, bilanMoins1, reqConcessions);

	return {
		year: safeYear,
		declaration,
		// On rexporte `etablissement` pour propager son narrowing
		// (on sait maintenant qu’il n’est pas null)
		etablissement,
		concessions: reqConcessions,
	};
};
