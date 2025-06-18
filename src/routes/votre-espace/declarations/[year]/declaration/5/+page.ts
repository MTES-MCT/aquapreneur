export const load = async ({ parent }) => {
	const { year } = await parent();

	return {
		title: `Déclaration ${year} • Déclaration • 5`,
		step: "declaration",
	};
};
