// Route API qui ne fait que renvoyer une erreur.
// On l’utilise pour pouvoir vérifier la configuration de Sentry

export const GET = async () => {
	throw new Error("Sonde backend");
};
