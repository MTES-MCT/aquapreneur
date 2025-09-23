<script lang="ts">
	import isEmpty from "lodash/isEmpty";
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { STADES_ELEVAGE, STADES_ELEVAGE_IDS } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";
	import { nomEspece } from "$lib/utils";

	const { data } = $props();
	// TODO preselection à partir de la production
	merge(data.donneesEspece, {
		pregrossissement: { destination: {} },
		demiElevage: { destination: {} },
		elevageAdulte: { destination: {} },
	});

	const schema = z.object({
		stades: z
			.literal(STADES_ELEVAGE_IDS)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER)
			.default(
				STADES_ELEVAGE_IDS.filter(
					(d) => !isEmpty(data.donneesEspece[d]?.destination),
				),
			),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./2",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.elevage)) {
					data.progressionVentesEspece.elevage = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				STADES_ELEVAGE_IDS.forEach((d) => {
					if (form.data.stades.includes(d)) {
						merge(data.donneesEspece, {
							[d]: {
								destination: {
									france: {},
									etranger: {},
								},
							},
						});
					} else {
						delete data.donneesEspece[d]?.destination;
					}
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.stades?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				À quel(s) stade(s) d’élevag(e) les {nomEspece(data.espece, {
					plural: true,
				})} ont été vendues ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each STADES_ELEVAGE as stade (stade.id)}
				{@const destId = stade.id}
				<CheckboxGroup>
					{#snippet input(id)}
						<input
							type="checkbox"
							aria-describedby="checkbox-{id}-messages"
							{id}
							value={destId}
							bind:group={$form.stades}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}{stade.label}{/snippet}
				</CheckboxGroup>
			{/each}
			{#if $errors?.stades?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.stades._errors}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>
	<NavigationLinks
		prevHref="../elevage"
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
