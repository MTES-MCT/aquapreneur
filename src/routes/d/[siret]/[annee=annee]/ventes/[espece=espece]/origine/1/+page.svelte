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
	import { Percent } from "$lib/types";

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
			}),
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./2",
			validate: (form) => {
				const sum = Object.values(form.data.data)
					.map((mode) => mode.part ?? 0)
					.reduce((acc, val) => acc + val, 0);
				console.log(sum);
				if (sum !== 100)
					return `La somme de la colonne “Pourcentage” devrait faire 100 % ; elle fait ${sum} %`;
			},
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.origine)) {
					data.progressionVentesEspece.origine = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
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
			},
		]),
	);

	const reminder = $derived.by(() => {
		return (
			100 -
			modesActifsIds
				.map((m) => $form.data[m].part ?? 0)
				.reduce((acc, cur) => acc + cur, 0)
		);
	});
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4">
				Comment se répartissent les ventes selon le dernier mode d’élevage
				utilisé ?
			</h2>

			<p class="fr-text--md" style={`${reminder !== 0 ? "color: red" : ""}`}>
				Reste :
				<span class="fr-text--bold">{reminder} %</span>
			</p>
		{/snippet}

		{#snippet inputs(id)}
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
		prevHref="../origine"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug form={$form.data} {errors} data={data.donneesEspece.modeElevage}
></FormDebug>
