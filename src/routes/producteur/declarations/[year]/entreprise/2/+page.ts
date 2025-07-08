export const load = async ({ parent }) => {
	const { annee } = await parent();

	return {
		title: `Déclaration ${annee} • Entreprise • 2`,
		step: "entreprise",
	};
};
