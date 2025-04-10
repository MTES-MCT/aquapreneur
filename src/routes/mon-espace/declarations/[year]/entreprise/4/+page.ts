export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Entreprise • 4`,
    step: 'entreprise'
  };
};
