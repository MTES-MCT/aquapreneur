export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Déclaration • 2`,
    step: 'declaration'
  };
};
