<script lang="ts">
	import capitalize from "lodash/capitalize";
	import cloneDeep from "lodash/cloneDeep";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ESPECES } from "$lib/constants";
	import { dProd } from "$lib/declaration-utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));
</script>

<h1 class="fr-h2">Production</h1>

<p class="fr-text">
	Merci de vérifier que vous produisez et vendez les espèces suivantes, ou de
	les modifier si les informations sont incorrectes :
</p>

<ul class="fr-list">
	{#each ESPECES as espece (espece.id)}
		{#if dProd(donnees, espece.id).active()}
			<li>{capitalize(espece.label)}</li>
		{/if}
	{/each}
</ul>

<NavigationLinks>
	<button
		class="fr-btn fr-btn--secondary fr-mr-3w"
		onclick={() => goto("./selection-especes")}
	>
		Ajouter ou retirer des espèces
	</button>
	<button class="fr-btn" onclick={() => goto("./recapitulatif")}>
		Confirmer et saisir ma production
	</button>
</NavigationLinks>
