export const load = async ({ params, parent }) => {
	const { etablissement } = await parent();
	const { annee } = params;

	return {
		wide: true,
		returnUrl: `/d/${etablissement.siret}/${annee}/equipe/recapitulatif`,
	};
};
