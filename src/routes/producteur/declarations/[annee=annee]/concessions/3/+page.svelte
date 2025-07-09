<script lang="ts">
	import { onMount } from "svelte";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Textareagroup from "$lib/components/textarea–group.svelte";
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";
	import { formatDate, submitDeclarationUpdate } from "$lib/utils.js";

	const { data } = $props();

	const groupedConcessions = new Map<
		string,
		Map<string, DeclarationSchema["concessions"]>
	>();

	data.declaration.donnees.concessions.forEach((c) => {
		const quartier = c.quartierParcelle ?? "";
		const lieu =
			`${c.libLocalite} – ${c.nomLieuDit}`
				.replace(/^ – /, "")
				.replace(/ – $/, "") ?? "";

		if (!groupedConcessions.has(quartier)) {
			groupedConcessions.set(quartier, new Map([[lieu, [c]]]));
		} else {
			const quartierConcessions = groupedConcessions.get(quartier)!;
			if (quartierConcessions.has(lieu)) {
				quartierConcessions.get(lieu)!.push(c);
			} else {
				quartierConcessions.set(lieu, [c]);
			}
		}
	});

	// Le rendu des accordéons est extrêmement long. On charge donc la page en les
	// masquant, et on les réactive de façon asynchrone, pour ne pas rester
	// bloqués sur la page précédente le temps que Svelte finisse le rendu.
	let delayed = $state(true);
	onMount(() => {
		setTimeout(() => (delayed = false), 0);
	});

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		donnees.etapes.concessionValidee = true;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("../production");
	};
</script>

<h1 class="fr-h2">Vérifions les données de vos concessions</h1>

<p>
	Voici la liste des concessions dont vous êtes titulaire, avec les informations
	correspondantes. Merci de vérifier que ces données reflètent bien les
	éventuels changements que vous avez effectués.
</p>
<p>Indiquez tout changement non pris en compte dans le champ en bas de page.</p>

<fieldset class="fr-segmented fr-segmented--no-legend fr-mb-12v">
	<legend class="fr-segmented__legend">Choix de la visualisation</legend>
	<div class="fr-segmented__elements">
		<div class="fr-segmented__element">
			<input
				value="1"
				type="radio"
				id="segmented-3227-2"
				name="segmented-3227"
				disabled
			/>
			<label class="fr-icon-list-unordered fr-label" for="segmented-3227-2">
				Carte
			</label>
		</div>
		<div class="fr-segmented__element">
			<input
				value="2"
				checked
				type="radio"
				id="segmented-3227-1"
				name="segmented-3227"
			/>
			<label class="fr-icon-road-map-line fr-label" for="segmented-3227-1">
				Liste
			</label>
		</div>
	</div>
</fieldset>

<form method="POST" onsubmit={handleSubmit}>
	{#each groupedConcessions as cg (cg[0])}
		<h2 class="fr-h6">
			<span aria-hidden="true" class="fr-mr-3v fr-icon-community-line"></span>
			{cg[0]}
		</h2>
		<div class="fr-accordions-group fr-mb-10v">
			{#each cg[1] as concesParLieu (concesParLieu[0])}
				<h3 class="fr-text--md fr-text--bold fr-mt-6v">
					{concesParLieu[0]}
				</h3>
				{#each concesParLieu[1] as conces (conces.numeroParcelle)}
					<section class="fr-accordion">
						<h4 class="fr-accordion__title">
							<button
								class="fr-accordion__btn"
								type="button"
								aria-expanded="false"
								aria-controls="accordion-{conces.numeroParcelle}"
							>
								{conces.numeroParcelle}
							</button>
						</h4>
						<div
							class:delayed
							class="fr-collapse"
							id="accordion-{conces.numeroParcelle}"
						>
							<dl class="wrapper">
								<dt>Quartier</dt>
								<dd>{conces.quartierParcelle}</dd>
								<dt>Commune</dt>
								<dd>{conces.libLocalite}</dd>
								<dt>Code INSEE</dt>
								<dd>{conces.codeLocaliteInsee}</dd>
								<dt>Lieu-dit</dt>
								<dd>{conces.nomLieuDit}</dd>
								<dt>Situation</dt>
								<dd>{conces.nomSituation}</dd>
								<dt>Type</dt>
								<dd>{conces.typeParcelle}</dd>
								<dt>Surface</dt>
								<dd>{conces.surfaceParcelle} {conces.uniteMesure}</dd>
								<dt>État</dt>
								<dd>{conces.etatParcelle}</dd>
								<dt>Famille d’exploitation</dt>
								<dd>{conces.familleExploitation}</dd>
								<dt>Nature d’exploitation</dt>
								<dd>{conces.exploitation}</dd>
								<dt>Famille espèce</dt>
								<dd>{conces.familleEspece}</dd>
								<dt>Espèce principale</dt>
								<dd>{conces.espece}</dd>
								<dt>Nature juridique</dt>
								<dd>{conces.natureJuridique}</dd>
								<dt>N° d’arrêté</dt>
								<dd>{conces.numArrete}</dd>
								<dt>Date d’arrêté</dt>
								<dd>
									{#if conces.dateArrete}
										{formatDate(conces.dateArrete)}
									{/if}
								</dd>
								<dt>Capacité de production</dt>
								<dd>Inconnu</dd>
								<dt>Intention de production</dt>
								<dd>Inconnu</dd>
							</dl>
						</div>
					</section>
				{/each}
			{/each}
		</div>
	{:else}
		<div class="fr-alert fr-alert--warning">
			<h3 class="fr-alert__title">Données manquantes</h3>
			<p>
				Nous n’avons pas trouvé de données sur les concessions de
				l’établissement
				<br />
				{data.declaration.donnees.etablissement.denomination}.
			</p>
		</div>
	{/each}

	<Fieldset>
		{#snippet inputs()}
			<Textareagroup
				name="data-errors-txt"
				rows={5}
				bind:value={donnees.commentaires.erreursConcessions}
			>
				{#snippet label()}Changement(s) à signaler
					<span class="fr-hint-text">
						Si certaines informations ne correspondent pas à vos concessions
						actuelles, merci de les préciser ci-dessous.
					</span>
				{/snippet}
			</Textareagroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="2" nextIsButton />
</form>

<style>
	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	dt {
		font-weight: bold;
	}

	dd {
		padding: 0;
	}

	.delayed {
		display: none;
	}
</style>
