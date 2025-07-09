export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Stock • 2`,
		step: "stock",
	};
};
