<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	import Recap1 from "../details/permanents/1/recap.svelte";
	import Recap2 from "../details/permanents/2/recap.svelte";

	const {
		permanents,
	}: {
		permanents: DeclarationSchema["equipe"]["permanents"];
	} = $props();
</script>

{#if !permanents?.femmes && !permanents?.hommes}
	<p class="fr-text--bold fr-text--sm">Pas d’employés permanents</p>
{:else}
	{#if permanents?.femmes}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Combien de femmes travaillent pour l’entreprise ?
		</p>
		<Recap1 {permanents}></Recap1>
	{/if}
	{#if permanents?.hommes}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Combien d’hommes travaillent pour l’entreprise ?
		</p>
		<Recap2 {permanents}></Recap2>
	{/if}
{/if}
