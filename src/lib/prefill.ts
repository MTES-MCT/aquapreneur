import { and, desc, eq, ne, sql } from "drizzle-orm";

import { db } from "$lib/server/db";
import { bilans } from "$lib/server/db/schema/api";
import { concessionsTable } from "$lib/server/db/schema/atena";

import { type LaxNumValue } from "./schemas/cgo-schema";
import { DonneesDeclaration } from "./schemas/donnees-declaration-schema";
import { deepClean } from "./utils";

import type { QuartierImmatriculationId } from "./constants";
import type { EtablissementSelect } from "./server/db/types";
import type { ConcessionSelect } from "./server/db/types";

const getSurfaceHa = (
	quartierId: QuartierImmatriculationId,
	concessions: ConcessionSelect[],
) => {
	return Math.round(
		concessions
			.filter((c) => c.codeQuartierParcelle === quartierId)
			.reduce((acc, current) => {
				const surface = current.surfaceParcelle ?? 0;
				const surfHa =
					current.codeUniteMesure === "M2" ? surface * 0.0001 : surface * 0.01;
				return acc + surfHa;
			}, 0),
	);
};

const sumAttrs = (
	obj: Record<string, LaxNumValue | unknown> | undefined,
	attrs: string[],
) => {
	if (obj == null) {
		return null;
	}
	return attrs.reduce((acc, currentKey) => {
		const val = obj[currentKey];
		if (typeof val === "number") {
			return acc + val;
		}
		return acc;
	}, 0);
};

export const getBilan = async (siret: string, annee: number) => {
	const result = await db
		.select()
		.from(bilans)
		.where(
			and(
				ne(bilans.invalide, true),
				eq(bilans.siret, siret),
				eq(sql<string>`DATE_PART('year', ${bilans.finExercice})`, annee),
			),
		)
		.orderBy(desc(bilans.version))
		.limit(1);

	if (result.length === 1) {
		return result[0];
	}
	return null;
};

const getConcessions = (siren: string) => {
	return db
		.select()
		.from(concessionsTable)
		.where(eq(concessionsTable.siren, siren));
};

