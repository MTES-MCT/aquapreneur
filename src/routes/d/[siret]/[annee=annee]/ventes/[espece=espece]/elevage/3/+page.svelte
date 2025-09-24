<script lang="ts">
	import isEmpty from "lodash/isEmpty";
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { DESTINATIONS_ELEVAGE, STADES_ELEVAGE } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { PositiveNumber } from "$lib/types";

	const { data } = $props();

	const stadesActifs = STADES_ELEVAGE.filter(
		(d) => !isEmpty(data.donneesEspece[d.id]?.destination),
	);
	const stadesActifsIds = stadesActifs.map((s) => s.id);

	const destActives = DESTINATIONS_ELEVAGE.filter((d) => {
		return stadesActifs.some(
			(s) => !isEmpty(data.donneesEspece[s.id]?.destination?.[d.id]),
		);
	});
	const destActivesIds = destActives.map((d) => d.id);

	const schema = z.object({
		data: z.record(
			z.enum(stadesActifsIds),
			z.object({
				destination: z.record(
					z.enum(destActivesIds),
					z.object({
						valeurHT: PositiveNumber,
						quantite: PositiveNumber,
					}),
				),
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
				if (shouldUpdateStatus(data.progressionVentesEspece.elevage)) {
					data.progressionVentesEspece.elevage = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.donneesEspece, form.data.data);
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	$form = {
		// @ts-expect-error typage à revoir
		data: Object.fromEntries(
			stadesActifsIds.map((s) => [
				s,
				{
					destination: Object.fromEntries(
						destActivesIds.map((d) => [
							d,
							{
								valeurHT:
									data.donneesEspece[s]?.destination?.[d]?.valeurHT ?? null,
								quantite:
									data.donneesEspece[s]?.destination?.[d]?.quantite ?? null,
							},
						]),
					),
				},
			]),
		),
	};
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Comment se répartissent les ventes par stade d’élevage ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Indiquez le montant des ventes et la quantité pour chaque stade
				d’élevage.
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
										<th>Stade d’élevage</th>
										<th>
											Montant des ventes <span class="fr-text--regular">
												(€ HT)
											</span>
										</th>
										<th>
											Quantité <span class="fr-text--regular">(kg)</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{#if destActivesIds.includes("france")}
										<tr>
											<td
												colspan="3"
												class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
											>
												En France
											</td>
										</tr>
										{#each stadesActifs as stade (stade.id)}
											<tr>
												<td>{stade.label}</td>
												<td>
													<InputGroup
														type="number"
														bind:value={
															$form.data[stade.id].destination.france.valeurHT
														}
														errors={$errors?.data?.[stade.id]?.destination
															?.france?.valeurHT}
													/>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={
															$form.data[stade.id].destination.france.quantite
														}
														errors={$errors?.data?.[stade.id]?.destination
															?.france?.quantite}
													/>
												</td>
											</tr>
										{/each}
									{/if}
									{#if destActivesIds.includes("etranger")}
										<tr>
											<td
												colspan="3"
												class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
											>
												À l’étranger
											</td>
										</tr>
										{#each stadesActifs as stade (stade.id)}
											<tr>
												<td>{stade.label}</td>
												<td>
													<InputGroup
														type="number"
														bind:value={
															$form.data[stade.id].destination.etranger.valeurHT
														}
														errors={$errors?.data?.[stade.id]?.destination
															?.etranger?.valeurHT}
													/>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={
															$form.data[stade.id].destination.etranger.quantite
														}
														errors={$errors?.data?.[stade.id]?.destination
															?.etranger?.quantite}
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
		prevHref="./2"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug
	{form}
	{errors}
	data={{
		pregrossissement: data.donneesEspece.pregrossissement,
		demiElevage: data.donneesEspece.demiElevage,
		elevageAdulte: data.donneesEspece.elevageAdulte,
	}}
></FormDebug>
