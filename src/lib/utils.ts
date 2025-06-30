import { goto } from "$app/navigation";

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

export const submitDeclarationContext = async (
	event: Event,
	idDeclarationCourante: number,
	dc: DeclarationSchema,
	callbackUrl: string,
) => {
	event.preventDefault();
	const req = await fetch(`/api/declarations/${idDeclarationCourante}`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(dc),
	});
	const res = await req.json();
	const parsedRes = DeclarationSchema.assert(res.donnees);
	Object.assign(dc, parsedRes);
	goto(callbackUrl);
};
