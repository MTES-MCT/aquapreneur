export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Concessions • 1`,
		step: "concessions",
	};
};
