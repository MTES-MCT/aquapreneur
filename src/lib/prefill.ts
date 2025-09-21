import { and, desc, eq, ne, sql } from "drizzle-orm";

import { db } from "$lib/server/db";
import { bilans } from "$lib/server/db/schema/api";
import { concessionsTable } from "$lib/server/db/schema/atena";

import { type LaxNumValue } from "./schemas/cgo-schema";
import { DonneesDeclaration } from "./schemas/donnees-declaration-schema";
import { deepClean } from "./utils";

import type { QuartierImmatriculationId } from "./constants";
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
		.where(eq(concessionsTable.siren, siren))
		.orderBy(
			concessionsTable.quartierParcelle,
			concessionsTable.libLocalite,
			concessionsTable.nomLieuDit,
			concessionsTable.numeroParcelle,
		);
};

export const prefillDeclaration = async (
	etablissement: EtablissementSelect,
	annee: number,
): Promise<DonneesDeclaration> => {
	const bilan = await getBilan(etablissement.siret, annee);
	const concessions = await getConcessions(etablissement.siren);
	const quartiers = [
		...new Set(
			concessions
				.map((c) => c.codeQuartierParcelle as QuartierImmatriculationId)
				.filter((codeQuartier) => codeQuartier != null),
		),
	];

	const d = bilan?.donnees;

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
				prenomNom: `${d?.prenom} ${d?.nom}`, // TODO à nettoyer si une des valeurs est vide
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
						// valeurHTMi: d?.stock.StckValHNaisMi,
						// valeurHT: d?.stock.StckValHNaisKg,
						stockKg: d?.stock.StckVolHNaisKg,
						stockMilliers: d?.stock.StckVolHNaisMi,
					},
					destination: {
						france: { valeurHT: d?.production.CAHNaissFr },
						etranger: {
							valeurHT: sumAttrs(d?.production, ["CAHNaissUE", "CAHNaissAu"]),
						},
					},
				},
				demiElevage: {
					stock: {
						// valeurHT: d?.stock.StckValHDElv,
						stockKg: d?.stock.StckVolHDElv,
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
					// valeurHT: d?.stock.StckValHElv,
					stock: {
						stockKg: d?.stock.StckVolHElv,
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
					// valeurHT: d?.stock.StckValHConso,
					// TODO pas utilisé ?
					stock: {
						stockKg: d?.stock.StckVolHConso,
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
						// TODO: manque CAHCoUEPro et CAHCoAuPro (export en gros, UE et non UE)
					},
				},
				// 		// Manque “Non catégorisées” CAHFrNCat
				zonesProduction: Object.fromEntries(
					quartiers.map((q) => [
						q,
						{
							surfaceHa: 1, // TODO: utiliser getSurfaceHa()
						},
					]),
				),
			},
			// mouleCommune: {
			// 	naissain: {
			// 		stock: {
			// 			// valeurHT: d?.stock.StckValMNaiss,
			// 			stockMetres: d?.stock.StckVolMNaiss,
			// 		},
			// 	},
			// 	elevage: {
			// 		demiElevage: {
			// 			// valeurHT: d?.stock.StckValMDElv,
			// 			stockKg: d?.stock.StckVolMDElv,
			// 		},
			// 	},
			// 	// consommation: {
			// 	// 	// valeurHT: d?.stock.StckValMConso,
			// 	// 	stockKg: d?.stock.StckVolMConso,
			// 	// },
			// },
			// palourde: {
			// 	naissain: {
			// 		valeurHT: d?.stock.StckValPNaiss,
			// 		stockKg: d?.stock.StckVolPNaiss,
			// 	},
			// 	elevage: {
			// 		demiElevage: {
			// 			valeurHT: d?.stock.StckValPDElv,
			// 			stockKg: d?.stock.StckVolPDElv,
			// 		},
			// 	},
			// 	// consommation: {
			// 	// 	valeurHT: d?.stock.StckValPConso,
			// 	// 	stockKg: d?.stock.StckVolPConso,
			// 	// },
			// },
		}),

		// 	mouleCommune: {
		// 		naissain: {
		// 			// TODO c’est incorrect, l’API renvoie une valeur totale pour les naissains
		// 			// on n’a pas la ventilation par origine
		// 			captage: {
		// 				destination: {
		// 					france: { valeurHT: d?.production.CAMNaissFr },
		// 					etranger: {
		// 						valeurHT: sumAttrs(d?.production, ["CAMNaissUE", "CAMNaissAu"]),
		// 					},
		// 				},
		// 			},
		// 		},
		// 		elevage: {
		// 			demiElevage: {
		// 				destination: {
		// 					france: { valeurHT: d?.production.CAMDElvFr },
		// 					etranger: {
		// 						valeurHT: sumAttrs(d?.production, ["CAMDElvUE", "CAMDElvAU"]),
		// 					},
		// 				},
		// 			},
		// 		},
		// 		consommation: {
		// 			destination: {
		// 				france: {
		// 					degustation: { valeurHT: d?.production.CAMCoFrDeg },
		// 					autresVentesParticuliers: {
		// 						valeurHT: d?.production.CAMCoFrDet,
		// 					},
		// 					enGros: {
		// 						valeurHT: d?.production.CAMCoFrPro,
		// 					},
		// 					restaurateursTraiteurs: null,
		// 					poissoniersEcaillers: {
		// 						valeurHT: d?.production.CAMCoFrPCE,
		// 					},
		// 					grandesMoyennesSurfaces: {
		// 						valeurHT: d?.production.CAMCoFrPGMS,
		// 					},
		// 					mareyeursGrossistes: {
		// 						valeurHT: d?.production.CAMCoFrGros,
		// 					},
		// 				},
		// 				unionEuropeenne: {
		// 					valeurHT: d?.production.CAMCoUEGros,
		// 				},
		// 				horsUnionEuropeenne: {
		// 					valeurHT: d?.production.CAMCoAuGros,
		// 				},
		// 				// TODO: manque CAMCoUEPro et CAMCoAuPro (export en gros, UE et non UE)
		// 			},
		// 		},
		// 		// Manque “Non catégorisées” CAMFrNCat
		// 	},
		// 	palourde: {
		// 		naissain: {
		// 			// TODO c’est incorrect, l’API renvoie une valeur totale pour les naissains
		// 			// on n’a pas la ventilation par origine
		// 			captage: {
		// 				destination: {
		// 					france: { valeurHT: d?.production.CAPNaissFr },
		// 					etranger: {
		// 						valeurHT: sumAttrs(d?.production, ["CAPNaissUE", "CAPNaissAu"]),
		// 					},
		// 				},
		// 			},
		// 		},
		// 		elevage: {
		// 			demiElevage: {
		// 				destination: {
		// 					france: { valeurHT: d?.production.CAPDElvFr },
		// 					etranger: {
		// 						valeurHT: sumAttrs(d?.production, ["CAPDElvUE", "CAPDElvAU"]),
		// 					},
		// 				},
		// 			},
		// 		},
		// 		consommation: {
		// 			destination: {
		// 				france: {
		// 					degustation: { valeurHT: d?.production.CAPCoFrDeg },
		// 					autresVentesParticuliers: {
		// 						valeurHT: d?.production.CAPCoFrDet,
		// 					},
		// 					enGros: {
		// 						valeurHT: d?.production.CAPCoFrPro,
		// 					},
		// 					restaurateursTraiteurs: null,
		// 					poissoniersEcaillers: {
		// 						valeurHT: d?.production.CAPCoFrPCE,
		// 					},
		// 					grandesMoyennesSurfaces: {
		// 						valeurHT: d?.production.CAPCoFrPGMS,
		// 					},
		// 					mareyeursGrossistes: {
		// 						valeurHT: d?.production.CAPCoFrGros,
		// 					},
		// 				},
		// 				unionEuropeenne: {
		// 					valeurHT: d?.production.CAPCoUEGros,
		// 				},
		// 				horsUnionEuropeenne: {
		// 					valeurHT: d?.production.CAPCoAuGros,
		// 				},
		// 				// TODO: manque CAPCoUEPro et CAPCoAuPro (export en gros, UE et non UE)
		// 			},
		// 		},

		// 		// Manque “Non catégorisées” CAPFrNCat
		// 	},
		// }),
		retourAnnee: {
			aleas: [],
			aleasDetails: null,
			difficultes: null,
			suggestions: null,
			raisonsInactivite: null,
		},
	});
};
