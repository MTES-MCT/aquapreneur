<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Bool } from "$lib/types";
	import { nomEspece } from "$lib/utils";

	const { data } = $props();

	const schema = z.object({
		aVenduConso: Bool.default(!!data.donneesEspece.consommation),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: (form) => !form.data.aVenduConso,
			getNextPage: () =>
				data.donneesEspece.consommation ? "./conso/1" : "../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.consommation)) {
					data.progressionVentesEspece.consommation = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				if (form.data.aVenduConso) {
					merge(data.donneesEspece, {
						consommation: {},
					});
				} else {
					delete data.donneesEspece.consommation;
				}
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.aVenduConso}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Avez-vous réalisé des ventes à la consommation ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Il s’agit des ventes {nomEspece(data.espece, {
					avecArticleUndefini: true,
					plural: true,
				})} prêtes à être consommées, sans étape d’élevage supplémentaire.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			<RadioGroup inline>
				{#snippet input(id)}
					<input
						{id}
						type="radio"
						aria-describedby="radio-{id}-messages"
						value={true}
						bind:group={$form.aVenduConso}
						autocomplete="off"
					/>
				{/snippet}
				{#snippet label()}Oui{/snippet}
			</RadioGroup>
			<RadioGroup inline>
				{#snippet input(id)}
					<input
						{id}
						type="radio"
						aria-describedby="radio-{id}-messages"
						value={false}
						bind:group={$form.aVenduConso}
						autocomplete="off"
					/>
				{/snippet}
				{#snippet label()}Non{/snippet}
			</RadioGroup>

			{#if $errors?.aVenduConso}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.aVenduConso}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton cantAnswerBtn={data.persona === "comptable"} />
</form>

<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
