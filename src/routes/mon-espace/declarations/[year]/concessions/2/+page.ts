export const load = async ({ parent }) => {
  const { year } = await parent();

  return {
    title: `Déclaration ${year} • Concessions • 2`,
    step: 'concessions'
  };
};
