<script lang="ts">
	import capitalize from "lodash/capitalize";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ESPECES } from "$lib/constants";

	const { data } = $props();
</script>

<h1 class="fr-h3">Production</h1>

<p class="fr-text fr-text--lead">
	Merci de vérifier que vous produisez et vendez les espèces suivantes, ou de
	les modifier si les informations sont incorrectes :
</p>

<ul class="fr-list fr-text--lg">
	{#each ESPECES.filter((e) => data.donneesEspeces[e.id] != null) as espece (espece.id)}
		<li>{capitalize(espece.label)}</li>
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
