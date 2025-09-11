import { error } from "@sveltejs/kit";

export const load = async ({ params, parent }) => {
	const { id } = params;
	const { declaration } = await parent();

	if (id == null) {
		error(404);
	}

	let dirigeant = declaration.donnees.equipe.dirigeants.find(
		(d) => d.id === id,
	);

	if (dirigeant == null) {
		dirigeant = {
			id,
		};
		declaration.donnees.equipe.dirigeants.push(dirigeant);
	}

	return {
		sousTitre: "Dirigeant ou associé",
		numSteps: 3,
		dirigeant,
	};
};
