<script lang="ts">
	import SuperDebug from "sveltekit-superforms";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import { env } from "$env/dynamic/public";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RecapLine from "$lib/components/recap-line.svelte";
	import type { StatutProgression } from "$lib/schemas/donnees-declaration-schema";
	import { submitDeclarationUpdate } from "$lib/utils";

	import RecapDirigeant from "../recap-dirigeant.svelte";
	import RecapPermanents from "../recap-permanents.svelte";
	import RecapSaisonniers from "../recap-saisonniers.svelte";

	const { data } = $props();

	const saisieTerminée = $derived.by(() => {
		const statutsFinalises: StatutProgression[] = [
			"passage producteur nécessaire",
			"validé comptable",
			"validé producteur",
		];
		const p = data.progressionEquipe;
		return (
			!!p &&
			statutsFinalises.includes(p.permanents) &&
			statutsFinalises.includes(p.saisonniers) &&
			p.dirigeants.every((sd) => statutsFinalises.includes(sd.statut))
		);
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (data.persona === "comptable") {
			data.progressionEquipe.globale = "validé comptable";
		} else {
			data.progressionEquipe.globale = "validé producteur";
		}
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("../production");
	};
</script>

<h1 class="fr-h2">Équipe et direction</h1>

<h2 class="fr-h6 fr-mt-10w">Dirigeants et associés</h2>

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
					statut.statut =
						data.persona === "comptable" ?
							"en cours comptable"
						:	"en cours producteur";
				}
				await submitDeclarationUpdate(data.declaration);
				goto(`./details/dirigeants/${dir.id}/1`);
			}}
		>
			<RecapDirigeant dirigeant={dir}></RecapDirigeant>
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
			data.progressionEquipe.permanents =
				data.persona === "comptable" ?
					"en cours comptable"
				:	"en cours producteur";
			await submitDeclarationUpdate(data.declaration);
			goto(`./details/permanents`);
		}}
	>
		<RecapPermanents permanents={data.equipe.permanents}></RecapPermanents>
	</RecapLine>

	<RecapLine
		label="Employés saisonniers"
		icon="fr-icon-group-line"
		status={data.progressionEquipe.saisonniers}
		onEdit={async () => {
			data.progressionEquipe.saisonniers =
				data.persona === "comptable" ?
					"en cours comptable"
				:	"en cours producteur";
			await submitDeclarationUpdate(data.declaration);
			goto(`./details/saisonniers`);
		}}
	>
		<RecapSaisonniers saisonniers={data.equipe.saisonniers}></RecapSaisonniers>
	</RecapLine>
</div>

{#if saisieTerminée}
	<form method="POST" onsubmit={handleSubmit}>
		<NavigationLinks nextIsButton center />
	</form>
{/if}

{#if env.PUBLIC_DEBUG_FORM}
	<div class="fr-mt-10w">
		<SuperDebug data={data.equipe} label="BDD" />
	</div>
{/if}
