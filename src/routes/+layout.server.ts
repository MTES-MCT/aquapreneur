export const trailingSlash = "never";

export const load = (event) => {
	return {
		utilisateur: event.locals.utilisateur,
	};
};
