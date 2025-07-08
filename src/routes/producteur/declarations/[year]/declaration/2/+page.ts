export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Déclaration • 2`,
		step: "declaration",
	};
};
