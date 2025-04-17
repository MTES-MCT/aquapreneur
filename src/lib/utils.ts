import { applyAction, enhance } from '$app/forms';
import { goto } from '$app/navigation';

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

export function enhanceNoInvalidate(node: HTMLFormElement) {
  return enhance(node, () => {
    return async ({ result }) => {
      if (result.type === 'redirect') {
        // redirection sans invalidation
        await goto(result.location, { invalidateAll: false });
      } else {
        await applyAction(result);
      }
    };
  });
}
