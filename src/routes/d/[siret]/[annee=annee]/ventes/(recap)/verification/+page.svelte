<script lang="ts">
	import capitalize from "lodash/capitalize";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import VerifLine from "$lib/components/verif-line.svelte";
	import { ESPECES, type EspeceId } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const especes = ESPECES.filter((e) => data.donneesEspeces[e.id] != null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const p = data.progressionVentes;
		if (
			data.persona !== "producteur" ||
			p.globale !== "préremplissage comptable à valider"
		) {
			console.error("état incorrect", data.persona, data.progressionVentes);
		} else {
			// On passe le statut global en "en cours", pour ne plus revenir à cet écran
			// Et on considère chaque étape validée par le comptable comme validée producteur

			p.globale = "en cours producteur";
			for (const key in p.especes) {
				const tkey = key as EspeceId;
				if (p.especes[tkey]?.naissainCaptage) {
					p.especes[tkey].naissainCaptage =
						p.especes[tkey].naissainCaptage === "validé comptable" ?
							"validé producteur"
						:	null;
				}
				if (p.especes[tkey]?.naissainEcloserieNurserie) {
					p.especes[tkey].naissainEcloserieNurserie =
						p.especes[tkey].naissainEcloserieNurserie === "validé comptable" ?
							"validé producteur"
						:	null;
				}
				if (p.especes[tkey]?.elevage) {
					p.especes[tkey].elevage =
						p.especes[tkey].elevage === "validé comptable" ?
							"validé producteur"
						:	null;
				}
				if (p.especes[tkey]?.consommation) {
					p.especes[tkey].consommation =
						p.especes[tkey].consommation === "validé comptable" ?
							"validé producteur"
						:	null;
				}
				if (p.especes[tkey]?.origine) {
					p.especes[tkey].origine =
						p.especes[tkey].origine === "validé comptable" ?
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
	<h1 class="fr-h2">Ventes</h1>
</div>

<p>
	Veuillez parcourir et vérifier attentivement toutes les données saisies par
	votre comptable, en corrigeant celles qui seraient erronées. Une fois toutes
	les informations vérifiées, vous pourrez les valider et passer à l’étape
	suivante.
</p>

{#each especes as espece (espece.id)}
	<h2 class="fr-h6 fr-mt-10v">{capitalize(espece.label)}</h2>

	<div data-fr-group="true" class="fr-accordions-group">
		<VerifLine
			label="Ventes à la consommation"
			onEdit={async () => {
				goto(`./${espece.slug}/conso/`);
			}}
		>
			RecapVentesConso
		</VerifLine>
	</div>

	<div data-fr-group="true" class="fr-accordions-group">
		<VerifLine
			label="Ventes à l’élevage"
			onEdit={async () => {
				goto(`./${espece.slug}/elevage/`);
			}}
		>
			RecapVentesElevage
		</VerifLine>
	</div>

	<div data-fr-group="true" class="fr-accordions-group">
		<VerifLine
			label="Vente de naissain capté"
			onEdit={async () => {
				goto(`./${espece.slug}/naissain-captage/`);
			}}
		>
			RecapVenteNaissainCaptage
		</VerifLine>
	</div>

	<div data-fr-group="true" class="fr-accordions-group">
		<VerifLine
			label="Vente de naissain d’écloserie/nurserie"
			onEdit={async () => {
				goto(`./${espece.slug}/naissain-ecloserie-nurserie/`);
			}}
		>
			RecapNaissainEcloserie
		</VerifLine>
	</div>

	<div data-fr-group="true" class="fr-accordions-group">
		<VerifLine
			label="Finition et traçabilité"
			onEdit={async () => {
				goto(`./${espece.slug}/origine/`);
			}}
		>
			RecapFinition
		</VerifLine>
	</div>
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
