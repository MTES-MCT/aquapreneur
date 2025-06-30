import { getContext, setContext } from "svelte";

import type { DeclarationSchema } from "./schemas/declaration-schema";

const key = {};

export function setDeclarationContext(donneesDeclaration: DeclarationSchema) {
	setContext(key, donneesDeclaration);
}

export function getDeclarationContext() {
	return getContext(key) as DeclarationSchema;
}

export function resetDeclarationContext() {
	Object.assign(key, {});
}
