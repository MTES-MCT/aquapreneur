<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import {
		DESTINATIONS_NAISSAIN,
		ORIGINES_NAISSAIN_ECLOSERIE_NURSERIE,
	} from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { PositiveNumber } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { naissainEcloserieNurserie: { destination: {} } });

	const destinationsActives = DESTINATIONS_NAISSAIN.filter(
		(d) =>
			data.donneesEspece.naissainEcloserieNurserie!.destination![d.id] != null,
	);
	const destinationsActivesIds = destinationsActives.map((d) => d.id);

	const schema = z.object({
		destination: z.record(
			z.enum(destinationsActivesIds),
			z.object({
				ecloserieNurserieDiploide: z.object({
					valeurHT: PositiveNumber,
					// TODO: gérer les moules
					quantiteMilliers: PositiveNumber,
				}),
				ecloserieNurserieTriploide: z.object({
					valeurHT: PositiveNumber,
					quantiteMilliers: PositiveNumber,
				}),
			}),
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "../../recapitulatif",

			updateProgress: (statut) => {
				if (
					shouldUpdateStatus(
						data.progressionVentesEspece.naissainEcloserieNurserie,
					)
				) {
					data.progressionVentesEspece.naissainEcloserieNurserie = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(
					data.donneesEspece.naissainEcloserieNurserie!.destination,
					form.data.destination,
				);
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	const dest = data.donneesEspece.naissainEcloserieNurserie!.destination!;
	$form = {
		// @ts-expect-error typage à revoir
		destination: Object.fromEntries(
			destinationsActives.map((d) => [
				d.id,
				{
					// TODO: gérer le cas des moules
					ecloserieNurserieDiploide: {
						valeurHT: dest[d.id]?.ecloserieNurserieDiploide?.valeurHT,
						quantiteMilliers:
							dest[d.id]?.ecloserieNurserieDiploide?.quantiteMilliers,
					},

					ecloserieNurserieTriploide: {
						valeurHT: dest[d.id]?.ecloserieNurserieTriploide?.valeurHT,
						quantiteMilliers:
							dest[d.id]?.ecloserieNurserieTriploide?.quantiteMilliers,
					},
				},
			]),
		),
	};
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				À combien s’élèvent les ventes de chaque ploïdie ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Indiquez le montant des ventes pour chaque stade d’élevage.
			</p>
		{/snippet}

		{#snippet inputs()}
			<div class="fr-table fr-table--lg" style="width: 100%">
				<div class="fr-table__wrapper">
					<div class="fr-table__container">
						<div class="fr-table__content">
							<table class="fr-cell--multiline">
								<thead>
									<tr>
										<th>Destination</th>
										<th>
											Montant des ventes <span class="fr-text--regular">
												(€ HT)
											</span>
										</th>
										<th>
											Quantité <span class="fr-text--regular">(milliers)</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{#if $form.destination.france}
										<tr>
											<td
												colspan="3"
												class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
											>
												En France
											</td>
										</tr>
										{#each ORIGINES_NAISSAIN_ECLOSERIE_NURSERIE as ori (ori.id)}
											<tr>
												<td>{ori.label}</td>
												<td>
													<InputGroup
														type="number"
														bind:value={
															$form.destination.france[ori.id].valeurHT
														}
														errors={$errors?.destination?.france?.[ori.id]
															?.valeurHT}
													/>
												</td>
												<td>
													<!-- TODO: gérer les moules -->
													<InputGroup
														type="number"
														bind:value={
															$form.destination.france[ori.id].quantiteMilliers
														}
														errors={$errors?.destination?.france?.[ori.id]
															?.quantiteMilliers}
													/>
												</td>
											</tr>
										{/each}
									{/if}
									{#if $form.destination.etranger}
										<tr>
											<td
												colspan="3"
												class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
											>
												À l’étranger
											</td>
										</tr>

										{#each ORIGINES_NAISSAIN_ECLOSERIE_NURSERIE as ori (ori.id)}
											<tr>
												<td>{ori.label}</td>
												<td>
													<InputGroup
														type="number"
														bind:value={
															$form.destination.etranger[ori.id].valeurHT
														}
														errors={$errors?.destination?.etranger?.[ori.id]
															?.valeurHT}
													/>
												</td>
												<td>
													<!-- TODO: gérer les moules -->
													<InputGroup
														type="number"
														bind:value={
															$form.destination.etranger[ori.id]
																.quantiteMilliers
														}
														errors={$errors?.destination?.etranger?.[ori.id]
															?.quantiteMilliers}
													/>
												</td>
											</tr>
										{/each}
									{/if}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		{/snippet}
	</Fieldset>

	<NavigationLinks
		prevHref="./1"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug {form} {errors} data={data.donneesEspece.naissainEcloserieNurserie}
></FormDebug>
