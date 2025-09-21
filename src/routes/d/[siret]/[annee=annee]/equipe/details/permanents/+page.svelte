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

	const { data } = $props();

	const schema = z.object({
		aPermanents: z.boolean().default(!!data.equipe.permanents),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: (form) => !form.data.aPermanents,
			getNextPage: () =>
				data.declaration.donnees.equipe.permanents ?
					"./permanents/1"
				:	"../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionEquipe.permanents)) {
					data.progressionEquipe.permanents = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				if (form.data.aPermanents) {
					merge(data.equipe, {
						permanents: {},
					});
				} else {
					delete data.equipe.permanents;
				}
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<div>
	<p class="fr-text--xl">
		L’entreprise dispose-t-elle d’une main d’oeuvre permanente ?
	</p>

	<p>
		Tout personnel présent au 31 décembre {data.annee - 1}, quel que soit le
		temps de travail. Attention : exclure CDD, intérimaires et stagiaires, et
		dirigeants et associés.
	</p>
	<form method="POST" use:enhance>
		<Fieldset hasError={!!$errors?.aPermanents}>
			{#snippet inputs(id)}
				<RadioGroup inline>
					{#snippet input(id)}
						<input
							{id}
							type="radio"
							aria-describedby="radio-{id}-messages"
							value={true}
							bind:group={$form.aPermanents}
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
							bind:group={$form.aPermanents}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}Non{/snippet}
				</RadioGroup>

				{#if $errors?.aPermanents}
					<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
						<p class="fr-message fr-message--error" id="{id}-errors">
							{$errors.aPermanents}
						</p>
					</div>
				{/if}
			{/snippet}
		</Fieldset>

		<NavigationLinks
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>

<FormDebug {form} {errors} data={data.equipe.permanents}></FormDebug>
