export const load = async ({ params }) => {
	const { annee } = params;

	return {
		title: `Déclaration ${annee} • Déclaration • 1`,
		step: "declaration",
	};
};
