<script lang="ts">
	import capitalize from "lodash/capitalize";
	import cloneDeep from "lodash/cloneDeep";

	import { goto } from "$app/navigation";

	import RecapLine from "$lib/components/recap-line.svelte";
	import { ESPECES } from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
	import { StatutProgression } from "$lib/schemas/declaration-schema";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const especes = $derived(
		ESPECES.filter((e) => dVentes(donnees, e.id).active()),
	);
</script>

{#snippet recapLine(title: string, status: StatutProgression, link: string)}
	<RecapLine
		label={title}
		{status}
		icon="fr-icon-list-unordered"
		onEdit={async () => goto(link)}
	>
		TODO tableau récap
	</RecapLine>
{/snippet}

<div>
	<div class="bandeau-titre">
		<h1 class="fr-h2">Ventes</h1>
		<button
			class="fr-btn fr-btn--tertiary fr-btn--sm"
			onclick={() => {
				goto(`./2`);
			}}
		>
			Modifier les espèces
		</button>
	</div>

	{#each especes as espece (espece.id)}
		<h2 class="fr-h6 fr-mt-10v">{capitalize(espece.label)}</h2>

		<div data-fr-group="true" class="fr-accordions-group">
			{@render recapLine(
				"Ventes à la consommation",
				null,
				`./${espece.slug}/conso/`,
			)}

			{@render recapLine(
				"Ventes à l’élevage",
				null,
				`./${espece.slug}/elevage/`,
			)}

			{#if dVentes(donnees, espece.id).naissain.active()}
				{@render recapLine(
					"Vente de naissain",
					null,
					`./${espece.slug}/naissain/`,
				)}
			{/if}
			{@render recapLine(
				"Origine, finition et certification",
				null,
				`./${espece.slug}/origine/`,
			)}
		</div>
	{/each}
</div>

<style>
	.bandeau-titre {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
