import { type SuperValidated, superForm } from "sveltekit-superforms";
import { type ZodValidationSchema, zod4 } from "sveltekit-superforms/adapters";

import { goto } from "$app/navigation";

import { submitDeclarationUpdate } from "./utils";

import type { DeclarationEntry } from "./server/db/types";

export type Message = {
	status: "success" | "error" | "warning";
	text: string;
};

export function prepareForm<
	S extends ZodValidationSchema,
	T extends Record<string, unknown>,
	M extends Message = Message,
	In extends Record<string, unknown> = T,
>(
	schema: S,
	declaration: DeclarationEntry,
	getNextPage: () => string,
	updateData: <F extends SuperValidated<T, M, In>>(form: F) => DeclarationEntry,
	...params: Parameters<typeof superForm<T, M, In>>
) {
	return superForm<T, M, In>(params[0], {
		validators: zod4(schema),
		SPA: true,
		dataType: "json",
		resetForm: false,
		onUpdate: async ({ form }) => {
			if (form.valid) {
				declaration = updateData<SuperValidated<T, M, In>>(form);
				try {
					await submitDeclarationUpdate(declaration.id, declaration.donnees);
				} catch (err) {
					console.error(err);
				}
			}
		},
		onUpdated({ form }) {
			if (form.valid) {
				goto(getNextPage());
			}
		},
		...params[1],
	});
}
