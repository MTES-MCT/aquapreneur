<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { ALEAS, ALEAS_IDS } from "$lib/constants";
	import { prepareForm } from "$lib/form-utils";

	const { data } = $props();

	const schema = z.object({
		aleas: z.enum(ALEAS_IDS).array().default(data.retourAnnee.aleas),
		aleasDetails: z.string().nullable().default(data.retourAnnee.aleasDetails),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "./2",
			updateProgress: (statut) => {
				data.progressionRetourAnnee.imprevus = statut;
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.retourAnnee, form.data);
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<div class="fr-stepper">
	<h1 class="fr-stepper__title">
		La production a-t-elle été perturbée par des imprévus ?
		<span class="fr-stepper__state">Question 1 sur 3</span>
	</h1>
	<div
		class="fr-stepper__steps"
		data-fr-current-step="1"
		data-fr-steps="3"
	></div>
	<p class="fr-stepper__details">
		<span class="fr-text--bold">Étape suivante :</span>
		Avez-vous rencontré d’autres défis ou difficultés cette année ?
	</p>
</div>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.aleas?._errors}>
		{#snippet legend()}
			Vous pouvez sélectionner une ou plusieurs réponses.
		{/snippet}

		{#snippet inputs(id)}
			{#each ALEAS as alea (alea.id)}
				{@const aleaId = alea.id}
				<CheckboxGroup>
					{#snippet input(id)}
						<input
							type="checkbox"
							aria-describedby="checkbox-{id}-messages"
							{id}
							value={aleaId}
							bind:group={$form.aleas}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}{alea.label}{/snippet}
				</CheckboxGroup>
			{/each}
			{#if $errors?.aleas?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.aleas._errors}
					</p>
				</div>
			{/if}
			<div class="fr-mb-4w"></div>
			{#if $form.aleas.length}
				<TextareaGroup
					name="details"
					rows={3}
					bind:value={$form.aleasDetails}
					errors={$errors?.aleasDetails}
				>
					{#snippet label()}Détails supplémentaires (facultatif) :{/snippet}
				</TextareaGroup>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton />
</form>

<FormDebug {form} {errors} data={data.retourAnnee}></FormDebug>
