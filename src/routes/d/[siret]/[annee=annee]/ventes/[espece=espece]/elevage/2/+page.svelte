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
	import {
		DESTINATIONS_ELEVAGE,
		DESTINATIONS_ELEVAGE_IDS,
		STADES_ELEVAGE_IDS,
	} from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";
	import { nomEspece } from "$lib/utils";

	const { data } = $props();

	const stadesActifsIds = STADES_ELEVAGE_IDS.filter(
		(d) => !isEmpty(data.donneesEspece[d]?.destination),
	);

	const schema = z.object({
		destination: z
			.literal(DESTINATIONS_ELEVAGE_IDS)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER)
			.default(
				DESTINATIONS_ELEVAGE_IDS.filter((d) =>
					stadesActifsIds.some(
						(s) => !isEmpty(data.donneesEspece[s]?.destination?.[d]),
					),
				),
			),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./3",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.elevage)) {
					data.progressionVentesEspece.elevage = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				DESTINATIONS_ELEVAGE_IDS.forEach((d) => {
					if (form.data.destination.includes(d)) {
						stadesActifsIds.forEach((s) => {
							merge(data.donneesEspece[s], {
								destination: {
									[d]: {
										valeurHT:
											data.donneesEspece[s]?.destination?.[d]?.valeurHT ?? null,
										quantite:
											data.donneesEspece[s]?.destination?.[d]?.quantite ?? null,
									},
								},
							});
						});
					} else {
						stadesActifsIds.forEach((s) => {
							delete data.donneesEspece?.[s]?.destination?.[d];
						});
					}
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.destination?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Où ont été vendues les {nomEspece(data.espece, {
					plural: true,
				})} destinées à l’élevage ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each DESTINATIONS_ELEVAGE as destination (destination.id)}
				{@const destId = destination.id}
				<CheckboxGroup>
					{#snippet input(id)}
						<input
							type="checkbox"
							aria-describedby="checkbox-{id}-messages"
							{id}
							value={destId}
							bind:group={$form.destination}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}{destination.label}{/snippet}
				</CheckboxGroup>
			{/each}
			{#if $errors?.destination?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.destination._errors}
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
	{form}
	{errors}
	data={{
		pregrossissement: data.donneesEspece.pregrossissement,
		demiElevage: data.donneesEspece.demiElevage,
		elevageAdulte: data.donneesEspece.elevageAdulte,
	}}
></FormDebug>
