import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import isPlainObject from "lodash/isPlainObject";

import { ANNEES_DECLARATIVES, DSFR_VERSION } from "./constants";
import { DeclarationSchema } from "./schemas/declaration-schema";

import type { AnneeDeclarative } from "./types";

export const formatDate = (date: string | null) => {
	if (date == null) return "";
	return new Intl.DateTimeFormat("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
};

export const dsfrLink = (picto: string, parent = "pictograms") => {
	return `/dsfr-${DSFR_VERSION}/artwork/${parent}/${picto}.svg`;
};

export const formatNum = (value: number, unit = "", naValue = ""): string => {
	if (value == null) return naValue;
	const strNum = Intl.NumberFormat("fr-FR").format(value);
	return unit ? `${strNum} ${unit}` : strNum;
};

export const submitDeclarationUpdate = async (
	id: number,
	donnees: DeclarationSchema,
) => {
	const req = await fetch(`/api/declarations/${id}`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(donnees),
	});
	const res = await req.json();
	return DeclarationSchema.assert(res.donnees);
};

export const deepClean = (obj: object) => {
	// Supprime de façon récursive toutes les clés nulles, non-définies ou vides d’un objet
	const deepCleanOnce = (obj: object) =>
		Object.fromEntries(
			Object.entries(obj)
				.filter((entry) => {
					const val = entry[1];
					return (
						val != null &&
						val !== 0 &&
						!(isArray(val) && isEmpty(val)) &&
						!(isPlainObject(val) && isEmpty(val))
					);
				})
				.map((entry) => [
					entry[0],
					isPlainObject(entry[1]) ? deepClean(entry[1]) : entry[1],
				]),
		);

	let result = obj;
	while (true) {
		const newResult = deepCleanOnce(result);
		if (isEqual(newResult, result)) return result;
		result = newResult;
	}
};

export const estAnneeDeclarative = (
	val: string | number,
): val is AnneeDeclarative => {
	const numVal = typeof val === "number" ? val : Number.parseInt(val);
	return (ANNEES_DECLARATIVES as ReadonlyArray<number>).includes(numVal);
};
