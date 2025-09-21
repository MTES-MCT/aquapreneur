<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { prepareForm } from "$lib/form-utils";

	const { data } = $props();

	const schema = z.object({
		suggestions: z.string().nullable().default(data.retourAnnee.suggestions),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "./recapitulatif",
			updateProgress: (statut) => {
				data.progressionRetourAnnee.suggestions = statut;
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
		Avez-vous des suggestions d’amélioration pour la prochaine enquête ?
		<span class="fr-stepper__state">Question 3 sur 3</span>
	</h1>
	<div
		class="fr-stepper__steps"
		data-fr-current-step="3"
		data-fr-steps="3"
	></div>
</div>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}{/snippet}

		{#snippet inputs()}
			<TextareaGroup
				name="details"
				rows={4}
				bind:value={$form.suggestions}
				errors={$errors?.suggestions}
			>
				{#snippet label()}Si oui, merci de les décrire dans le champ ci-dessous{/snippet}
			</TextareaGroup>{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="./2" nextIsButton />
</form>

<FormDebug {form} {errors} data={data.retourAnnee}></FormDebug>
