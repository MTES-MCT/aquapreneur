import { and, eq, sql } from "drizzle-orm";

import { error } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { bilans } from "$lib/server/db/schema/api";

// import { concessionsTable } from "$lib/server/db/schema/atena";

// import { type LaxNumValue } from "./schemas/cgo-schema";
import { DeclarationSchema } from "./schemas/declaration-schema";
import * as logger from "./server/utils/logger";
import { deepClean } from "./utils";

import type { EtablissementSelect } from "./server/db/types";

// import type { ConcessionSelect } from "./server/db/types";

// const getSurfaceHa = (concessions: ConcessionSelect[]) => {
// 	return Math.round(
// 		concessions
// 			.filter((c) => {
// 				return c.estEspecePrincipale === 1 && c.espece === "Huître creuse";
// 			})
// 			.reduce((acc, current) => {
// 				const surface = current.surfaceParcelle ?? 0;
// 				const surfHa =
// 					current.codeUniteMesure === "M2" ? surface * 0.0001 : surface * 0.01;
// 				return acc + surfHa;
// 			}, 0),
// 	);
// };

// const sumAttrs = (
// 	obj: Record<string, LaxNumValue | unknown> | undefined,
// 	attrs: string[],
// ) => {
// 	if (obj == null) {
// 		return null;
// 	}
// 	return attrs.reduce((acc, currentKey) => {
// 		const val = obj[currentKey];
// 		if (typeof val === "number") {
// 			return acc + val;
// 		}
// 		return acc;
// 	}, 0);
// };

const getBilan = async (siret: string, annee: number) => {
	const result = await db
		.select()
		.from(bilans)
		.where(
			and(
				eq(bilans.siret, siret),
				eq(sql<string>`DATE_PART('year', ${bilans.finExercice})`, annee),
			),
		);
	if (result.length > 1) {
		logger.error("Bilans multiples", {
			siret,
			annee,
			ids: result.map((b) => b.id),
		});
		error(500, "Bilans multiples");
	}

	if (result.length === 1) {
		return result[0];
	}
	return null;
};

// const getConcessions = (siren: string) => {
// 	return db
// 		.select()
// 		.from(concessionsTable)
// 		.where(eq(concessionsTable.siren, siren))
// 		.orderBy(
// 			concessionsTable.quartierParcelle,
// 			concessionsTable.libLocalite,
// 			concessionsTable.nomLieuDit,
// 			concessionsTable.numeroParcelle,
// 		);
// };

