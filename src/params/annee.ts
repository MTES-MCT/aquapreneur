import { ANNEES_DECLARATIVES } from "$lib/constants";

export function match(value) {
	const result = (ANNEES_DECLARATIVES as ReadonlyArray<number>).includes(
		Number.parseInt(value),
	);
	return result;
}
