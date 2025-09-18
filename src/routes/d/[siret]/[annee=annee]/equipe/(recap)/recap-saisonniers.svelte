<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	import Recap1 from "../details/saisonniers/1/recap.svelte";
	import Recap2 from "../details/saisonniers/2/recap.svelte";

	const {
		saisonniers,
	}: {
		saisonniers: DeclarationSchema["equipe"]["saisonniers"];
	} = $props();
</script>

{#if !saisonniers?.femmes && !saisonniers?.hommes}
	<p class="fr-text--bold fr-text--sm">Pas d’employés saisonniers</p>
{:else}
	{#if saisonniers?.femmes}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Combien de femmes saisonnières ont travaillé pour l’entreprise ?
		</p>
		<Recap1 {saisonniers}></Recap1>
	{/if}
	{#if saisonniers?.hommes}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Combien d’hommes saisonniers ont travaillé pour l’entreprise ?
		</p>
		<Recap2 {saisonniers}></Recap2>
	{/if}
{/if}
