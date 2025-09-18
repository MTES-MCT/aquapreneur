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

const valeurVente = optObject({
	valeurHT: PositiveNumber.nullish(),
	quantiteKg: PositiveNumber.nullish(),
});

export const venteSchema = optObject({
	validation: optObject({
		naissain: z.boolean(),
		elevage: z.boolean(),
		consommation: z.boolean(),
		origine: z.boolean(),
	}),

	naissain: optObject({
		captage: optObject({
			destination: optObject({
				france: valeurVente,
				etranger: valeurVente,
			}),
		}),
		ecloserieDiploide: optObject({
			destination: optObject({
				france: valeurVente,
				etranger: valeurVente,
			}),
		}),
		ecloserieTriploide: optObject({
			destination: optObject({
				france: valeurVente,
				etranger: valeurVente,
			}),
		}),
	}),
	elevage: optObject({
		pregrossi: optObject({
			destination: optObject({
				france: valeurVente,
				etranger: valeurVente,
			}),
		}),
		demiElevage: optObject({
			destination: optObject({
				france: valeurVente,
				etranger: valeurVente,
			}),
		}),
		adulte: optObject({
			destination: optObject({
				france: valeurVente,
				etranger: valeurVente,
			}),
		}),
	}),
	consommation: optObject({
		destination: optObject({
			france: z
				.partialRecord(
					z.enum(DESTINATIONS_VENTES_CONSO_FRANCE_IDS),
					valeurVente,
				)
				.optional(),
			unionEuropeenne: valeurVente,
			horsUnionEuropeenne: valeurVente,
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

export const StockValues = optObject({
	stockKg: PositiveNumber.nullish(),
	stockNmoins1kg: PositiveNumber.nullish(),
});

export const StockValuesNaissain = optObject({
	stockMilliers: PositiveNumber.nullish(),
	stockM: PositiveNumber.nullish(),
	stockNmoins1milliers: PositiveNumber.nullish(),
});

export const productionSchema = optObject({
	validation: optObject({
		elevage: z.boolean(),
		origine: z.boolean(),
		zones: z.boolean(),
	}),
	naissain: optObject({
		total: StockValuesNaissain,
		captage: StockValuesNaissain,
		ecloserie: StockValuesNaissain,
	}),
	elevage: optObject({
		pregrossissement: StockValues,
		demiElevage: StockValues,
		adulte: StockValues,
	}),
	origine: optObject({}),
	zonesProduction: z
		.object({
			zone: z.enum(QUARTIERS_IMMATRICULATION_IDS),
			surfaceHa: PositiveInt.nullish(),
		})
		.array()
		.optional(),
});

export const StatutProgressionGlobale = z
	.literal([
		// Comptable
		"préremplissage API à valider",
		"en cours comptable",
		"validé comptable",
		// Producteur
		"préremplissage comptable à valider",
		"en cours producteur",
		"validé producteur",
	])
	.nullish();

export const StatutProgression = z
	.literal([
		// Comptable
		// "préremplissage API à valider",
		// "préremplissage API validé",
		"en cours comptable",
		"validé comptable",
		"passage producteur nécessaire",
		// Producteur
		"préremplissage comptable à valider",
		"préremplissage comptable validé",
		"en cours producteur",
		"validé producteur",
	])
	.nullish();
export type StatutProgression = z.infer<typeof StatutProgression>;

export const DeclarationSchema = z.strictObject({
	progression: z.strictObject({
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
		}),
		ventes: optObject({
			globale: StatutProgression.nullish(),
		}),
		retourAnnee: optObject({
			globale: StatutProgression.nullish(),
		}),
		envoi: optObject({
			globale: StatutProgression.nullish(),
		}),
	}),
	aProduit: z.boolean(),
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
	production: z.record(z.enum(ESPECES_IDS), productionSchema),
	ventes: z.record(z.enum(ESPECES_IDS), venteSchema),

	retourAnnee: z.object({
		aleas: z.enum(ALEAS_IDS).array(),
		aleasDetails: z.string().nullable().default(null),
		difficultes: z.string().nullable().default(null),
		suggestions: z.string().nullable().default(null),
		raisonsInactivite: z.string().nullable().default(null),
	}),
});

export type DeclarationSchema = z.infer<typeof DeclarationSchema>;
