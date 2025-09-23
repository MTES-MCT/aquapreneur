import { z } from "zod";

import {
	ALEAS_IDS,
	DESTINATIONS_VENTES_CONSO_FRANCE_IDS,
	DIPLOMES_IDS,
	ESPECES_IDS,
	MODES_ELEVAGE_IDS,
	ORIGINES_NAISSAIN_IDS,
	QUARTIERS_IMMATRICULATION_IDS,
	REGIMES_SOCIAUX_IDS,
} from "$lib/constants";
import {
	IsoDate,
	Percent,
	PositiveInt,
	PositiveNumber,
	Siret,
	Year,
	optObject,
} from "$lib/types";

const ValeurQuantite = optObject({
	valeurHT: PositiveNumber.nullish(),
	quantiteKg: PositiveNumber.nullish(),
	// Naissains
	quantiteMilliers: PositiveNumber.nullish(),
	// Naissains moules
	quantiteMetres: PositiveNumber.nullish(),
});

export const ValeurStock = optObject({
	stockKg: PositiveNumber.nullish(),
	stockNmoins1kg: PositiveNumber.nullish(),
	// Naissains
	stockMilliers: PositiveNumber.nullish(),
	stockNmoins1milliers: PositiveNumber.nullish(),
	// Naissains moules
	stockMetres: PositiveNumber.nullish(),
	stockNmoins1metres: PositiveNumber.nullish(),
});

export const DonneesEspece = optObject({
	modeElevage: z
		.partialRecord(
			z.enum(MODES_ELEVAGE_IDS),
			optObject({
				part: Percent.nullish(),
				value: PositiveNumber.nullish(),
			}),
		)
		.optional(),

	zonesProduction: z
		.partialRecord(
			z.enum(QUARTIERS_IMMATRICULATION_IDS),
			z.object({
				surfaceHa: PositiveInt.nullish(),
				partStockNaissain: Percent.nullish(),
				pertesNaissain: Percent.nullish(),
				partStockDemiElevage: Percent.nullish(),
				pertesDemiElevage: Percent.nullish(),
				partStockElevageAdulte: Percent.nullish(),
				pertesElevageAdulte: Percent.nullish(),
			}),
		)
		.optional(),

	naissainCaptage: optObject({
		stock: ValeurStock,
		destination: optObject({
			france: ValeurQuantite,
			etranger: ValeurQuantite,
		}),
	}),
	naissainEcloserieNurserie: optObject({
		stock: ValeurStock,
		destination: optObject({
			france: optObject({
				ecloserieNurserieDiploide: ValeurQuantite,
				ecloserieNurserieTriploide: ValeurQuantite,
			}),
			etranger: optObject({
				ecloserieNurserieDiploide: ValeurQuantite,
				ecloserieNurserieTriploide: ValeurQuantite,
			}),
		}),
		ecloserieNurserieDiploide: optObject({
			france: ValeurQuantite,
			etranger: ValeurQuantite,
		}),
		ecloserieNurserieTriploide: optObject({
			france: ValeurQuantite,
			etranger: ValeurQuantite,
		}),
	}),
	pregrossissement: optObject({
		stock: ValeurStock,
		destination: optObject({
			france: ValeurQuantite,
			etranger: ValeurQuantite,
		}),
	}),
	demiElevage: optObject({
		stock: ValeurStock,
		destination: optObject({
			france: ValeurQuantite,
			etranger: ValeurQuantite,
		}),
	}),
	elevageAdulte: optObject({
		stock: ValeurStock,
		destination: optObject({
			france: ValeurQuantite,
			etranger: ValeurQuantite,
		}),
	}),
	consommation: optObject({
		stock: ValeurStock,
		destination: optObject({
			france: z
				.partialRecord(
					z.enum(DESTINATIONS_VENTES_CONSO_FRANCE_IDS),
					ValeurQuantite,
				)
				.optional(),
			unionEuropeenne: ValeurQuantite,
			horsUnionEuropeenne: ValeurQuantite,
		}),
		bio: optObject({
			part: Percent.nullish(),
		}),
		affinage: optObject({
			claires: optObject({
				part: Percent.nullish(),
				surfaceHa: PositiveInt.nullish(),
			}),
			parcs: optObject({
				part: Percent.nullish(),
				surfaceHa: PositiveInt.nullish(),
			}),
			pousseClaire: optObject({
				part: Percent.nullish(),
				surfaceHa: PositiveInt.nullish(),
			}),
		}),
		origine: z
			.partialRecord(
				z.enum(ORIGINES_NAISSAIN_IDS),
				z.object({
					part: Percent.nullish(),
					value: PositiveNumber.nullish(),
				}),
			)
			.optional(),
	}),
});

// On veut le type requis
const _DonneesEspeceReq = DonneesEspece.unwrap();
export type DonneesEspece = z.infer<typeof _DonneesEspeceReq>;

export const StatutProgressionGlobale = z
	.literal([
		// Comptable
		"en cours comptable",
		"validé comptable",
		// Producteur
		"en cours producteur",
		"validé producteur",
	])
	.nullish();

export const StatutProgression = z
	.literal([
		// Comptable
		"préremplissage API à valider",
		"en cours comptable",
		"validé comptable",
		"passage producteur nécessaire",
		// Producteur
		"préremplissage comptable à valider",
		"en cours producteur",
		"validé producteur",
	])
	.nullish();
