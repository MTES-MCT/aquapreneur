<script lang="ts">
	import { COUNTRIES, DIPLOMES, REGIMES_SOCIAUX } from "$lib/constants";
	import type { DonneesDeclaration } from "$lib/schemas/donnees-declaration-schema";

	const {
		dirigeant,
	}: {
		dirigeant: DonneesDeclaration["equipe"]["dirigeants"][number];
	} = $props();
</script>

<h4 class="fr-text--sm fr-text--bold">Identité</h4>
<div style="display: flex; width: 100%; justify-content: stretch;">
	<div class="fr-mr-2w" style="flex-grow: 1; max-width: 15rem;">
		Prénom et nom
		<br />
		Année de naissance
		<br />
		Nationalité
		<br />
		Sexe
	</div>
	<div style="flex-grow: 1">
		{dirigeant.prenomNom}
		<br />
		{dirigeant.anneeNaissance}
		<br />
		{COUNTRIES.find((c) => c.iso_alpha2 === dirigeant.nationalite)?.label || ""}
		<br />
		{dirigeant.sexe === "M" ? "Masculin"
		: dirigeant.sexe === "F" ? "Féminin"
		: ""}
	</div>
</div>
<h4 class="fr-text--sm fr-text--bold fr-mt-3w">Statut et qualifications</h4>
<div style="display: flex; width: 100%; justify-content: stretch;">
	<div class="fr-mr-2w" style="flex-grow: 1; max-width: 15rem;">
		Statut
		<br />
		Temps de travail
		<br />
		Diplôme le plus élevé obtenu
		<br />
		Régime social
	</div>
	<div style="flex-grow: 1">
		{dirigeant.statut === "salarie" ? "Salarié"
		: dirigeant.statut === "nonSalarie" ? "Non salarié"
		: ""}
		<br />
		{dirigeant.tempsTravail} %
		<br />
		{DIPLOMES.find((d) => d.id === dirigeant.diplome)?.label || ""}
		<br />
		{REGIMES_SOCIAUX.find((r) => r.id === dirigeant.regimeSocial)?.label || ""}
	</div>
</div>
