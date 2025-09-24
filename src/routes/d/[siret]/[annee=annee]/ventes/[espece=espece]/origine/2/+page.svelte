<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ORIGINES, ORIGINES_IDS } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Percent } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { consommation: { origine: {} } });

	const origine = data.donneesEspece.consommation!.origine;

	const schema = z.object({
		data: z.record(
			z.enum(ORIGINES_IDS),
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
			getNextPage: () => "./3",
			validate: (form) => {
				const sum = Object.values(form.data.data)
					.map((origine) => origine.part ?? 0)
					.reduce((acc, val) => acc + val, 0);
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
				merge(data.donneesEspece.consommation!.origine, form.data.data);
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	// @ts-expect-error typage à revoir
	$form.data = Object.fromEntries(
		ORIGINES_IDS.map((id) => [
			id,
			{
				part: origine?.[id]?.part,
			},
		]),
	);

	const reminder = $derived.by(() => {
		return (
			100 -
			ORIGINES_IDS.map((m) => $form.data[m].part ?? 0).reduce(
				(acc, cur) => acc + cur,
				0,
			)
		);
	});
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4">
				Comment se répartissent les ventes selon l’origine ?
			</h2>

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
							<table class="fr-cell--multiline">
								<thead>
									<tr>
										<th>Origine et ploïdie</th>
										<th>
											Pourcentage <span class="fr-text--regular">(%)</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{#each ORIGINES as origine (origine.id)}
										<tr>
											<td>{origine.label}</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.data[origine.id].part}
													errors={$errors?.data?.[origine.id]?.part}
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
		prevHref="./1"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug
	form={$form.data}
	{errors}
	data={data.donneesEspece.consommation?.origine}
></FormDebug>
