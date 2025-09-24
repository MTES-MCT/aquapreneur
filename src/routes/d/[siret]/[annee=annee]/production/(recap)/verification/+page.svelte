<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import VerifLine from "$lib/components/verif-line.svelte";
	import { ESPECES, type EspeceId } from "$lib/constants";
	import { nomEspece, submitDeclarationUpdate } from "$lib/utils";

	import RecapElevage from "../recap-elevage.svelte";
	import RecapOrigine from "../recap-origine.svelte";
	import RecapZones from "../recap-zones.svelte";

	const { data } = $props();

	const especes = ESPECES.filter((e) => data.donneesEspeces[e.id] != null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const p = data.progressionProduction;
		if (
			data.persona !== "producteur" ||
			p.globale !== "préremplissage comptable à valider"
		) {
			console.error("état incorrect", data.persona, data.progressionProduction);
		} else {
			// On passe le statut global en "en cours", pour ne plus revenir à cet écran
			// Et on considère chaque étape validée par le comptable comme validée producteur

			p.globale = "en cours producteur";
			for (const key in p.especes) {
				const tkey = key as EspeceId;
				if (p.especes[tkey]?.elevage) {
					p.especes[tkey].elevage =
						p.especes[tkey].elevage === "validé comptable" ?
							"validé producteur"
						:	null;
				}
				if (p.especes[tkey]?.origine) {
					p.especes[tkey].origine =
						p.especes[tkey].origine === "validé comptable" ?
							"validé producteur"
						:	null;
				}
				if (p.especes[tkey]?.zones) {
					p.especes[tkey].zones =
						p.especes[tkey].zones === "validé comptable" ?
							"validé producteur"
						:	null;
				}
			}

			data.declaration.donnees = await submitDeclarationUpdate(
				data.declaration,
			);
		}
		goto("./recapitulatif");
	};
</script>

<div class="bandeau-titre">
	<h1 class="fr-h2">Production</h1>
</div>

<p>
	Veuillez parcourir et vérifier attentivement toutes les données saisies par
	votre comptable, en corrigeant celles qui seraient erronées. Une fois toutes
	les informations vérifiées, vous pourrez les valider et passer à l’étape
	suivante.
</p>

{#each especes as espece (espece.id)}
	<h2 class="fr-h6 fr-mt-10v">{nomEspece(espece, { capitalized: true })}</h2>

	{@const progression = data.progressionProduction.especes?.[espece.id]}
	{#if progression?.origine?.startsWith("validé") || progression?.elevage?.startsWith("validé") || progression?.zones?.startsWith("validé")}
		{#if progression?.origine?.startsWith("validé")}
			<div data-fr-group="true" class="fr-accordions-group">
				<VerifLine
					label="Origine et mode d’élevage"
					onEdit={async () => {
						goto(`./${espece.slug}/origine/1`);
					}}
				>
					<RecapOrigine donneesEspece={data.donneesEspeces[espece.id]!}
					></RecapOrigine>
				</VerifLine>
			</div>
		{/if}

		{#if progression?.elevage?.startsWith("validé")}
			<div data-fr-group="true" class="fr-accordions-group">
				<VerifLine
					label="Volume en stock"
					onEdit={async () => {
						goto(`./${espece.slug}/elevage/1`);
					}}
				>
					<RecapElevage
						especeId={espece.id}
						donneesEspece={data.donneesEspeces[espece.id]!}
						annee={data.annee}
					></RecapElevage>
				</VerifLine>
			</div>
		{/if}

		{#if progression?.zones?.startsWith("validé")}
			<div data-fr-group="true" class="fr-accordions-group">
				<VerifLine
					label="Zones de production et pertes"
					onEdit={async () => {
						goto(`./${espece.slug}/zones/1`);
					}}
				>
					<RecapZones donneesEspece={data.donneesEspeces[espece.id]!}
					></RecapZones>
				</VerifLine>
			</div>
		{/if}
	{:else}
		<p class="">Aucune donnée à valider</p>
	{/if}
{/each}

<form method="POST" onsubmit={handleSubmit}>
	<NavigationLinks nextIsButton nextLabel="Confirmer ces données" center />
</form>

<style>
	.bandeau-titre {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
