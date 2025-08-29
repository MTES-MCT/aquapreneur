export const load = async ({ params }) => {
	const { id } = params;
	return {
		sousTitre: "Dirigeant ou associé",
		numSteps: 3,
		// TODO pourquoi SK considère qu’`id` peut être undefined ?
		dirigeantId: id!,
	};
};