export type StatutProgression = z.infer<typeof StatutProgression>;

const Progression = z.strictObject({
	globale: StatutProgressionGlobale.nullish(),
	equipe: optObject({
		globale: StatutProgression.nullish(),
		dirigeants: z
			.strictObject({
				id: z.uuid({ version: "v4" }),
				statut: StatutProgression,
			})
			.array(),
		permanents: StatutProgression,
		saisonniers: StatutProgression,
	}),
	production: optObject({
		globale: StatutProgression.nullish(),
		especes: z
			.partialRecord(
				z.enum(ESPECES_IDS),
				optObject({
					elevage: StatutProgression,
					origine: StatutProgression,
					zones: StatutProgression,
				}),
			)
			.optional(),
	}),
	ventes: optObject({
		globale: StatutProgression.nullish(),
		especes: z
			.partialRecord(
				z.enum(ESPECES_IDS),
				optObject({
					naissainCaptage: StatutProgression,
					naissainEcloserieNurserie: StatutProgression,
					elevage: StatutProgression,
					consommation: StatutProgression,
					origine: StatutProgression,
				}),
			)
			.optional(),
	}),
	retourAnnee: optObject({
		globale: StatutProgression.nullish(),
		imprevus: StatutProgression.nullish(),
		difficultes: StatutProgression.nullish(),
		suggestions: StatutProgression.nullish(),
	}),
	envoi: optObject({
		globale: StatutProgression.nullish(),
	}),
});

export const DonneesDeclaration = z.strictObject({
	progression: Progression,

	dateBilan: IsoDate.nullish(),
	debutExercice: IsoDate.nullish(),
	finExercice: IsoDate.nullish(),

	entreprise: z.strictObject({
		emailEntreprise: z.email().nullable().default(null),
		telEntreprise: z.string().nullable().default(null),
		emailContact: z.email().nullable().default(null),
		telContact: z.string().nullable().default(null),
	}),

	etablissement: z.strictObject({
		siret: Siret,
		denomination: z.string().nullable(),
		codeActivitePrincipale: z.string().nullable(),
		activitePrincipale: z.string().nullable(),
		adresse: z.string().nullable(),
		codePostal: z.string().nullable(),
		commune: z.string().nullable(),
	}),

	equipe: z.strictObject({
		dirigeants: z
			.object({
				id: z.uuid({ version: "v4" }),
				prenomNom: z.string().optional(),
				anneeNaissance: Year.optional(),
				nationalite: z.string().optional(),
				sexe: z.literal(["M", "F"]).optional(),
				statut: z.literal(["salarie", "nonSalarie"]).optional(),
				tempsTravail: Percent.optional(),
				diplome: z.enum(DIPLOMES_IDS).optional(),
				regimeSocial: z.enum(REGIMES_SOCIAUX_IDS).optional(),
				nouveauDirigeant: z.boolean().optional(),
			})
			.array(),
		permanents: optObject({
			femmes: optObject({
				salarie: optObject({
					tempsPlein: PositiveInt.nullish(),
					plusDunMiTemps: PositiveInt.nullish(),
					miTemps: PositiveInt.nullish(),
					moinsDunMiTemps: PositiveInt.nullish(),
				}),
				nonSalarie: optObject({
					tempsPlein: PositiveInt.nullish(),
					plusDunMiTemps: PositiveInt.nullish(),
					miTemps: PositiveInt.nullish(),
					moinsDunMiTemps: PositiveInt.nullish(),
				}),
			}),
			hommes: optObject({
				salarie: optObject({
					tempsPlein: PositiveInt.nullish(),
					plusDunMiTemps: PositiveInt.nullish(),
					miTemps: PositiveInt.nullish(),
					moinsDunMiTemps: PositiveInt.nullish(),
				}),
				nonSalarie: optObject({
					tempsPlein: PositiveInt.nullish(),
					plusDunMiTemps: PositiveInt.nullish(),
					miTemps: PositiveInt.nullish(),
					moinsDunMiTemps: PositiveInt.nullish(),
				}),
			}),
		}),
		saisonniers: optObject({
			femmes: optObject({
				cdd: optObject({
					nbJours: PositiveInt.nullish(),
					nbPersonnes: PositiveInt.nullish(),
				}),
				interim: optObject({
					nbJours: PositiveInt.nullish(),
					nbPersonnes: PositiveInt.nullish(),
				}),
			}),
			hommes: optObject({
				cdd: optObject({
					nbJours: PositiveInt.nullish(),
					nbPersonnes: PositiveInt.nullish(),
				}),
				interim: optObject({
					nbJours: PositiveInt.nullish(),
					nbPersonnes: PositiveInt.nullish(),
				}),
			}),
		}),
	}),

	especes: z.record(z.enum(ESPECES_IDS), DonneesEspece),

	retourAnnee: z.object({
		aleas: z.enum(ALEAS_IDS).array(),
		aleasDetails: z.string().nullable().default(null),
		difficultes: z.string().nullable().default(null),
		suggestions: z.string().nullable().default(null),
		raisonsInactivite: z.string().nullable().default(null),
	}),
});

export type DonneesDeclaration = z.infer<typeof DonneesDeclaration>;
