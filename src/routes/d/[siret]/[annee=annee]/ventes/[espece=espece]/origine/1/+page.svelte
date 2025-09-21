<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { MODE_ELEVAGE } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Percent, PositiveNumber } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { modeElevage: {} });

	const modesActifs = MODE_ELEVAGE.filter(
		(m) => data.donneesEspece.modeElevage![m.id] != null,
	);

	const modesActifsIds = modesActifs.map((m) => m.id);

	const schema = z.object({
		data: z.record(
			z.enum(modesActifsIds),
			z.object({
				part: Percent,
				value: PositiveNumber,
			}),
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./2",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.origine)) {
					data.progressionVentesEspece.origine = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				// TODO: on parle d’ici de donnees de consommation, alors que le mode d’élevage est (peut-être?) global?
				merge(data.donneesEspece, { modeElevage: form.data.data });
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	// @ts-expect-error typage à revoir
	$form.data = Object.fromEntries(
		modesActifsIds.map((id) => [
			id,
			{
				part: data.donneesEspece.modeElevage![id]?.part,
				value: data.donneesEspece.modeElevage![id]?.value,
			},
		]),
	);
</script>

<div>
	<p class="fr-text--xl"></p>

	<form method="POST" use:enhance>
		<Fieldset>
			{#snippet legend()}
				<h2 class="fr-h4 fr-mb-1w">
					Comment se répartissent les ventes selon le dernier mode d’élevage
					utilisé ?
				</h2>
				<!-- <p class="fr-text--light fr-text--sm">
					Vous pouvez répondre en indiquant un montant ou un pourcentage sur les
					quantités vendues.
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
											<th>Mode d’élevage</th>
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
										{#each modesActifs as mode (mode.id)}
											<tr>
												<td>{mode.label}</td>

												<td>
													<InputGroup
														type="number"
														bind:value={$form.data[mode.id].part}
														errors={$errors?.data?.[mode.id]?.part}
													></InputGroup>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.data[mode.id].value}
														errors={$errors?.data?.[mode.id]?.value}
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
			prevHref="../origine"
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>

<FormDebug form={$form.data} {errors} data={data.donneesEspece.modeElevage}
></FormDebug>
