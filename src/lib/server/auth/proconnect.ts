import * as arctic from "arctic";

import { env } from "$env/dynamic/private";

export const proconnect = new arctic.OAuth2Client(
	env.PROCONNECT_CLIENT_ID,
	env.PROCONNECT_CLIENT_SECRET,
	env.PROCONNECT_REDIRECT_URI,
);
