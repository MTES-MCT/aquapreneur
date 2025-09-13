<script lang="ts">
	import { goto } from "$app/navigation";

	import RecapLine from "$lib/components/recap-line.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();
</script>

<div>
	<div class="bandeau-titre">
		<h1 class="fr-h2">Équipe et direction</h1>
	</div>

	<h2 class="fr-h6 fr-mt-10v">Dirigeants et associés</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		{#each data.declaration.donnees.equipe.dirigeants as dir, index (dir.id)}
			{@const statut = data.progressionEquipe.dirigeants.find(
				(d) => d.id === dir.id,
			)}
			<RecapLine
				label={dir.prenomNom ?? `Dirigeant ou associé n° ${index + 1}`}
				icon="fr-icon-user-line"
				status={statut?.statut}
				onEdit={async () => {
					if (statut) {
						statut.statut = "en cours comptable";
					}
					await submitDeclarationUpdate(data.declaration);
					goto(`./details/dirigeants/${dir.id}/1`);
				}}
			>
				TODO tableau récap
			</RecapLine>
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
		<RecapLine
			label="Employés permanents"
			icon="fr-icon-group-line"
			status={data.progressionEquipe.permanents}
			onEdit={async () => {
				data.progressionEquipe.permanents = "en cours comptable";
				await submitDeclarationUpdate(data.declaration);
				goto(`./details/permanents`);
			}}
		>
			TODO tableau récap
		</RecapLine>

		<RecapLine
			label="Employés saisonniers"
			icon="fr-icon-group-line"
			status={data.progressionEquipe.saisonniers}
			onEdit={async () => {
				data.progressionEquipe.saisonniers = "en cours comptable";
				await submitDeclarationUpdate(data.declaration);
				goto(`./details/saisonniers`);
			}}
		>
			TODO tableau récap
		</RecapLine>
	</div>
</div>

<style>
	.bandeau-titre {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
