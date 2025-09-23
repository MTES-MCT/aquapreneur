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
	import { formatNum, nomEspece } from "$lib/utils";

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
				partStockDemiElevage: Percent,
				pertesDemiElevage: Percent,
			}),
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./5",
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
	// TODO refuser validation si total != 100%

	// @ts-expect-error typage à revoir
	$form.data = data.donneesEspece.zonesProduction;

	const reminder = $derived.by(() => {
		return (
			100 -
			activeZones
				.map((z) => $form.data[z.code].partStockDemiElevage ?? 0)
				.reduce((acc, cur) => acc + cur, 0)
		);
	});
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4">Où a été réalisé le demi-élevage ?</h2>
			<p class="fr-text--sm fr-text--light">
				Au 1er juin {data.annee}, vous aviez
				<strong>
					{formatNum(data.donneesEspece.demiElevage?.stock?.stockKg ?? 0)}
				</strong>
				kilos {nomEspece(data.espece, {
					avecArticleUndefini: true,
				})} au stade de demi-élevage. Veuillez indiquer la part du stock présente
				chaque zone, et les pertes estimées au cours de l’année. La somme des parts
				du stock doit être égale à 100 %.
			</p>

			<p class="fr-text--md" style={`${reminder !== 0 ? "color: red" : ""}`}>
				Reste :
				<span class="fr-text--bold">{reminder} %</span>
			</p>
		{/snippet}

		{#snippet inputs()}
			<div class="fr-table fr-table--lg">
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
													bind:value={$form.data[q.code].partStockDemiElevage}
													errors={$errors?.data?.[q.code]?.partStockDemiElevage}
												/>
											</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.data[q.code].pertesDemiElevage}
													errors={$errors?.data?.[q.code]?.pertesDemiElevage}
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
		{/snippet}
	</Fieldset>

	<NavigationLinks
		prevHref="./3"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug
	{form}
	{errors}
	data={{
		zonesProduction: data.donneesEspece.zonesProduction,
		demiElevage: data.donneesEspece.demiElevage,
	}}
></FormDebug>
