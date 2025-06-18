import { redirect } from "@sveltejs/kit";

export const load = async () => {
	// TODO vérifier la variable `state`
	// TODO vérifier que tout a été nettoyé
	return redirect(302, "/");
};
