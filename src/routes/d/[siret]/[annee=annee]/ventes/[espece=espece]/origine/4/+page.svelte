<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ORIGINES_NAISSAIN } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Percent, PositiveNumber } from "$lib/types";

	const { data } = $props();

	const origine = data.donneesEspece.consommation?.origine;

	const schema = z.object({
		captage: z.object({
			part: Percent.default(origine?.captage?.part ?? 0),
			value: PositiveNumber.default(origine?.captage?.value ?? 0),
		}),
		ecloserieNurserieDiploide: z.object({
			part: Percent.default(origine?.ecloserieNurserieDiploide?.part ?? 0),
			value: PositiveNumber.default(
				origine?.ecloserieNurserieDiploide?.value ?? 0,
			),
		}),
		ecloserieNurserieTriploide: z.object({
			part: Percent.default(origine?.ecloserieNurserieTriploide?.part ?? 0),
			value: PositiveNumber.default(
				origine?.ecloserieNurserieTriploide?.value ?? 0,
			),
		}),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "../../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.origine)) {
					data.progressionVentesEspece.origine = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.declaration.donnees.especes, {
					[data.espece.id]: { consommation: { origine: form.data } },
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4">
				Comment se répartissent les ventes selon l’origine ?
			</h2>
			<!-- <p class="fr-text--light fr-text--sm">
					Vous pouvez répondre en indiquant un montant ou un pourcentage sur les quantités vendues.
				</p> -->
		{/snippet}

		{#snippet inputs()}
			<div class="fr-table fr-table--lg">
				<div class="fr-table__wrapper">
					<div class="fr-table__container">
						<div class="fr-table__content">
							<table class="fr-cell--multiline">
								<thead>
									<tr>
										<th>Origine et ploïdie</th>
										<th>
											Pourcentage <span class="fr-text--regular">(%)</span>
										</th>
										<th>
											Montant des ventes <span class="fr-text--regular">
												(€ HT)
											</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{#each ORIGINES_NAISSAIN as origine (origine.id)}
										<tr>
											<td>{origine.label}</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form[origine.id].part}
													errors={$errors[origine.id]?.part}
												></InputGroup>
											</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form[origine.id].value}
													errors={$errors[origine.id]?.value}
												></InputGroup>
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

<FormDebug {form} {errors} data={data.donneesEspece.consommation?.origine}
></FormDebug>
