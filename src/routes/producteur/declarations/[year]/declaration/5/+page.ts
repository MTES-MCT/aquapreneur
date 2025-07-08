export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Déclaration • 5`,
		step: "declaration",
	};
};
