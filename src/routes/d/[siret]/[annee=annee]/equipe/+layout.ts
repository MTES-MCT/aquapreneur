import merge from "lodash/merge";

export const load = async ({ parent }) => {
	const { declaration } = await parent();

	merge(declaration.donnees.progression, {
		equipe: { dirigeants: [] },
	});

	return {
		equipe: declaration.donnees.equipe,
		progressionEquipe: declaration.donnees.progression.equipe!,
		step: "equipe",
	};
};
