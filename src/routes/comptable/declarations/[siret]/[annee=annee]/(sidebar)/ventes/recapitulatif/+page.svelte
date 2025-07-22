<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import { goto } from "$app/navigation";

	import Accordion from "$lib/components/accordion.svelte";
	import { ESPECES } from "$lib/constants";
	import { ventesParEspece } from "$lib/declaration-utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const especes = $derived(
		ESPECES.filter((e) => ventesParEspece(donnees, e.id).active()),
	);
</script>

<div>
	<h1 class="fr-h2">Ventes</h1>

	{#each especes as espece (espece.id)}
		<h2 class="fr-h6 fr-mt-10v">{espece.label}</h2>

		<div data-fr-group="true" class="fr-accordions-group">
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Ventes à la consommation</div>
				{/snippet}
				{#snippet headerAction()}
					{@const validé = ventesParEspece(
						donnees,
						espece.id,
					).consommation.validé()}
					<button
						class="fr-btn fr-mx-2v"
						class:fr-btn--tertiary={validé}
						onclick={() => {
							goto(`./${espece.slug}/detail-conso/`);
						}}
					>
						{validé ? "Validé" : "Compléter"}
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Ventes à l’élevage</div>
				{/snippet}
				{#snippet headerAction()}
					<button
						class="fr-btn fr-mx-2v"
						disabled
						onclick={() => {
							goto(`./${espece.slug}/detail-elevage/`);
						}}
					>
						Compléter
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Vente de naissain</div>
				{/snippet}
				{#snippet headerAction()}
					<button
						class="fr-btn fr-mx-2v"
						disabled
						onclick={() => {
							goto(`./${espece.slug}/detail-naissain/`);
						}}
					>
						Compléter
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Origine, finition et certification</div>
				{/snippet}
				{#snippet headerAction()}
					<button
						class="fr-btn fr-mx-2v"
						disabled
						onclick={() => {
							goto(`./${espece.slug}/detail-origine/`);
						}}
					>
						Compléter
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>
		</div>
	{/each}
</div>
