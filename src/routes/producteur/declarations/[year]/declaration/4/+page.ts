export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Déclaration • 4`,
		step: "declaration",
	};
};
