export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Entreprise • 1`,
		step: "entreprise",
	};
};
