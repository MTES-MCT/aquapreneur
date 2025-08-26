<script lang="ts">
	import { goto } from "$app/navigation";

	import Accordion from "$lib/components/accordion.svelte";
</script>

<div>
	<div class="bandeau-titre">
		<h1 class="fr-h2">Équipe et direction</h1>
	</div>

	<h2 class="fr-h6 fr-mt-10v">Dirigeants et associés</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		<Accordion>
			{#snippet header()}
				<div style="flex: 1">Nom Prenom</div>
			{/snippet}
			{#snippet headerAction()}
				{@const validé = false}
				<button
					class="fr-btn fr-mx-2v"
					class:fr-btn--tertiary={validé}
					onclick={() => {
						goto(`./details/dirigeants/1`);
					}}
				>
					{validé ? "Validé" : "Compléter"}
				</button>
			{/snippet}
			{#snippet content()}{/snippet}
		</Accordion>
	</div>

	<button
		class="fr-btn fr-btn--tertiary fr-btn--sm fr-mt-2w fr-icon-add-line fr-btn--icon-right"
		onclick={() => {
			goto(`./details/dirigeants/1?nouveau`);
		}}
	>
		Ajouter un mandataires
	</button>

	<h2 class="fr-h6 fr-mt-10v">Main d’œuvre</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		<Accordion>
			{#snippet header()}
				<div style="flex: 1">Employés permanents</div>
			{/snippet}
			{#snippet headerAction()}
				{@const validé = false}
				<button
					class="fr-btn fr-mx-2v"
					class:fr-btn--tertiary={validé}
					onclick={() => {
						goto(`./details/permanents`);
					}}
				>
					{validé ? "Validé" : "Compléter"}
				</button>
			{/snippet}
			{#snippet content()}{/snippet}
		</Accordion>

		<Accordion>
			{#snippet header()}
				<div style="flex: 1">Employés saisonniers</div>
			{/snippet}
			{#snippet headerAction()}
				{@const validé = false}
				<button
					class="fr-btn fr-mx-2v"
					class:fr-btn--tertiary={validé}
					onclick={() => {
						goto(`./details/saisonniers`);
					}}
				>
					{validé ? "Validé" : "Compléter"}
				</button>
			{/snippet}
			{#snippet content()}{/snippet}
		</Accordion>
	</div>
</div>

<style>
	.bandeau-titre {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