export const prefillDeclaration = async (
	etablissement: EtablissementSelect,
	annee: number,
): Promise<DeclarationSchema> => {
	const bilan = await getBilan(etablissement.siret, annee);
	// const concessions = await getConcessions(etablissement.siren);
	const d = bilan?.donnees;

	const declaration = DeclarationSchema.assert({
		commentaires: {},
		etapes: {
			entrepriseValidee: false,
			concessionValidee: false,
			stockValidee: false,
			productionValidee: false,
			envoiValidee: false,
			declarationValidee: false,
		},
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
		dateBilan: bilan?.dateBilan ?? null,
		debutExercice: bilan?.debutExercice ?? null,
		finExercice: bilan?.finExercice ?? null,
		achats: {},
		// TODO
		// deepClean({
		// 	huitreCreuse: {
		// 		naissains: {
		// 			quantite: d?.donnees_economiques.VolAchHNaiss,
		// 		},
		// 		juveniles: { quantite: d?.donnees_economiques.VolAchHDElv },
		// 		adultes: {
		// 			quantite: sumAttrs(d?.donnees_economiques, [
		// 				"VolAchHElv",
		// 				"VolAchHConso",
		// 			]),
		// 		},
		// 	},
		// }),
		ventes: deepClean({
			huitreCreuse: {
				naissains: {
					destination: {
						france: { valeurHT: d?.production.CAHNaissFr },
						unionEuropeenne: { valeurHT: d?.production.CAHNaissUE },
						horsUnionEuropeenne: { valeurHT: d?.production.CAHNaissAu },
					},
				},
				juveniles: {
					destination: {
						france: { valeurHT: d?.production.CAHDElvFr },
						unionEuropeenne: { valeurHT: d?.production.CAHDElvUE },
						horsUnionEuropeenne: { valeurHT: d?.production.CAHDElvAU },
					},
				},
				adultes: {
					elevage: {
						destination: {
							france: { valeurHT: d?.production.CAHElvFr },
							unionEuropeenne: { valeurHT: d?.production.CAHElvUE },
							horsUnionEuropeenne: { valeurHT: d?.production.CAHElvAu },
						},
					},
					consommation: {
						destination: {
							france: {
								degustation: { valeurHT: d?.production.CAHCoFrDeg },
								autresVentesParticuliers: {
									valeurHT: d?.production.CAHCoFrDet,
								},
								autresConchyliculteurs: {
									valeurHT: d?.production.CAHCoFrPro,
								},
								restaurateursTraiteurs: null,
								poissoniersEcaillers: {
									valeurHT: d?.production.CAHCoFrPCE,
								},
								grandesMoyennesSurfaces: {
									valeurHT: d?.production.CAHCoFrPGMS,
								},
								mareyeursGrossistes: {
									valeurHT: d?.production.CAHCoFrGros,
								},
							},
							unionEuropeenne: {
								valeurHT: d?.production.CAHCoUEGros,
							},
							horsUnionEuropeenne: {
								valeurHT: d?.production.CAHCoAuGros,
							},
							// TODO: manque CAHCoUEPro et CAHCoAuPro (export en gros, UE et non UE)
						},
					},
				},
				// Manque “Non catégorisées” CAHFrNCat
			},
			mouleCommune: {
				naissains: {
					destination: {
						france: { valeurHT: d?.production.CAMNaissFr },
						unionEuropeenne: { valeurHT: d?.production.CAMNaissUE },
						horsUnionEuropeenne: { valeurHT: d?.production.CAMNaissAu },
					},
				},
				juveniles: {
					destination: {
						france: { valeurHT: d?.production.CAMDElvFr },
						unionEuropeenne: { valeurHT: d?.production.CAMDElvUE },
						horsUnionEuropeenne: { valeurHT: d?.production.CAMDElvAU },
					},
				},
				adultes: {
					consommation: {
						destination: {
							france: {
								degustation: { valeurHT: d?.production.CAMCoFrDeg },
								autresVentesParticuliers: {
									valeurHT: d?.production.CAMCoFrDet,
								},
								autresConchyliculteurs: {
									valeurHT: d?.production.CAMCoFrPro,
								},
								restaurateursTraiteurs: null,
								poissoniersEcaillers: {
									valeurHT: d?.production.CAMCoFrPCE,
								},
								grandesMoyennesSurfaces: {
									valeurHT: d?.production.CAMCoFrPGMS,
								},
								mareyeursGrossistes: {
									valeurHT: d?.production.CAMCoFrGros,
								},
							},
							unionEuropeenne: {
								valeurHT: d?.production.CAMCoUEGros,
							},
							horsUnionEuropeenne: {
								valeurHT: d?.production.CAMCoAuGros,
							},
							// TODO: manque CAMCoUEPro et CAMCoAuPro (export en gros, UE et non UE)
						},
					},
				},
				// Manque “Non catégorisées” CAMFrNCat
			},
			palourde: {
				naissains: {
					destination: {
						france: { valeurHT: d?.production.CAPNaissFr },
						unionEuropeenne: { valeurHT: d?.production.CAPNaissUE },
						horsUnionEuropeenne: { valeurHT: d?.production.CAPNaissAu },
					},
				},
				juveniles: {
					destination: {
						france: { valeurHT: d?.production.CAPDElvFr },
						unionEuropeenne: { valeurHT: d?.production.CAPDElvUE },
						horsUnionEuropeenne: { valeurHT: d?.production.CAPDElvAU },
					},
				},
				adultes: {
					consommation: {
						destination: {
							france: {
								degustation: { valeurHT: d?.production.CAPCoFrDeg },
								autresVentesParticuliers: {
									valeurHT: d?.production.CAPCoFrDet,
								},
								autresConchyliculteurs: {
									valeurHT: d?.production.CAPCoFrPro,
								},
								restaurateursTraiteurs: null,
								poissoniersEcaillers: {
									valeurHT: d?.production.CAPCoFrPCE,
								},
								grandesMoyennesSurfaces: {
									valeurHT: d?.production.CAPCoFrPGMS,
								},
								mareyeursGrossistes: {
									valeurHT: d?.production.CAPCoFrGros,
								},
							},
							unionEuropeenne: {
								valeurHT: d?.production.CAPCoUEGros,
							},
							horsUnionEuropeenne: {
								valeurHT: d?.production.CAPCoAuGros,
							},
							// TODO: manque CAPCoUEPro et CAPCoAuPro (export en gros, UE et non UE)
						},
					},
				},
				// Manque “Non catégorisées” CAPFrNCat
			},
		}),
		stocks: {},
		// TODO
		// deepClean({
		// 	huitreCreuse: {
		// 		surfaceExploitation: concessions ? getSurfaceHa(concessions) : null,
		// 		naissains: {
		// 			quantite: d?.stock.StckVolHNaisMi,
		// 			repartition: [],
		// 		},
		// 		juveniles: {
		// 			quantite: d?.stock.StckVolHDElv,
		// 			repartition: [],
		// 		},
		// 		adultes: {
		// 			quantite: sumAttrs(d?.stock, ["StckVolHElv", "StckVolHConso"]),
		// 			repartition: [],
		// 		},
		// 	},
		// }),
		concessions: [],
		// On exclue temporairement les concessions de la déclaration
		// concessions: concessions.map((c) => ({
		// 	quartierParcelle: c.quartierParcelle,
		// 	libLocalite: c.libLocalite,
		// 	nomLieuDit: c.nomLieuDit,
		// 	numeroParcelle: c.numeroParcelle,
		// 	codeLocaliteInsee: c.codeLocaliteInsee,
		// 	nomSituation: c.nomSituation,
		// 	typeParcelle: c.typeParcelle,
		// 	surfaceParcelle: c.surfaceParcelle,
		// 	uniteMesure: c.uniteMesure,
		// 	etatParcelle: c.etatParcelle,
		// 	familleExploitation: c.familleExploitation,
		// 	exploitation: c.exploitation,
		// 	familleEspece: c.familleEspece,
		// 	espece: c.espece,
		// 	natureJuridique: c.natureJuridique,
		// 	numArrete: c.numArrete,
		// 	dateArrete: c.dateArrete,
		// })),
	});
	console.dir(deepClean(d?.production ?? {}), { depth: null });
	console.dir(declaration.ventes, { depth: null });
	return declaration;
};
