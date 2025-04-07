import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
  const { utilisateur } = await parent();

  if (!utilisateur) redirect(307, '/');

  if (!utilisateur.valide) redirect(307, '/validation');

  return {
    title: 'Mon espace'
  };
};
