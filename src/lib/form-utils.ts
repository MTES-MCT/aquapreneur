import { superForm } from "sveltekit-superforms";

export type Message = {
	status: "success" | "error" | "warning";
	text: string;
};

export function nestedSpaForm<
	T extends Record<string, unknown>,
	M extends Message = Message,
	In extends Record<string, unknown> = T,
>(...params: Parameters<typeof superForm<T, M, In>>) {
	return superForm<T, M, In>(params[0], {
		SPA: true,
		dataType: "json",
		resetForm: false,
		...params[1],
	});
}
