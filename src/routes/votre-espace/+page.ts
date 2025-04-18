export const load = async ({ data }) => {
  return {
    title: 'Votre espace',
    exploitants: data.exploitants
  };
};
