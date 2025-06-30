export const load = async ({ parent }) => {
	const { year } = await parent();

	return {
		title: `Déclaration ${year} • Stock • 1`,
		step: "stock",
	};
};
