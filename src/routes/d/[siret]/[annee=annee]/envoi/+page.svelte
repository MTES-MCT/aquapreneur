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
			data.declaration.donnees.progression.envoi!.globale = "validé producteur";
			data.declaration.donnees.progression.globale = "validé producteur";
		}
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("/tableau-de-bord");
	};
</script>

{#if data.persona === "comptable"}
	<h2 class="fr-h3 fr-mt-5w">Envoi à l’adhérent</h2>
	<p class="fr-text--lead">
		Votre partie de la déclaration est complétée. Vous pouvez à présent la
		transmettre à votre adhérent afin qu’il complète les données manquantes.
		Après transmission, il ne sera plus possible de modifier les données
		saisies.
	</p>
{:else}
	<h2 class="fr-h3 fr-mt-5w">Envoi</h2>
	<p class="fr-text--lead">
		Votre déclaration est complète. Merci pour votre contribution à l’enquête
		annuelle sur l’aquaculture. Veuillez vérifier l’exactitude de vos données
		avant de la transmettre à l’administration. Après transmission, il ne sera
		plus possible d’y apporter des modifications.
	</p>
{/if}
<form method="POST" onsubmit={handleSubmit}>
	<NavigationLinks
		nextIsButton
		nextLabel={data.persona === "comptable" ?
			"Transmettre la déclaration"
		:	"Soumettre votre déclaration"}
		center
	/>
</form>
