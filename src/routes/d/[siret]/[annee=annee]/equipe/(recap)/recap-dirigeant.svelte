<script lang="ts">
	import { COUNTRIES, DIPLOMES, REGIMES_SOCIAUX } from "$lib/constants";
	import type { DonneesDeclaration } from "$lib/schemas/donnees-declaration-schema";

	const {
		dirigeant,
	}: {
		dirigeant: DonneesDeclaration["equipe"]["dirigeants"][number];
	} = $props();
</script>

{#if dirigeant.prenomNom || dirigeant.anneeNaissance || dirigeant.sexe}
	<h4 class="fr-text--sm fr-text--bold">Identité</h4>
	<div style="display: flex; width: 100%; justify-content: stretch;">
		<div class="fr-mr-2w" style="flex-grow: 1; max-width: 15rem;">
			{#if dirigeant.prenomNom}
				Prénom et nom
				<br />
			{/if}
			{#if dirigeant.anneeNaissance}
				Année de naissance
				<br />
			{/if}
			{#if dirigeant.nationalite}
				Nationalité
				<br />
			{/if}
			{#if dirigeant.sexe}
				Sexe
			{/if}
		</div>
		<div style="flex-grow: 1">
			{#if dirigeant.prenomNom}
				{dirigeant.prenomNom}
				<br />
			{/if}
			{#if dirigeant.anneeNaissance}
				{dirigeant.anneeNaissance}
				<br />
			{/if}
			{#if dirigeant.nationalite}
				{COUNTRIES.find((c) => c.iso_alpha2 === dirigeant.nationalite)?.label ||
					""}
				<br />
			{/if}
			{#if dirigeant.sexe}
				{dirigeant.sexe === "M" ? "Masculin"
				: dirigeant.sexe === "F" ? "Féminin"
				: ""}
			{/if}
		</div>
	</div>
{/if}

{#if dirigeant.statut || dirigeant.tempsTravail || dirigeant.diplome || dirigeant.regimeSocial}
	<h4 class="fr-text--sm fr-text--bold fr-mt-3w">Statut et qualifications</h4>
	<div style="display: flex; width: 100%; justify-content: stretch;">
		<div class="fr-mr-2w" style="flex-grow: 1; max-width: 15rem;">
			{#if dirigeant.statut}
				Statut
				<br />
			{/if}
			{#if dirigeant.tempsTravail}
				Temps de travail
				<br />
			{/if}
			{#if dirigeant.diplome}
				Diplôme le plus élevé obtenu
				<br />
			{/if}
			{#if dirigeant.regimeSocial}
				Régime social
			{/if}
		</div>
		<div style="flex-grow: 1">
			{#if dirigeant.statut}
				{dirigeant.statut === "salarie" ? "Salarié"
				: dirigeant.statut === "nonSalarie" ? "Non salarié"
				: ""}
				<br />
			{/if}
			{#if dirigeant.tempsTravail}
				{dirigeant.tempsTravail} %
				<br />
			{/if}
			{#if dirigeant.diplome}
				{DIPLOMES.find((d) => d.id === dirigeant.diplome)?.label || ""}
				<br />
			{/if}
			{#if dirigeant.regimeSocial}
				{REGIMES_SOCIAUX.find((r) => r.id === dirigeant.regimeSocial)?.label ||
					""}
			{/if}
		</div>
	</div>
{/if}
