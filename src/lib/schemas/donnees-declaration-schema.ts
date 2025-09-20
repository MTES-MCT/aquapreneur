import { z } from "zod";

import {
	ALEAS_IDS,
	DESTINATIONS_VENTES_CONSO_FRANCE_IDS,
	DIPLOMES_IDS,
	ESPECES_IDS,
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

const ValeurVente = optObject({
	valeurHT: PositiveNumber.nullish(),
	quantiteKg: PositiveNumber.nullish(),
});

export const ValeurStock = optObject({
	stockKg: PositiveNumber.nullish(),
	stockNmoins1kg: PositiveNumber.nullish(),
	// Naissains
	stockMilliers: PositiveNumber.nullish(),
	stockMetres: PositiveNumber.nullish(),
	stockNmoins1milliers: PositiveNumber.nullish(),
});

export const DonneesEspece = optObject({
	// Ex Production :
	//
	// 	naissain: optObject({
	// 	total: ValeurStock,
	// 	captage: ValeurStock,
	// 	ecloserie: ValeurStock,
	// }),
	// elevage: optObject({
	// 	pregrossissement: ValeurStock,
	// 	demiElevage: ValeurStock,
	// 	elevageAdulte: ValeurStock,
	// }),
	// origine: optObject({}),
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
	//
	// Ex Ventes :

	naissainCaptage: optObject({
		total: ValeurStock,
	}),
	naissainEcloserieNurserie: optObject({
		total: ValeurStock,
	}),
	pregrossissement: optObject({
		total: ValeurStock,
	}),
	demiElevage: optObject({
		total: ValeurStock,
	}),
	elevageAdulte: optObject({
		total: ValeurStock,
	}),
	affinage: optObject({
		total: ValeurStock,
	}),

	naissain: optObject({
		captage: optObject({
			destination: optObject({
				france: ValeurVente,
				etranger: ValeurVente,
			}),
		}),
		ecloserieDiploide: optObject({
			destination: optObject({
				france: ValeurVente,
				etranger: ValeurVente,
			}),
		}),
		ecloserieTriploide: optObject({
			destination: optObject({
				france: ValeurVente,
				etranger: ValeurVente,
			}),
		}),
	}),
	elevage: optObject({
		pregrossissement: optObject({
			destination: optObject({
				france: ValeurVente,
				etranger: ValeurVente,
			}),
		}),
		demiElevage: optObject({
			destination: optObject({
				france: ValeurVente,
				etranger: ValeurVente,
			}),
		}),
		elevageAdulte: optObject({
			destination: optObject({
				france: ValeurVente,
				etranger: ValeurVente,
			}),
		}),
	}),
	consommation: optObject({
		destination: optObject({
			france: z
				.partialRecord(
					z.enum(DESTINATIONS_VENTES_CONSO_FRANCE_IDS),
					ValeurVente,
				)
				.optional(),
			unionEuropeenne: ValeurVente,
			horsUnionEuropeenne: ValeurVente,
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
		}),

		bio: optObject({
			part: Percent.nullish(),
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
		especes: z.record(
			z.enum(ESPECES_IDS),
			optObject({
				elevage: StatutProgression,
				origine: StatutProgression,
				zones: StatutProgression,
			}),
		),
	}),
	ventes: optObject({
		globale: StatutProgression.nullish(),
		especes: z.record(
			z.enum(ESPECES_IDS),
			optObject({
				naissain: StatutProgression,
				elevage: StatutProgression,
				consommation: StatutProgression,
				origine: StatutProgression,
			}),
		),
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
					// TODO: remplacer par un record ?
					// TYPES_DUREE_TRAVAIL
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
