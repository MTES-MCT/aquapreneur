import { type SuperValidated, superForm } from "sveltekit-superforms";
import { type ZodValidationSchema, zod4 } from "sveltekit-superforms/adapters";

import { goto } from "$app/navigation";

import { type StatutProgression } from "./schemas/declaration-schema";
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
	{
		schema,
		isLastStep,
		getNextPage,
		updateProgress,
		updateData,
	}: {
		schema: S;
		isLastStep: (form: SuperValidated<T, M, In>) => boolean;
		getNextPage: () => string;
		updateProgress: (statut: StatutProgression) => DeclarationEntry;
		updateData: (form: SuperValidated<T, M, In>) => DeclarationEntry;
	},
	...params: Parameters<typeof superForm<T, M, In>>
) {
	return superForm<T, M, In>(params[0], {
		validators: zod4(schema),
		SPA: true,
		dataType: "json",
		resetForm: false,

		onSubmit: async ({
			submitter,
			cancel,
		}: {
			submitter: HTMLElement | null;
			cancel: () => void;
		}) => {
			if ((submitter as HTMLButtonElement).name === "cantAnswer") {
				const declaration = updateProgress("passage producteur");
				try {
					await submitDeclarationUpdate(declaration);
					goto(getNextPage());
				} catch (err) {
					console.error(err);
				}
				cancel();
			}
		},

		onUpdate: async ({ form }) => {
			if (form.valid) {
				let declaration = updateData(form);
				declaration = updateProgress(
					isLastStep(form) ? "validé comptable" : "en cours comptable",
				);
				try {
					await submitDeclarationUpdate(declaration);
				} catch (err) {
					console.error(err);
				}
			}
		},

		onUpdated: ({ form }) => {
			if (form.valid) {
				goto(getNextPage());
			}
		},

		...params[1],
	});
}
