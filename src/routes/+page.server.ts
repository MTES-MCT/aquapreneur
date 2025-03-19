export const load = (event) => {
  event.locals.audit('audit msg from +page.server.ts');

  return {
    utilisateur: event.locals.utilisateur
  };
};
