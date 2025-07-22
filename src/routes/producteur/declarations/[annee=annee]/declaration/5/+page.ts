export const load = async ({ params }) => {
	const { annee } = params;

	return {
		title: `Déclaration ${annee} • Déclaration • 5`,
		step: "declaration",
	};
};
