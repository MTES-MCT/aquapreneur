<script lang="ts">
	import merge from "lodash/merge";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		// Parcours comptable : pas besoin de recopier la déclaration préremplie
		// la déclaration comptable a été initialisée de la même façon.
		// On initialise juste le statut
		if (data.persona === "comptable") {
			if (!data.declaration.donnees.progression.globale) {
				data.declaration.donnees.progression.globale = "en cours comptable";
				data.declaration.donnees = await submitDeclarationUpdate(
					data.declaration,
				);
			}
		}
		// Parcours producteur : si on rentre juste dedans, on recopie la déclaration comptable le cas échéant, en modifiant les statuts au passage
		else {
			if (!data.declaration.donnees.progression.globale) {
				if (data.declarationComptable.donnees.progression.globale) {
					data.declaration.donnees = data.declarationComptable.donnees;
					const progression = data.declaration.donnees.progression;
					merge(progression, {
						equipe: {
							globale: "préremplissage comptable à valider",
						},
						production: {
							globale: "préremplissage comptable à valider",
						},
						ventes: {
							globale: "préremplissage comptable à valider",
						},
						retourAnnee: {
							globale: "préremplissage comptable à valider",
						},
						envoi: {
							globale: null,
						},
					});
				}
				data.declaration.donnees.progression.globale = "en cours producteur";
				data.declaration.donnees = await submitDeclarationUpdate(
					data.declaration,
				);
			}
		}

		goto("./equipe");
	};
</script>

<Pictogram pict="document/contract" width={124} height={124}></Pictogram>

<h2 class="fr-h2 fr-mt-6v">
	{#if data.persona === "comptable"}
		Cette déclaration annuelle de production aquacole concerne votre adhérent :
	{:else}
		Cette déclaration annuelle de production aquacole concerne votre
		entreprise :
	{/if}
</h2>

<p class="fr-h2">
	{data.etablissement.denomination}
</p>

<form method="POST" onsubmit={handleSubmit}>
	<NavigationLinks nextIsButton nextLabel="Commencer" center />
</form>
