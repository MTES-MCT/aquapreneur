<script lang="ts">
	import capitalize from "lodash/capitalize";
	import cloneDeep from "lodash/cloneDeep";

	import { goto } from "$app/navigation";

	import Accordion from "$lib/components/accordion.svelte";
	import { ESPECES } from "$lib/constants";
	import { dProd } from "$lib/declaration-utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const especes = $derived(
		ESPECES.filter((e) => dProd(donnees, e.id).active()),
	);
</script>

{#snippet recapLine(title: string, link: string)}
	<Accordion>
		{#snippet header()}
			<div style="flex: 1">
				<span class="fr-icon-list-unordered" aria-hidden="true"></span>
				{title}
			</div>
		{/snippet}
		{#snippet headerAction()}
			{@const validé = false}
			<button
				class="fr-btn fr-mx-2v"
				class:fr-btn--tertiary={validé}
				onclick={() => {
					goto(link);
				}}
			>
				{validé ? "Validé" : "Compléter"}
			</button>
		{/snippet}
		{#snippet content()}{/snippet}
	</Accordion>
{/snippet}

<div>
	<div class="titre">
		<h1 class="fr-h2">Production</h1>
		<button
			class="fr-btn fr-btn--tertiary fr-btn--sm"
			onclick={() => {
				goto(`./selection-especes`);
			}}
		>
			Modifier les espèces
		</button>
	</div>

	{#each especes as espece (espece.id)}
		<h2 class="fr-h6 fr-mt-10v">{capitalize(espece.label)}</h2>

		<div data-fr-group="true" class="fr-accordions-group">
			{@render recapLine(
				"Origine et mode d’élevage",
				`./${espece.slug}/origine/1`,
			)}
			{@render recapLine("Volume en stock", `./${espece.slug}/elevage/1`)}
			{@render recapLine(
				"Zones de production et pertes",
				`./${espece.slug}/zones/1`,
			)}
		</div>
	{/each}
</div>

<style>
	.titre {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
