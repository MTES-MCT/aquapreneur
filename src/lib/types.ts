import { z } from "zod";

import type { ANNEES_DECLARATIVES } from "./constants";

export const ERR_MUST_CHOOSE_ANSWER = "Veuillez choisir une réponse";
export const ERR_REQUIRED = "Veuillez renseigner ce champ";
export const ERR_POSITIVE_NUM = "Veuillez renseigner un nombre positif";
export const ERR_INT = "Veuillez renseigner un nombre entier";
export const ERR_POSITIVE_INT = "Veuillez renseigner un nombre entier positif";
export const ERR_YEAR = "Veuillez renseigner une année (ex : 1981)";
export const ERR_YEAR_MIN =
	"Veuillez renseigner une année après 1900 (ex : 1981)";
export const ERR_PCENT = "Veuillez saisir un pourcentage (entre 1 et 100)";

export const optObject = <T extends object>(t: T) =>
	z.strictObject(t).optional();

export const Bool = z.boolean(ERR_MUST_CHOOSE_ANSWER);

export const PositiveNumber = z
	.number(ERR_REQUIRED)
	.nonnegative(ERR_POSITIVE_NUM);

export const PositiveInt = z
	.number(ERR_INT)
	.int(ERR_INT)
	.nonnegative(ERR_POSITIVE_INT);

export const Percent = z
	.number(ERR_PCENT)
	.nonnegative(ERR_PCENT)
	.lte(100, ERR_PCENT);

export const NonEmptyString = z.string(ERR_REQUIRED).min(1, ERR_REQUIRED);

export const IsoDate = z.iso.date();

export const Year = z.number(ERR_YEAR).int(ERR_YEAR).min(1900, ERR_YEAR_MIN);

export const Siret = z.string().regex(/^\d{14}$/);

export type AnneeDeclarative = (typeof ANNEES_DECLARATIVES)[number];
