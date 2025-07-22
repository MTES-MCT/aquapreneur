export const load = async ({ params }) => {
	const { annee } = params;

	return {
		title: `Déclaration ${annee} • Entreprise • 2`,
		step: "entreprise",
	};
};
