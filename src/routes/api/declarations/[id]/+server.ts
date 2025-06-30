import { error } from "@sveltejs/kit";

import { updateDeclaration } from "$lib/declaration-store";

export const POST = async ({ params, request, locals }) => {
	const { utilisateur } = locals;

	// TODO: journal et audit
	// TODO ajouter des tests

	if (!utilisateur) {
		error(401);
	}
	if (!utilisateur.estAdmin) {
		// TODO: dans un premier temps, on n’autorise l’édition qu’aux administrateur·ices
		error(403, "Action réservée aux administrateur·ices");
	}
	const { id } = params;
	const body = await request.json();

	const response = await updateDeclaration(Number.parseInt(id), body);
	return new Response(JSON.stringify(response), {
		status: 200,
		headers: { "content-type": "application/json" },
	});
};
