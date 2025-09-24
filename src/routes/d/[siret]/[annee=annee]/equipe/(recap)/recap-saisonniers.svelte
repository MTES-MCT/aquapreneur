<script lang="ts">
	import type { DonneesDeclaration } from "$lib/schemas/donnees-declaration-schema";

	import Recap1 from "../details/saisonniers/1/recap.svelte";
	import Recap2 from "../details/saisonniers/2/recap.svelte";

	const {
		saisonniers,
	}: {
		saisonniers: DonneesDeclaration["equipe"]["saisonniers"];
	} = $props();
</script>

{#if saisonniers == null}
	<p class="fr-text">Pas d’employés saisonniers</p>
{:else if !saisonniers?.femmes && !saisonniers?.hommes}
	<p class="fr-text">Aucune information renseignée</p>
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
