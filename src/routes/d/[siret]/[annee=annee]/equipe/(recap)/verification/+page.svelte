<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import VerifLine from "$lib/components/verif-line.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	import RecapDirigeant from "../recap-dirigeant.svelte";
	import RecapPermanents from "../recap-permanents.svelte";
	import RecapSaisonniers from "../recap-saisonniers.svelte";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const p = data.progressionEquipe;
		if (
			data.persona !== "producteur" ||
			p.globale !== "préremplissage comptable à valider"
		) {
			console.error("état incorrect", data.persona, data.progressionEquipe);
		} else {
			// On passe le statut global en "en cours", pour ne plus revenir à cet écran
			// Et on considère chaque étape validée par le comptable comme validée producteur

			p.globale = "en cours producteur";
			p.permanents =
				p.permanents?.startsWith("validé") ? "validé producteur" : null;
			p.saisonniers =
				p.saisonniers?.startsWith("validé") ? "validé producteur" : null;
			p.dirigeants = p.dirigeants.map((d) => ({
				id: d.id,
				statut: d.statut?.startsWith("validé") ? "validé producteur" : null,
			}));
			data.declaration.donnees = await submitDeclarationUpdate(
				data.declaration,
			);
		}
		goto("./recapitulatif");
	};
</script>

<div class="bandeau-titre">
	<h1 class="fr-h2">Équipe et direction</h1>
</div>

<p>
	Veuillez parcourir et vérifier attentivement toutes les données saisies par
	votre comptable, en corrigeant celles qui seraient erronées. Une fois toutes
	les informations vérifiées, vous pourrez les valider et passer à l’étape
	suivante.
</p>

<h2 class="fr-h6 fr-mt-10v">Dirigeants et associés</h2>

<div data-fr-group="true" class="fr-accordions-group">
	{#each data.declaration.donnees.equipe.dirigeants as dir, index (dir.id)}
		<VerifLine
			label={dir.prenomNom ?? `Dirigeant ou associé n° ${index + 1}`}
			onEdit={async () => {
				goto(`./details/dirigeants/${dir.id}/1`);
			}}
		>
			<RecapDirigeant dirigeant={dir}></RecapDirigeant>
		</VerifLine>
	{/each}
</div>

<h2 class="fr-h6 fr-mt-10v">Main d’œuvre</h2>

<div data-fr-group="true" class="fr-accordions-group">
	<VerifLine
		label="Employés permanents"
		onEdit={async () => {
			goto(`./details/permanents`);
		}}
	>
		<RecapPermanents permanents={data.declaration.donnees.equipe.permanents}
		></RecapPermanents>
	</VerifLine>

	<VerifLine
		label="Employés saisonniers"
		onEdit={async () => {
			goto(`./details/saisonniers`);
		}}
	>
		<RecapSaisonniers saisonniers={data.declaration.donnees.equipe.saisonniers}
		></RecapSaisonniers>
	</VerifLine>
</div>

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
