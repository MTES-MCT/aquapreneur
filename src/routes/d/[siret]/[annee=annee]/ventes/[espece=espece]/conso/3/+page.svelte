<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { DESTINATIONS_VENTES_CONSO_FRANCE } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { PositiveNumber, optObject } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, {
		consommation: {
			destination: {},
		},
	});

	const dest = data.donneesEspece.consommation!.destination!;
	const destFrActifs = DESTINATIONS_VENTES_CONSO_FRANCE.filter(
		(d) => dest.france?.[d.id] != null,
	);
	const destFrActifsIds = destFrActifs.map((d) => d.id);

	const schema = z.object({
		france: z.record(
			z.enum(destFrActifsIds),
			z.object({
				valeurHT: PositiveNumber,
				quantiteKg: PositiveNumber,
			}),
		),
		unionEuropeenne: optObject({
			valeurHT: PositiveNumber,
			quantiteKg: PositiveNumber,
		}),
		horsUnionEuropeenne: optObject({
			valeurHT: PositiveNumber,
			quantiteKg: PositiveNumber,
		}),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "../../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.consommation)) {
					data.progressionVentesEspece.consommation = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(dest.france, form.data.france);
				merge(dest.unionEuropeenne, form.data.unionEuropeenne);
				merge(dest.horsUnionEuropeenne, form.data.horsUnionEuropeenne);
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	let prevHref = $derived(dest.france ? "./2" : "./1");

	if (dest.france != null) {
		// @ts-expect-error type à affiner
		$form.france = Object.fromEntries(
			destFrActifsIds.map((d) => [
				d,
				{
					valeurHT: dest.france![d]?.valeurHT,
					quantiteKg: dest.france![d]?.quantiteKg,
				},
			]),
		);
	}
	if (dest.unionEuropeenne != null) {
		$form.unionEuropeenne = {
			// On veut accepter les valeurs nulles / indéfinies dans les valeurs par défaut
			// du formulaire, mais pas dans le schéma, pour que la validation les refuse lors
			// de la soumission
			valeurHT: dest.unionEuropeenne.valeurHT as unknown as number,
			quantiteKg: dest.unionEuropeenne.quantiteKg as unknown as number,
		};
	}
	if (dest.horsUnionEuropeenne != null) {
		$form.horsUnionEuropeenne = {
			valeurHT: dest.horsUnionEuropeenne.valeurHT as unknown as number,
			quantiteKg: dest.horsUnionEuropeenne.quantiteKg as unknown as number,
		};
	}
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Comment le chiffre d’affaires est-il réparti ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Renseignez le montant des ventes pour chaque destination, ainsi que la
				quantité lorsqu’elle est connue.
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
											Quantité <span class="fr-text--regular">(kg)</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{#if dest.france}
										<tr>
											<td
												colspan="3"
												class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
											>
												En France
											</td>
										</tr>
										{#each destFrActifs as destination (destination.id)}
											{#if dest.france?.[destination.id]}
												<tr>
													<td>{destination.label}</td>
													<td>
														<InputGroup
															type="number"
															bind:value={
																$form.france![destination.id]!.valeurHT
															}
															errors={$errors?.france?.[destination.id]
																?.valeurHT}
														/>
													</td>
													<td>
														<InputGroup
															type="number"
															bind:value={
																$form.france![destination.id]!.quantiteKg
															}
															errors={$errors?.france?.[destination.id]
																?.quantiteKg}
														/>
													</td>
												</tr>
											{/if}
										{/each}
									{/if}
									{#if dest.unionEuropeenne || dest.horsUnionEuropeenne}
										<tr>
											<td
												colspan="3"
												class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
											>
												À l’étranger
											</td>
										</tr>
										{#if dest.unionEuropeenne}
											<tr>
												<td>Au sein de l’Union Européenne</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.unionEuropeenne!.valeurHT}
														errors={$errors?.unionEuropeenne?.valeurHT}
													/>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.unionEuropeenne!.quantiteKg}
														errors={$errors?.unionEuropeenne?.quantiteKg}
													/>
												</td>
											</tr>
										{/if}
										{#if dest.horsUnionEuropeenne}
											<tr>
												<td>Hors de l’Union Européenne</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.horsUnionEuropeenne!.valeurHT}
														errors={$errors?.horsUnionEuropeenne?.valeurHT}
													/>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.horsUnionEuropeenne!.quantiteKg}
														errors={$errors?.horsUnionEuropeenne?.quantiteKg}
													/>
												</td>
											</tr>
										{/if}
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
		{prevHref}
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
