export const load = async ({ params }) => {
	const { annee } = params;

	return {
		title: `Déclaration ${annee} • Concessions • 1`,
		step: "concessions",
	};
};
