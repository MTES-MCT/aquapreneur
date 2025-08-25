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

<div>
	<div class="bandeau-titre">
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
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Origine et mode d’élevage</div>
				{/snippet}
				{#snippet headerAction()}
					{@const validé = false}
					<button
						class="fr-btn fr-mx-2v"
						class:fr-btn--tertiary={validé}
						onclick={() => {
							goto(`./${espece.slug}/origine/1/`);
						}}
					>
						{validé ? "Validé" : "Compléter"}
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Volume en stock</div>
				{/snippet}
				{#snippet headerAction()}
					{@const validé = false}
					<button
						class="fr-btn fr-mx-2v"
						class:fr-btn--tertiary={validé}
						onclick={() => {
							goto(`./${espece.slug}/elevage/`);
						}}
					>
						{validé ? "Validé" : "Compléter"}
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>

			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Zones de production et pertes</div>
				{/snippet}
				{#snippet headerAction()}
					{@const validé = false}
					<button
						class="fr-btn fr-mx-2v"
						class:fr-btn--tertiary={validé}
						onclick={() => {
							goto(`./${espece.slug}/zones/`);
						}}
					>
						{validé ? "Validé" : "Compléter"}
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>
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
