export const load = async ({ parent }) => {
	const { declaration } = await parent();

	return {
		retourAnnee: declaration.donnees.retourAnnee,
		step: "retourAnnee",
	};
};
