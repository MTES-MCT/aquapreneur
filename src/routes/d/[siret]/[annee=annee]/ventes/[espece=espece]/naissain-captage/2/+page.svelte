<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { DESTINATIONS_NAISSAIN } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { PositiveNumber } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { naissainCaptage: { destination: {} } });

	const destinationsActives = DESTINATIONS_NAISSAIN.filter(
		(d) => data.donneesEspece.naissainCaptage!.destination![d.id] != null,
	);
	const destinationsActivesIds = destinationsActives.map((d) => d.id);

	const schema = z.object({
		destination: z.record(
			z.enum(destinationsActivesIds),
			z.object({
				valeurHT: PositiveNumber,
				prixMoyenHT: PositiveNumber,
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
				if (shouldUpdateStatus(data.progressionVentesEspece.naissainCaptage)) {
					data.progressionVentesEspece.naissainCaptage = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(
					data.donneesEspece.naissainCaptage!.destination,
					form.data.destination,
				);
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	$form = {
		// @ts-expect-error typage à revoir
		destination: Object.fromEntries(
			destinationsActives.map((d) => [
				d.id,
				{
					valeurHT:
						data.donneesEspece.naissainCaptage?.destination?.[d.id]?.valeurHT,
					prixMoyenHT:
						data.donneesEspece.naissainCaptage?.destination?.[d.id]
							?.prixMoyenHT,
				},
			]),
		),
	};
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">À combien s’élèvent les ventes ?</h2>
			<p class="fr-text--light fr-text--sm">
				Indiquez le montant des ventes pour chaque destination.
			</p>
		{/snippet}
		{#snippet inputs()}
			<div class="fr-table fr-table--lg">
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
											Prix moyen au milier <span class="fr-text--regular">
												(€ HT)
											</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{#each destinationsActives as dest (dest.id)}
										<tr>
											<td>{dest.label}</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.destination[dest.id].valeurHT}
													errors={$errors?.destination?.[dest.id]?.valeurHT}
												/>
											</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.destination[dest.id].prixMoyenHT}
													errors={$errors?.destination?.[dest.id]?.prixMoyenHT}
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

<FormDebug {form} {errors} data={data.donneesEspece.naissainCaptage}
></FormDebug>
