import audit from '$utils/audit';

export const load = (event) => {
  console.log('auditContext', event.locals.auditContext);
  audit('audit msg from +page.server.ts', event.locals.auditContext);

  return {
    utilisateur: event.locals.utilisateur,
    auditContext: event.locals.auditContext
  };
};
