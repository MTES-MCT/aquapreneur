import nafRev2 from "$data/naf-rev2.json";
import { type } from "arktype";
import assert from "assert";
import { eq } from "drizzle-orm";

import { SIRENE_AUTH_TOKEN } from "$env/static/private";

import { db } from "$db";

import { entreprises, etablissementsTable } from "$db/schema/entreprise";

import * as logger from "$utils/logger";

import { SireneEtablissementResponse } from "./schemas/sirene-etablissement-schema";

export const getOrCreateEtablissement = async (siret: string) => {
	assert(siret != "");
	assert(siret.length === 14);

	let entreprise = null;
	let etablissement = null;

	const entreprisesResult = await db
		.select()
		.from(entreprises)
		.where(eq(entreprises.siren, siret.slice(0, 9)));

	if (entreprisesResult.length) {
		entreprise = entreprisesResult[0];
	}

	const etablissementResult = await db
		.select()
		.from(etablissementsTable)
		.where(eq(etablissementsTable.siret, siret));

	if (etablissementResult.length) {
		etablissement = etablissementResult[0];
	}

	if (etablissement && !entreprise) {
		logger.error("Établissement présent en BDD, mais pas son entreprise", {
			siret,
		});
		throw new Error("Établissement présent en BDD, mais pas son entreprise");
	}

	if (!etablissement) {
		etablissement = await createEtablissement(siret, entreprise);
	}

	return etablissement;
};

const createEtablissement = async (
	siret: string,
	entreprise: typeof entreprises.$inferSelect | null,
) => {
	const sireneInfo = await getSireneInfo(siret);
	if (sireneInfo) {
		const uniteLegale = sireneInfo.uniteLegale;
		const periodeCourante = sireneInfo.periodesEtablissement?.find(
			(d) => d.dateFin == null,
		);

		if (!entreprise) {
			const codeActivitePrincipale = uniteLegale.activitePrincipaleUniteLegale;
			const activitePrincipale =
				codeActivitePrincipale ?
					nafRev2.find((line) => line.code == codeActivitePrincipale)?.label ||
					null
				:	null;
			const denomination =
				uniteLegale.denominationUniteLegale ||
				uniteLegale.denominationUsuelle1UniteLegale ||
				"";
			const prenom =
				uniteLegale.prenomUsuelUniteLegale ||
				uniteLegale.prenom1UniteLegale ||
				"";
			const nom =
				uniteLegale.nomUsageUniteLegale || uniteLegale.nomUniteLegale || "";
			const prenomNom = `${prenom} ${nom}`.trim();

			const entrDenom = denomination || prenomNom;
			entreprise = (
				await db
					.insert(entreprises)
					.values({
						siren: sireneInfo.siren,
						codeActivitePrincipale,
						activitePrincipale,
						denomination: entrDenom,
					})
					.returning()
			)[0];
		}

		const codeActivitePrincipale =
			periodeCourante?.activitePrincipaleEtablissement;
		const activitePrincipale =
			codeActivitePrincipale ?
				nafRev2.find((line) => line.code == codeActivitePrincipale)?.label ||
				null
			:	null;
		const addr = sireneInfo.adresseEtablissement;

		const adresse =
			[
				addr?.numeroVoieEtablissement,
				addr?.indiceRepetitionEtablissement,
				addr?.typeVoieEtablissement,
				addr?.libelleVoieEtablissement,
			]
				.filter((elt) => !!elt)
				.join(" ") || addr?.complementAdresseEtablissement;

		const denomination =
			periodeCourante?.denominationUsuelleEtablissement ||
			periodeCourante?.enseigne1Etablissement ||
			entreprise.denomination;
		return (
			await db
				.insert(etablissementsTable)
				.values({
					siret,
					siren: sireneInfo.siren,
					denomination,
					siege: sireneInfo.etablissementSiege,
					codeActivitePrincipale,
					activitePrincipale,
					adresse,
					idAdresse: addr?.identifiantAdresseEtablissement,
					codePostal: addr?.codePostalEtablissement,
					codeCommune: addr?.codeCommuneEtablissement,
					commune: addr?.libelleCommuneEtablissement,
				})
				.returning()
		)[0];
	}
};

const getSireneInfo = async (siret: string) => {
	logger.info("Appel à l’API INSEE");
	const res = await fetch(
		`https://api.insee.fr/api-sirene/3.11/siret/${siret}`,
		{
			headers: {
				"x-insee-api-key-integration": SIRENE_AUTH_TOKEN,
			},
		},
	);

	if (!res || !res.ok) {
		throw new Error("Impossible de contacter l’API Sirene");
	} else {
		const jsonRes = await res.json();
		const parsedResponse = SireneEtablissementResponse(jsonRes);

		if (parsedResponse instanceof type.errors) {
			logger.error("Impossible de parser la réponse de l’API Sirene", {
				error: parsedResponse.summary,
			});
			throw new Error("Impossible de parser la réponse de l’API Sirene");
		}
		return parsedResponse.etablissement;
	}
};
