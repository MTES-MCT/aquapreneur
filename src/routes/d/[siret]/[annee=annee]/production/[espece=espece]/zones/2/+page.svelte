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
	import { PositiveInt } from "$lib/types";

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
				surfaceHa: PositiveInt,
			}),
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./3",
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

	// @ts-expect-error typage à revoir
	$form.data = data.donneesEspece.zonesProduction;
</script>

<div>
	<p class="fr-text--xl"></p>
	<form method="POST" use:enhance>
		<Fieldset>
			{#snippet legend()}
				<h2 class="fr-h4">Quelle surface détenez-vous dans chaque zone ?</h2>
			{/snippet}

			{#snippet inputs()}
				<div class="fr-table fr-table--lg">
					<div class="fr-table__wrapper">
						<div class="fr-table__container">
							<div class="fr-table__content">
								<table class="fr-cell">
									<thead>
										<tr style="cell-w:20rem">
											<th style="min-width: 20rem">Zone</th>
											<th>Surface détenue (ha)</th>
										</tr>
									</thead>
									<tbody>
										{#each activeZones as q (q.code)}
											<tr>
												<td>{q.nom}</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.data[q.code].surfaceHa}
														errors={$errors?.data?.[q.code]?.surfaceHa}
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
			prevHref="./1"
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>

<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
