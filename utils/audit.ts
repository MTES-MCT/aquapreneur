import { stringify } from './logger';

export default (msg: string, auditContext = {}) => {
  console.info('[AUDIT]', msg, stringify(auditContext));
};
