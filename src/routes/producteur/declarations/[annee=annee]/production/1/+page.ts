export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Production • 1`,
		step: "production",
	};
};
