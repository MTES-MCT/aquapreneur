<script lang="ts">
	import merge from "lodash/merge";
	import SuperDebug from "sveltekit-superforms";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import { env } from "$env/dynamic/public";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RecapLine from "$lib/components/recap-line.svelte";
	import { ESPECES } from "$lib/constants";
	import { StatutProgression } from "$lib/schemas/donnees-declaration-schema";
	import { nomEspece, submitDeclarationUpdate } from "$lib/utils";

	import RecapConso from "../recap-conso.svelte";
	import RecapElevage from "../recap-elevage.svelte";
	import RecapNaissainCaptage from "../recap-naissain-captage.svelte";
	import RecapNaissainEcloserieNurserie from "../recap-naissain-ecloserie-nurserie.svelte";
	import RecapOrigine from "../recap-origine.svelte";

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
		return Object.values(data.progressionVentes?.especes || {}).every(
			(p) =>
				p == null ||
				(statutsFinalises.includes(p?.consommation) &&
					statutsFinalises.includes(p?.elevage) &&
					statutsFinalises.includes(p?.naissainCaptage) &&
					statutsFinalises.includes(p?.naissainEcloserieNurserie) &&
					statutsFinalises.includes(p?.origine)),
		);
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (data.persona === "comptable") {
			data.progressionVentes.globale = "validé comptable";
		} else {
			data.progressionVentes.globale = "validé producteur";
		}
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("../retour-annee");
	};
</script>

<h1 class="fr-h4">Ventes</h1>

{#each especes as espece (espece.id)}
	<h2 class="fr-h6 fr-mt-10v">{nomEspece(espece, { capitalized: true })}</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		<RecapLine
			label="Ventes à la consommation"
			status={data.progressionVentes.especes?.[espece.id]?.consommation}
			icon="fr-icon-list-unordered"
			onEdit={async () => {
				merge(data.progressionVentes.especes, {
					[espece.id]: {
						consommation:
							data.persona === "comptable" ?
								"en cours comptable"
							:	"en cours producteur",
					},
				});
				goto(`./${espece.slug}/conso/`);
			}}
		>
			<RecapConso donneesEspece={data.donneesEspeces[espece.id]!}></RecapConso>
		</RecapLine>

		<RecapLine
			label="Ventes à l’élevage"
			status={data.progressionVentes.especes?.[espece.id]?.elevage}
			icon="fr-icon-list-unordered"
			onEdit={async () => {
				merge(data.progressionVentes.especes, {
					[espece.id]: {
						elevage:
							data.persona === "comptable" ?
								"en cours comptable"
							:	"en cours producteur",
					},
				});
				goto(`./${espece.slug}/elevage/`);
			}}
		>
			<RecapElevage donneesEspece={data.donneesEspeces[espece.id]!}
			></RecapElevage>
		</RecapLine>

		{#if data.donneesEspeces[espece.id]?.naissainCaptage != null}
			<RecapLine
				label="Vente de naissain capté"
				status={data.progressionVentes.especes?.[espece.id]?.naissainCaptage}
				icon="fr-icon-list-unordered"
				onEdit={async () => {
					merge(data.progressionVentes.especes, {
						[espece.id]: {
							naissainCaptage:
								data.persona === "comptable" ?
									"en cours comptable"
								:	"en cours producteur",
						},
					});
					goto(`./${espece.slug}/naissain-captage/`);
				}}
			>
				<RecapNaissainCaptage donneesEspece={data.donneesEspeces[espece.id]!}
				></RecapNaissainCaptage>
			</RecapLine>
		{/if}

		{#if data.donneesEspeces[espece.id]?.naissainEcloserieNurserie != null}
			<RecapLine
				label="Vente de naissain d’écloserie/nurserie"
				status={data.progressionVentes.especes?.[espece.id]
					?.naissainEcloserieNurserie}
				icon="fr-icon-list-unordered"
				onEdit={async () => {
					merge(data.progressionVentes.especes, {
						[espece.id]: {
							naissainEcloserieNurserie:
								data.persona === "comptable" ?
									"en cours comptable"
								:	"en cours producteur",
						},
					});
					goto(`./${espece.slug}/naissain-ecloserie-nurserie/`);
				}}
			>
				<RecapNaissainEcloserieNurserie
					donneesEspece={data.donneesEspeces[espece.id]!}
				></RecapNaissainEcloserieNurserie>
			</RecapLine>
		{/if}

		<RecapLine
			label="Finition et traçabilité"
			status={data.progressionVentes.especes?.[espece.id]?.origine}
			icon="fr-icon-list-unordered"
			onEdit={async () => {
				merge(data.progressionVentes.especes, {
					[espece.id]: {
						origine:
							data.persona === "comptable" ?
								"en cours comptable"
							:	"en cours producteur",
					},
				});
				goto(`./${espece.slug}/origine/`);
			}}
		>
			<RecapOrigine donneesEspece={data.donneesEspeces[espece.id]!}
			></RecapOrigine>
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
