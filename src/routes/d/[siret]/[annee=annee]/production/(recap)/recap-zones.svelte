<script lang="ts">
	import isEmpty from "lodash/isEmpty";

	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap2 from "../[espece=espece]/zones/2/recap.svelte";
	import Recap3 from "../[espece=espece]/zones/3/recap.svelte";
	import Recap4 from "../[espece=espece]/zones/4/recap.svelte";
	import Recap5 from "../[espece=espece]/zones/5/recap.svelte";
	import Recap6 from "../[espece=espece]/zones/6/recap.svelte";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

{#if donneesEspece.zonesProduction == null || Object.values(donneesEspece.zonesProduction).every( (z) => isEmpty(z), )}
	<p class="fr-text">Aucune donnée renseignée</p>
{:else}
	{#if Object.values(donneesEspece.zonesProduction!)
		.map((zone) => zone.surfaceHa)
		.some((v) => v != null)}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Surface détenue
		</p>
		<Recap2 {donneesEspece}></Recap2>
	{/if}
	{#if Object.values(donneesEspece.zonesProduction!)
		.map((zone) => zone.partStockNaissain)
		.some((v) => v != null)}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Naissain – captage
		</p>
		<Recap3 {donneesEspece}></Recap3>
	{/if}
	{#if Object.values(donneesEspece.zonesProduction!)
		.map((zone) => zone.partStockPregrossissement)
		.some((v) => v != null)}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Prégrossissement (18 mois)
		</p>
		<Recap4 {donneesEspece}></Recap4>
	{/if}
	{#if Object.values(donneesEspece.zonesProduction!)
		.map((zone) => zone.partStockDemiElevage)
		.some((v) => v != null)}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Demi-élevage (24 mois)
		</p>
		<Recap5 {donneesEspece}></Recap5>
	{/if}
	{#if Object.values(donneesEspece.zonesProduction!)
		.map((zone) => zone.partStockElevageAdulte)
		.some((v) => v != null)}
		<p class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm fr-text--sm">
			Élevage jusqu’à taille marchande
		</p>
		<Recap6 {donneesEspece}></Recap6>
	{/if}
{/if}
