import merge from "lodash/merge";

import { error } from "@sveltejs/kit";

export const load = async ({ params, parent }) => {
	const { id } = params;
	const { progressionEquipe, equipe } = await parent();

	if (id == null) {
		error(404);
	}

	let dirigeant = equipe.dirigeants.find((d) => d.id === id);

	if (dirigeant == null) {
		dirigeant = {
			id,
		};
		equipe.dirigeants.push(dirigeant);
	}

	merge(progressionEquipe, {
		dirigeants: [],
	});

	let progressionDirigeant = progressionEquipe.dirigeants.find(
		(d) => d.id === id,
	);

	if (progressionDirigeant == null) {
		progressionDirigeant = {
			id,
		};
		progressionEquipe.dirigeants.push(progressionDirigeant);
	}

	return {
		sousTitre: "Dirigeant ou associé",
		numSteps: 3,
		dirigeant,
		progressionDirigeant,
	};
};
