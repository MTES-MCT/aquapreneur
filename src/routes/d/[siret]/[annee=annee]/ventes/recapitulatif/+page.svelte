<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import { goto } from "$app/navigation";

	import Accordion from "$lib/components/accordion.svelte";
	import { ESPECES } from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const especes = $derived(
		ESPECES.filter((e) => dVentes(donnees, e.id).active()),
	);
</script>

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
		<h2 class="fr-h6 fr-mt-10v">{espece.label}</h2>

		<div data-fr-group="true" class="fr-accordions-group">
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Ventes à la consommation</div>
				{/snippet}
				{#snippet headerAction()}
					{@const validé = dVentes(donnees, espece.id).consommation.validé}
					<button
						class="fr-btn fr-mx-2v"
						class:fr-btn--tertiary={validé}
						onclick={() => {
							goto(`./${espece.slug}/conso/`);
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
					{@const validé = dVentes(donnees, espece.id).elevage.validé}
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
			{#if dVentes(donnees, espece.id).naissain.active()}
				<Accordion>
					{#snippet header()}
						<div style="flex: 1">Vente de naissain</div>
					{/snippet}
					{#snippet headerAction()}
						{@const validé = dVentes(donnees, espece.id).naissain.validé}
						<button
							class="fr-btn fr-mx-2v"
							class:fr-btn--tertiary={validé}
							onclick={() => {
								goto(`./${espece.slug}/naissain/`);
							}}
						>
							{validé ? "Validé" : "Compléter"}
						</button>
					{/snippet}
					{#snippet content()}{/snippet}
				</Accordion>
			{/if}
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">Origine, finition et certification</div>
				{/snippet}
				{#snippet headerAction()}
					{@const validé = dVentes(donnees, espece.id).consommation
						.origineValidé}
					<button
						class="fr-btn fr-mx-2v"
						class:fr-btn--tertiary={validé}
						onclick={() => {
							goto(`./${espece.slug}/origine/`);
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
