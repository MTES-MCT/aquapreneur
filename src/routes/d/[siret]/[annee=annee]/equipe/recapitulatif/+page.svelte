<script lang="ts">
	import { goto } from "$app/navigation";

	import Accordion from "$lib/components/accordion.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();
</script>

<div>
	<div class="bandeau-titre">
		<h1 class="fr-h2">Équipe et direction</h1>
	</div>

	<h2 class="fr-h6 fr-mt-10v">Dirigeants et associés</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		{#each data.declaration.donnees.equipe.dirigeants as dir (dir.id)}
			<Accordion>
				{#snippet header()}
					<div style="flex: 1">{dir.prenomNom}</div>
					{data.progressionEquipe.dirigeants.find((d) => d.id === dir.id)
						?.statut}
				{/snippet}
				{#snippet headerAction()}
					{@const validé = false}
					<button
						class="fr-btn fr-mx-2v"
						class:fr-btn--tertiary={validé}
						onclick={async () => {
							const s = data.progressionEquipe.dirigeants.find(
								(d) => d.id === dir.id,
							);
							if (s) {
								s.statut = "en cours comptable";
							}
							await submitDeclarationUpdate(data.declaration);
							goto(`./details/dirigeants/${dir.id}/1`);
						}}
					>
						{validé ? "Validé" : "Compléter"}
					</button>
				{/snippet}
				{#snippet content()}{/snippet}
			</Accordion>
		{/each}
	</div>

	<button
		class="fr-btn fr-btn--tertiary fr-btn--sm fr-mt-2w fr-icon-add-line fr-btn--icon-right"
		onclick={() => {
			const newId = window.crypto.randomUUID();
			goto(`./details/dirigeants/${newId}/1`);
		}}
	>
		Ajouter un mandataires
	</button>

	<h2 class="fr-h6 fr-mt-10v">Main d’œuvre</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		<Accordion>
			{#snippet header()}
				<div style="flex: 1">Employés permanents</div>
				{data.progressionEquipe.permanents}
			{/snippet}
			{#snippet headerAction()}
				{@const validé = false}
				<button
					class="fr-btn fr-mx-2v"
					class:fr-btn--tertiary={validé}
					onclick={async () => {
						data.progressionEquipe.permanents = "en cours comptable";
						await submitDeclarationUpdate(data.declaration);
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
				{data.progressionEquipe.saisonniers}
			{/snippet}
			{#snippet headerAction()}
				{@const validé = false}
				<button
					class="fr-btn fr-mx-2v"
					class:fr-btn--tertiary={validé}
					onclick={async () => {
						data.progressionEquipe.saisonniers = "en cours comptable";
						await submitDeclarationUpdate(data.declaration);
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
