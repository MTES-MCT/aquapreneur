export const load = async ({ parent }) => {
	const { year } = await parent();

	return {
		title: `Déclaration ${year} • Stock • 2`,
		step: "stock",
	};
};
