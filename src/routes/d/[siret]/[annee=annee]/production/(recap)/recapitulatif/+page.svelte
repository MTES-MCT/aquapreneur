<script lang="ts">
	import capitalize from "lodash/capitalize";
	import merge from "lodash/merge";
	import SuperDebug from "sveltekit-superforms";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import { env } from "$env/dynamic/public";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RecapLine from "$lib/components/recap-line.svelte";
	import { ESPECES } from "$lib/constants";
	import { StatutProgression } from "$lib/schemas/donnees-declaration-schema";
	import { submitDeclarationUpdate } from "$lib/utils";

	import RecapElevage from "../recap-elevage.svelte";
	import RecapOrigine from "../recap-origine.svelte";
	import RecapZones from "../recap-zones.svelte";

	const { data } = $props();

	const especes = ESPECES.filter((e) => data.donneesEspeces[e.id] != null);

	merge(data.progressionProduction, {
		especes: Object.fromEntries(especes.map((e) => [e.id, {}])),
	});

	const saisieTerminée = $derived.by(() => {
		const statutsFinalises: StatutProgression[] = [
			"passage producteur nécessaire",
			"validé comptable",
			"validé producteur",
		];
		return Object.values(data.progressionProduction.especes || {}).every(
			(p) =>
				p == null ||
				(statutsFinalises.includes(p?.origine) &&
					statutsFinalises.includes(p?.elevage) &&
					statutsFinalises.includes(p?.zones)),
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
			status={data.progressionProduction.especes?.[espece.id]?.origine}
			icon="fr-icon-list-unordered"
			onEdit={async () => {
				merge(data.progressionProduction.especes, {
					[espece.id]: {
						origine:
							data.persona === "comptable" ?
								"en cours comptable"
							:	"en cours producteur",
					},
				});
				await submitDeclarationUpdate(data.declaration);
				goto(`./${espece.slug}/origine/1`);
			}}
		>
			<RecapOrigine donneesEspece={data.donneesEspeces[espece.id]!}
			></RecapOrigine>
		</RecapLine>

		<RecapLine
			label="Volume en stock"
			status={data.progressionProduction.especes?.[espece.id]?.elevage}
			icon="fr-icon-list-unordered"
			onEdit={async () => {
				merge(data.progressionProduction.especes, {
					[espece.id]: {
						elevage:
							data.persona === "comptable" ?
								"en cours comptable"
							:	"en cours producteur",
					},
				});
				await submitDeclarationUpdate(data.declaration);
				goto(`./${espece.slug}/elevage/1`);
			}}
		>
			<RecapElevage
				donneesEspece={data.donneesEspeces[espece.id]!}
				annee={data.annee}
			></RecapElevage>
		</RecapLine>

		<RecapLine
			label="Zones de production et pertes"
			status={data.progressionProduction.especes?.[espece.id]?.zones}
			icon="fr-icon-list-unordered"
			onEdit={async () => {
				merge(data.progressionProduction.especes, {
					[espece.id]: {
						zones:
							data.persona === "comptable" ?
								"en cours comptable"
							:	"en cours producteur",
					},
				});
				await submitDeclarationUpdate(data.declaration);
				goto(`./${espece.slug}/zones/1`);
			}}
		>
			<RecapZones donneesEspece={data.donneesEspeces[espece.id]!}></RecapZones>
		</RecapLine>
	</div>
{/each}

{#if saisieTerminée}
	<form method="POST" onsubmit={handleSubmit}>
		<NavigationLinks nextIsButton center />
	</form>
{/if}

{#if env.PUBLIC_DEBUG_FORM}
	<div class="fr-mt-10w">
		<SuperDebug data={data.donneesEspeces} label="BDD" />
	</div>
{/if}

<style>
	.titre {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
