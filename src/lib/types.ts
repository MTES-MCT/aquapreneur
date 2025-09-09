import { z } from "zod";

import type { ANNEES_DECLARATIVES } from "./constants";

export type AnneeDeclarative = (typeof ANNEES_DECLARATIVES)[number];

export const Percent = z.number().nonnegative().lte(100);

export const PositiveNumber = z.number().nonnegative();

export const PositiveInt = z.number().int().nonnegative();

export const IsoDate = z.iso.date();
export const Year = z.number().int();
export const Siret = z.string().regex(/^\d{14}$/);
export const optObject = <T extends object>(t: T) =>
	z.strictObject(t).optional();