export const prefillDeclaration = async (
	etablissement: EtablissementSelect,
	annee: number,
): Promise<DonneesDeclaration> => {
	const bilan = await getBilan(etablissement.siret, annee);
	const bilanPrecedent = await getBilan(etablissement.siret, annee - 1);
	const concessions = (await getConcessions(etablissement.siren)).filter(
		(c) => Number.parseInt(c.dateExpiration?.substring(0, 4) ?? "") >= 2024,
	);

	const concessionsByEspece = {
		huitre: concessions.filter((c) =>
			(c.espece?.toLowerCase() || "").includes("huître"),
		),
		moule: concessions.filter((c) =>
			(c.espece?.toLowerCase() || "").includes("moule"),
		),
	};

	// console.log(
	// 	concessionsByEspece.moule.map((c) => ({
	// 		espece: c.espece,
	// 		exploitation: c.exploitation,
	// 		familleExploitation: c.familleExploitation,
	// 		surfaceParcelle: c.surfaceParcelle,
	// 	})),
	// );

	const quartiersHuitres = [
		...new Set(
			concessionsByEspece.huitre
				.map((c) => c.codeQuartierParcelle as QuartierImmatriculationId)
				.filter((codeQuartier) => codeQuartier != null),
		),
	];

	const quartiersMoules = [
		...new Set(
			concessionsByEspece.moule
				.map((c) => c.codeQuartierParcelle as QuartierImmatriculationId)
				.filter((codeQuartier) => codeQuartier != null),
		),
	];

	const d = bilan?.donnees;
	const dmoins1 = bilanPrecedent?.donnees;

	return DonneesDeclaration.parse({
		progression: {},
		dateBilan: bilan?.dateBilan ?? null,
		debutExercice: bilan?.debutExercice ?? null,
		finExercice: bilan?.finExercice ?? null,
		entreprise: {
			emailEntreprise: null,
		},
		etablissement: {
			siret: etablissement.siret,
			denomination: etablissement.denomination,
			codeActivitePrincipale: etablissement.codeActivitePrincipale,
			activitePrincipale: etablissement.activitePrincipale,
			adresse: etablissement.adresse,
			codePostal: etablissement.codePostal,
			commune: etablissement.commune,
		},
		equipe: {
			dirigeants: d?.dirigeant_es.map((d) => ({
				id: crypto.randomUUID(),
				prenomNom: `${d?.prenom} ${d?.nom}`,
				anneeNaissance: d?.annee_naissance || undefined,
				sexe:
					(["M", "F"] as ReadonlyArray<string>).includes(d?.genre ?? "") ?
						d?.genre
					:	undefined,
				tempsTravail: d?.taux_travail || undefined,
				diplome: d?.diplome || undefined,
				regimeSocial: d?.regime_social || undefined,
				nouveauDirigeant: d?.annee_entree === annee,
			})),
		},
		especes: deepClean({
			huitreCreuse: {
				// A priori, pas ou peu d’écloserie/nurserie chez les producteurs CGO
				// Pour simplifier, on met tout dans le captages
				naissainCaptage: {
					stock: {
						stockMilliers: d?.stock.StckVolHNaisMi,
						stockNmoins1milliers: dmoins1?.stock.StckVolHNaisMi,
					},
					destination: {
						france: {
							valeurHT: d?.production.CAHNaissFr,
							quantiteMilliers: d?.production.VolVtHNaissFr,
						},
						etranger: {
							valeurHT: sumAttrs(d?.production, ["CAHNaissUE", "CAHNaissAu"]),
							quantiteMilliers: sumAttrs(d?.production, [
								"VolVtHNaissUE",
								"VolVtHNaissAu",
							]),
						},
					},
				},
				demiElevage: {
					stock: {
						stockKg: d?.stock.StckVolHDElv,
						stockNmoins1kg: dmoins1?.stock.StckVolHDElv,
					},
					destination: {
						france: {
							valeurHT: d?.production.CAHDElvFr,
							quantiteKg: d?.production.VolVtHDElvFr,
						},
						etranger: {
							valeurHT: sumAttrs(d?.production, ["CAHDElvUE", "CAHDElvAU"]),
							quantiteKg: sumAttrs(d?.production, [
								"VolVtHDElvUE",
								"VolVtHDElvAu",
							]),
						},
					},
				},
				elevageAdulte: {
					stock: {
						stockKg: d?.stock.StckVolHElv,
						stockNmoins1kg: dmoins1?.stock.StckVolHElv,
					},
					destination: {
						france: {
							valeurHT: d?.production.CAHElvFr,
							quantiteKg: d?.production.VolVtHElvFr,
						},
						etranger: {
							valeurHT: sumAttrs(d?.production, ["CAHElvUE", "CAHElvAu"]),
							quantiteKg: sumAttrs(d?.production, [
								"VolVtHElvUE",
								"VolVtHElvAu",
							]),
						},
					},
				},
				consommation: {
					stock: {
						stockKg: d?.stock.StckVolHConso,
						stockNmoins1kg: dmoins1?.stock.StckVolHConso,
					},
					destination: {
						france: {
							degustation: {
								valeurHT: d?.production.CAHCoFrDeg,
								quantiteKg: d?.production.VolVtHCoFrDeg,
							},
							autresVentesParticuliers: {
								valeurHT: d?.production.CAHCoFrDet,
								quantiteKg: d?.production.VolVtHCoFrDet,
							},
							restaurateursTraiteurs: null,
							poissoniersEcaillers: {
								valeurHT: d?.production.CAHCoFrPCE,
								quantiteKg: d?.production.VolVtHCoFrPCE,
							},
							grandesMoyennesSurfaces: {
								valeurHT: d?.production.CAHCoFrPGMS,
								quantiteKg: d?.production.VolVtHCoFrPGMS,
							},
							mareyeursGrossistes: {
								valeurHT: d?.production.CAHCoFrGros,
								quantiteKg: d?.production.VolVtHCoFrGros,
							},
							enGros: {
								valeurHT: d?.production.CAHCoFrPro,
								quantiteKg: d?.production.VolVtHCoFrPro,
							},
						},
						unionEuropeenne: {
							valeurHT: d?.production.CAHCoUEGros,
							quantiteKg: d?.production.VolVtHCoUEGros,
						},
						horsUnionEuropeenne: {
							valeurHT: d?.production.CAHCoAuGros,
							quantiteKg: d?.production.VolVtHCoAuGros,
						},
					},
				},

				zonesProduction: Object.fromEntries(
					quartiersHuitres
						.map((q) => [
							q,
							{
								surfaceHa: getSurfaceHa(q, concessionsByEspece.huitre),
							},
						])
						// @ts-expect-error typage à revoir
						.filter((q) => q[1].surfaceHa > 10),
				),
			},
			mouleCommune: {
				naissainCaptage: {
					stock: {
						stockMetres: d?.stock.StckVolMNaiss,
						stockNmoins1metres: dmoins1?.stock.StckVolMNaiss,
					},
					destination: {
						france: {
							valeurHT: d?.production.CAMNaissFr,
							quantiteMetres: d?.production.VolVtMNaissFr,
						},
						etranger: {
							valeurHT: sumAttrs(d?.production, ["CAMNaissUE", "CAMNaissAu"]),
							quantiteMetres: sumAttrs(d?.production, [
								"VolVtMNaissUE",
								"VolVtMNaissAu",
							]),
						},
					},
				},

				demiElevage: {
					stock: {
						stockKg: d?.stock.StckVolMDElv,
						stockNmoins1kg: dmoins1?.stock.StckVolMDElv,
					},
					destination: {
						france: {
							valeurHT: d?.production.CAMDElvFr,
							quantiteKg: d?.production.VolVtMDElvFr,
						},
						etranger: {
							valeurHT: sumAttrs(d?.production, ["CAMDElvUE", "CAMDElvAU"]),
							quantiteKg: sumAttrs(d?.production, [
								"VolVtMDElvUE",
								"VolVtMDElvAu",
							]),
						},
					},
				},

				consommation: {
					stock: {
						stockKg: d?.stock.StckVolMConso,
						stockNmoins1kg: dmoins1?.stock.StckVolMConso,
					},
					destination: {
						france: {
							degustation: {
								valeurHT: d?.production.CAMCoFrDeg,
								quantiteKg: d?.production.VolVtMCoFrDeg,
							},
							autresVentesParticuliers: {
								valeurHT: d?.production.CAMCoFrDet,
								quantiteKg: d?.production.VolVtMCoFrDet,
							},
							restaurateursTraiteurs: null,
							poissoniersEcaillers: {
								valeurHT: d?.production.CAMCoFrPCE,
								quantiteKg: d?.production.VolVtMCoFrPCE,
							},
							grandesMoyennesSurfaces: {
								valeurHT: d?.production.CAMCoFrPGMS,
								quantiteKg: d?.production.VolVtMCoFrPGMS,
							},
							mareyeursGrossistes: {
								valeurHT: d?.production.CAMCoFrGros,
								quantiteKg: d?.production.VolVtMCoFrGros,
							},
							enGros: {
								valeurHT: d?.production.CAMCoFrPro,
								quantiteKg: d?.production.VolVtMCoFrPro,
							},
						},
						unionEuropeenne: {
							valeurHT: d?.production.CAMCoUEGros,
							quantiteKg: d?.production.VolVtMCoUEGros,
						},
						horsUnionEuropeenne: {
							valeurHT: d?.production.CAMCoAuGros,
							quantiteKg: d?.production.VolVtMCoAuGros,
						},
					},
				},
				zonesProduction: Object.fromEntries(
					quartiersMoules
						.map((q) => [
							q,
							{
								surfaceHa: getSurfaceHa(q, concessionsByEspece.moule),
							},
						])
						// @ts-expect-error typage à revoir
						.filter((q) => q[1].surfaceHa > 10),
				),
			},
		}),

		retourAnnee: {
			aleas: [],
			aleasDetails: null,
			difficultes: null,
			suggestions: null,
			raisonsInactivite: null,
		},
	});
};
