<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group2.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { ALEAS, ALEAS_IDS } from "$lib/constants";
	import { nestedSpaForm } from "$lib/form-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const retour = data.declaration.donnees.retourAnnee;

	const schema = z.object({
		aleas: z
			.enum(ALEAS_IDS)
			.array()
			.min(1, "Veuillez selectionner au moins une réponse")
			.default(retour.aleas),
		aleasDetails: z.string().nullable().default(retour.aleasDetails),
	});

	const { form, errors, enhance } = nestedSpaForm(defaults(zod4(schema)), {
		validators: zod4(schema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					merge(data.declaration.donnees.retourAnnee, { ...form.data });

					data.declaration.donnees = await submitDeclarationUpdate(
						data.declaration.id,
						data.declaration.donnees,
					);
				} catch (err) {
					console.error(err);
				}
			}
		},
		onUpdated({ form }) {
			if (form.valid) {
				goto("./2");
			}
		},
	});
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

<FormDebug {form} {errors} data={data.declaration.donnees.retourAnnee}
></FormDebug>
