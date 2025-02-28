import * as arctic from 'arctic';
import {
  PROCONNECT_CLIENT_ID,
  PROCONNECT_CLIENT_SECRET,
  PROCONNECT_REDIRECT_URI
} from '$env/static/private';

export const proconnect = new arctic.OAuth2Client(
  PROCONNECT_CLIENT_ID,
  PROCONNECT_CLIENT_SECRET,
  PROCONNECT_REDIRECT_URI
);
