export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Entreprise • 1`,
    year,
    step: 'entreprise'
  };
};
