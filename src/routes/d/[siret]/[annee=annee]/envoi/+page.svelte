<script lang="ts">
	import merge from "lodash/merge";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		merge(data.declaration.donnees.progression, {
			envoi: {},
		});

		if (data.persona === "comptable") {
			data.declaration.donnees.progression.envoi!.globale = "validé comptable";
			data.declaration.donnees.progression.globale = "validé comptable";
		} else {
			data.declaration.donnees.progression.envoi!.globale = "validé comptable";
			data.declaration.donnees.progression.globale = "validé producteur";
		}
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("/tableau-de-bord");
	};
</script>

<h2 class="fr-h2 fr-mt-6v">
	{#if data.persona === "comptable"}
		Envoi à votre adhérent
	{:else}
		Envoi de la déclaration
	{/if}
</h2>

<form method="POST" onsubmit={handleSubmit}>
	<NavigationLinks
		nextIsButton
		nextLabel={data.persona === "comptable" ?
			"Valider et transmettre la déclaration"
		:	"Je confirme ces données"}
		center
	/>
</form>
