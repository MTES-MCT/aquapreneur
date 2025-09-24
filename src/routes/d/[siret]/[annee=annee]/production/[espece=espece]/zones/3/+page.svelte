<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { QUARTIERS_IMMATRICULATION } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Percent } from "$lib/types";
	import { formatNum } from "$lib/utils";

	const { data } = $props();

	merge(data.donneesEspece, {
		zonesProduction: {},
	});

	const activeZonesIds = Object.keys(data.donneesEspece.zonesProduction ?? {});
	const activeZones = QUARTIERS_IMMATRICULATION.filter((q) =>
		activeZonesIds.includes(q.code),
	);

	const schema = z.object({
		data: z.record(
			z.enum(activeZonesIds),
			z.object({
				partStockNaissain: Percent,
				pertesNaissain: Percent,
			}),
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./4",
			validate: (form) => {
				const sum = Object.values(form.data.data)
					.map((zone) => zone.partStockNaissain ?? 0)
					.reduce((acc, val) => acc + val, 0);
				console.log(sum);
				if (sum !== 100)
					return `La somme de la colonne “Part du stock” devrait faire 100 % ; elle fait ${sum} %`;
			},
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionProdEspece.zones)) {
					data.progressionProdEspece.zones = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.donneesEspece.zonesProduction, form.data.data);
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	// TODO preremplir à 100 % si on n’a qu’une zone

	// @ts-expect-error typage à revoir
	$form.data = data.donneesEspece.zonesProduction;

	const reminder = $derived.by(() => {
		return (
			100 -
			activeZones
				.map((z) => $form.data[z.code].partStockNaissain ?? 0)
				.reduce((acc, cur) => acc + cur, 0)
		);
	});
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4">Où se situe votre naissain ?</h2>
			<p class="fr-text--sm fr-text--light">
				Au 1er juin {data.annee}, vous aviez
				<strong>
					{formatNum(
						((data.donneesEspece.naissainCaptage?.stock?.stockMilliers ?? 0) +
							(data.donneesEspece.naissainEcloserieNurserie?.stock
								?.stockMilliers ?? 0)) *
							10000,
					)}
				</strong>
				unités de naissain en stock. Veuillez indiquer la part du stock présente
				dans chaque zone, et les pertes estimées au cours de l’année. La somme des
				parts du stock doit être égale à 100 %.
			</p>
			<p class="fr-text--md" style={`${reminder !== 0 ? "color: red" : ""}`}>
				Reste :
				<span class="fr-text--bold">{reminder} %</span>
			</p>
		{/snippet}

		{#snippet inputs(id)}
			<div class="fr-table fr-table--lg" style="width: 100%">
				<div class="fr-table__wrapper">
					<div class="fr-table__container">
						<div class="fr-table__content">
							<table class="fr-cell">
								<thead>
									<tr style="cell-w:20rem">
										<th style="min-width: 15rem">Zone</th>
										<th class="fr-cell--center">
											Part du stock (%) <br />
										</th>
										<th class="fr-cell--center">Pertes estimées (%)</th>
									</tr>
								</thead>
								<tbody>
									{#each activeZones as q (q.code)}
										<tr>
											<td>{q.nom}</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.data[q.code].partStockNaissain}
													errors={$errors?.data?.[q.code]?.partStockNaissain}
												/>
											</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.data[q.code].pertesNaissain}
													errors={$errors?.data?.[q.code]?.pertesNaissain}
												/>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{#if $errors?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors._errors}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks
		prevHref="./2"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug
	{form}
	{errors}
	data={{
		zonesProduction: data.donneesEspece.zonesProduction,
		naissainCaptage: data.donneesEspece.naissainCaptage,
		naissainEcloserieNurserie: data.donneesEspece.naissainEcloserieNurserie,
	}}
></FormDebug>
