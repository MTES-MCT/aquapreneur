import { DSFR_VERSION } from "./constants";
import { DeclarationSchema } from "./schemas/declaration-schema";

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
