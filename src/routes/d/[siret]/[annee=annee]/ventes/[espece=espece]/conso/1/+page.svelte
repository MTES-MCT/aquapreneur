<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import {
		DESTINATIONS_VENTES_CONSO,
		DESTINATIONS_VENTES_CONSO_IDS,
	} from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { consommation: { destination: {} } });

	const schema = z.object({
		destination: z
			.literal(DESTINATIONS_VENTES_CONSO_IDS)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER)
			.default(
				DESTINATIONS_VENTES_CONSO_IDS.filter(
					(d) => data.donneesEspece.consommation!.destination![d] != null,
				),
			),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () =>
				data.donneesEspece.consommation?.destination?.france != null ?
					"./2"
				:	"./3",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.consommation)) {
					data.progressionVentesEspece.consommation = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				DESTINATIONS_VENTES_CONSO_IDS.forEach((d) => {
					if (form.data.destination.includes(d)) {
						merge(data.donneesEspece.consommation!.destination, { [d]: {} });
					} else {
						delete data.donneesEspece.consommation!.destination![d];
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
				Où ont été vendues les {data.espece.label} destinées à la consommation ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each DESTINATIONS_VENTES_CONSO as destination (destination.id)}
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
		prevHref="../conso"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
