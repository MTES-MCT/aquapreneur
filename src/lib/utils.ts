import { applyAction, enhance } from "$app/forms";
import { goto } from "$app/navigation";

import { DSFR_VERSION } from "./constants";

export const formatDate = (date: string) => {
	return new Intl.DateTimeFormat("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
};

export function enhanceNoInvalidate(node: HTMLFormElement) {
	return enhance(node, () => {
		return async ({ result }) => {
			if (result.type === "redirect") {
				// redirection sans invalidation
				await goto(result.location, { invalidateAll: false });
			} else {
				await applyAction(result);
			}
		};
	});
}

export const dsfrLink = (picto: string, parent = "pictograms") => {
	return `/dsfr-${DSFR_VERSION}/artwork/${parent}/${picto}.svg`;
};
