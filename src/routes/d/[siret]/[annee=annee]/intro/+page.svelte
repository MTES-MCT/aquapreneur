<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";
	import { submitDeclarationUpdate, typeStatut } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const statutCourant = data.declaration.donnees.progression.globale;
		let nouveauStatut = statutCourant;
		if (data.persona === "comptable") {
			if (!statutCourant) {
				// TODO "préremplissage API à valider" quand on gèrera ce statut
				nouveauStatut = "en cours comptable";
			}
		} else {
			if (!statutCourant) {
				nouveauStatut = "en cours producteur";
			} else if (typeStatut(statutCourant) === "comptable") {
				nouveauStatut = "préremplissage comptable à valider";
			}
		}

		if (nouveauStatut !== statutCourant) {
			data.declaration.donnees.progression.globale = nouveauStatut;
			data.declaration.donnees = await submitDeclarationUpdate(
				data.declaration,
			);
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
