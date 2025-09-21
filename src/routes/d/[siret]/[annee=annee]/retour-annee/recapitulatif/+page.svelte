<script lang="ts">
	import SuperDebug from "sveltekit-superforms";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import { env } from "$env/dynamic/public";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ALEAS } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const getAleasDesc = () => {
		const part1 =
			data.retourAnnee.aleas?.length ?
				`${data.retourAnnee.aleas?.map((id) => ALEAS.find((a) => a.id === id)?.label).join(", ")}. `
			:	"";
		const part2 =
			data.retourAnnee.aleasDetails ?
				`Détails : ${data.retourAnnee.aleasDetails}`
			:	"";
		return `${part1}${part2}`;
	};

	const handleSubmitVerif: FormEventHandler<HTMLFormElement> = async (
		event,
	) => {
		event.preventDefault();
		const p = data.progressionRetourAnnee;
		if (
			data.persona !== "producteur" ||
			p.globale !== "préremplissage comptable à valider"
		) {
			console.error(
				"état incorrect",
				data.persona,
				data.progressionRetourAnnee,
			);
		} else {
			// On passe le statut global en "en cours", pour ne plus revenir à cet écran
			// Et on considère chaque étape validée par le comptable comme validée producteur

			p.globale = "validé producteur";
			p.imprevus =
				p.imprevus === "validé comptable" ? "validé producteur" : null;
			p.difficultes =
				p.difficultes === "validé comptable" ? "validé producteur" : null;
			p.suggestions =
				p.suggestions === "validé comptable" ? "validé producteur" : null;
			data.declaration.donnees = await submitDeclarationUpdate(
				data.declaration,
			);
		}
		goto("../envoi");
	};

	const handleSubmitRecap: FormEventHandler<HTMLFormElement> = async (
		event,
	) => {
		event.preventDefault();
		if (data.persona === "comptable") {
			data.progressionRetourAnnee.globale = "validé comptable";
		} else {
			data.progressionRetourAnnee.globale = "validé producteur";
		}
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("../envoi");
	};

	const shouldVerify = $derived(
		data.persona === "producteur" &&
			data.progressionRetourAnnee.globale ===
				"préremplissage comptable à valider",
	);
</script>

<h1 class="fr-h2 fr-mb-5w">Retours sur l’année</h1>

{#if shouldVerify}
	<p>
		Veuillez parcourir et vérifier attentivement toutes les données saisies par
		votre comptable, en corrigeant celles qui seraient erronées. Une fois toutes
		les informations vérifiées, vous pourrez les valider et passer à l’étape
		suivante.
	</p>
{/if}

{#snippet recapLine(
	title: string,
	link: string,
	details: string | null,
	statut: "imprevus" | "difficultes" | "suggestions",
)}
	<div class="bandeau">
		<p class="fr-text--bold fr-mb-1w">
			{title}
		</p>
		<button
			onclick={async () => {
				if (statut) {
					data.progressionRetourAnnee![statut] =
						data.persona === "comptable" ?
							"en cours comptable"
						:	"en cours producteur";
				}
				await submitDeclarationUpdate(data.declaration);
				goto(link);
			}}
			style="flex-shrink: 0"
			class="fr-btn fr-btn--tertiary fr-btn--sm fr-ml-1w"
		>
			Modifier
		</button>
	</div>
	{#if details}
		<p>{details}</p>
	{:else}
		<p style="color: var(--text-disabled-grey)">Aucune réponse</p>
	{/if}
{/snippet}

<hr />

{@render recapLine(
	"La production a-t-elle été perturbée par des imprévus ?",
	"./1",
	getAleasDesc(),
	"imprevus",
)}

<hr />
{@render recapLine(
	"Avez-vous rencontré d’autres défis ou difficultés cette année ?",
	"./2",
	data.retourAnnee.difficultes,
	"difficultes",
)}

<hr />
{@render recapLine(
	"Avez-vous des suggestions d’amélioration pour la prochaine enquête ?",
	"./3",
	data.retourAnnee.suggestions,
	"suggestions",
)}

<hr />

{#if shouldVerify}
	<form method="POST" onsubmit={handleSubmitVerif}>
		<NavigationLinks nextIsButton nextLabel="Confirmer ces données" center />
	</form>
{:else}
	<form method="POST" onsubmit={handleSubmitRecap}>
		<NavigationLinks nextIsButton center />
	</form>
{/if}

{#if env.PUBLIC_DEBUG_FORM}
	<div class="fr-mt-10w">
		<SuperDebug data={data.retourAnnee} label="BDD" />
	</div>
{/if}

<style>
	.bandeau {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
