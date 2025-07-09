export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Déclaration • 3`,
		step: "declaration",
	};
};
