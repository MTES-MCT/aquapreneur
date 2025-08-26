<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import { ALEAS } from "$lib/constants";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const getAleasDesc = () => {
		const part1 =
			donnees.commentaires.aleas?.length ?
				`${donnees.commentaires.aleas?.map((id) => ALEAS.find((a) => a.id === id)?.label).join(", ")}. `
			:	"";
		const part2 =
			donnees.commentaires.aleasDetails ?
				`Détails : ${donnees.commentaires.aleasDetails}`
			:	"";
		return `${part1}${part2}`;
	};
</script>

{#snippet recapLine(title: string, link: string, details: string | null)}
	<div class="bandeau">
		<p class="fr-text--bold fr-mb-1w">
			{title}
		</p>
		<a
			href={link}
			style="flex-shrink: 0"
			class="fr-link fr-icon-arrow-right-line fr-link--icon-right fr-ml-1w"
		>
			Revoir
		</a>
	</div>
	{#if details}
		<p>{details}</p>
	{:else}
		<p style="color: var(--text-disabled-grey)">Aucune réponse</p>
	{/if}
{/snippet}

<h1 class="fr-h2 fr-mb-5w">Retours sur l’année</h1>

<hr />
{#if donnees.aProduit}
	{@render recapLine(
		"La production a-t-elle été perturbée par des imprévus ?",
		"./1",
		getAleasDesc(),
	)}

	<hr />
	{@render recapLine(
		"Avez-vous rencontré d’autres défis ou difficultés cette année ?",
		"./2",
		donnees.commentaires.difficultes,
	)}

	<hr />
	{@render recapLine(
		"Avez-vous des suggestions d’amélioration pour la prochaine enquête ?",
		"./3",
		donnees.commentaires.suggestions,
	)}
{:else}
	{@render recapLine(
		`Pourquoi n’avez-vous pas réalisé de ventes en ${data.annee} ?`,
		"./inactif",
		donnees.commentaires.raisonsInactivite,
	)}
{/if}
<hr />

<style>
	.bandeau {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
