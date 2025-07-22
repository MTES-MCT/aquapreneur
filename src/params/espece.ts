import { ESPECES } from "$lib/constants";

export function match(value) {
	const especes = ESPECES.map((e) => e.slug) as ReadonlyArray<string>;
	return especes.includes(value);
}
