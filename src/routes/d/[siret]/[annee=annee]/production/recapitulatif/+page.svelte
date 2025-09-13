<script lang="ts">
	import capitalize from "lodash/capitalize";
	import cloneDeep from "lodash/cloneDeep";

	import { goto } from "$app/navigation";

	import RecapLine from "$lib/components/recap-line.svelte";
	import { ESPECES } from "$lib/constants";
	import { dProd } from "$lib/declaration-utils";
	import { StatutProgression } from "$lib/schemas/declaration-schema";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const especes = $derived(
		ESPECES.filter((e) => dProd(donnees, e.id).active()),
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
				null,
				`./${espece.slug}/origine/1`,
			)}
			{@render recapLine("Volume en stock", null, `./${espece.slug}/elevage/1`)}
			{@render recapLine(
				"Zones de production et pertes",
				null,
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
