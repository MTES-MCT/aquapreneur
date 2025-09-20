<script lang="ts">
	import capitalize from "lodash/capitalize";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RecapLine from "$lib/components/recap-line.svelte";
	import { ESPECES } from "$lib/constants";
	import { StatutProgression } from "$lib/schemas/donnees-declaration-schema";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const especes = $derived(
		ESPECES.filter((e) => data.donneesEspeces[e.id] != null),
	);

	const saisieTerminée = $derived.by(() => {
		const statutsFinalises: StatutProgression[] = [
			"passage producteur nécessaire",
			"validé comptable",
			"validé producteur",
		];
		return Object.values(data.progressionProduction?.especes || {}).every(
			(p) =>
				statutsFinalises.includes(p?.origine) &&
				statutsFinalises.includes(p?.elevage) &&
				statutsFinalises.includes(p?.zones),
		);
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (data.persona === "comptable") {
			data.progressionProduction.globale = "validé comptable";
		} else {
			data.progressionProduction.globale = "validé producteur";
		}
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("../ventes");
	};
</script>

<div class="titre">
	<h1 class="fr-h4">Production</h1>
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
	<h2 class="fr-h6 fr-mt-10v fr-mb-2w">{capitalize(espece.label)}</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		<RecapLine
			label="Origine et mode d’élevage"
			status={null}
			icon="fr-icon-list-unordered"
			onEdit={async () => goto(`./${espece.slug}/origine/1`)}
		>
			TODO tableau récap
		</RecapLine>

		<RecapLine
			label="Volume en stock"
			status={null}
			icon="fr-icon-list-unordered"
			onEdit={async () => goto(`./${espece.slug}/elevage/1`)}
		>
			TODO tableau récap
		</RecapLine>

		<RecapLine
			label="Zones de production et pertes"
			status={null}
			icon="fr-icon-list-unordered"
			onEdit={async () => goto(`./${espece.slug}/zones/1`)}
		>
			TODO tableau récap
		</RecapLine>
	</div>
{/each}

{#if saisieTerminée}
	<form method="POST" onsubmit={handleSubmit}>
		<NavigationLinks nextIsButton center />
	</form>
{/if}

<style>
	.titre {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
