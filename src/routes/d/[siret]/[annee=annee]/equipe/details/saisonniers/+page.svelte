<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group2.svelte";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils.js";
	import { Bool } from "$lib/types";

	const { data } = $props();

	const schema = z.object({
		aSaisonniers: Bool.default(!!data.equipe.saisonniers),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: (form) => !form.data.aSaisonniers,
			getNextPage: () =>
				data.declaration.donnees.equipe.saisonniers ?
					"./saisonniers/1"
				:	"../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionEquipe.saisonniers)) {
					data.progressionEquipe.saisonniers = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				if (form.data.aSaisonniers) {
					merge(data.equipe, {
						saisonniers: {},
					});
				} else {
					delete data.equipe.saisonniers;
				}
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<div>
	<p class="fr-text--xl">
		L’entreprise a-t-elle disposé d’une main d’oeuvre saisonnière ?
	</p>

	<p>
		Tout personnel ayant travaillé pour l’entreprise sur une période limitée,
		par exemple à Noël. Sont concernés les CDD, intérimaires, stagiaires,
		personnel de groupements d’employeurs…
	</p>

	<form method="POST" use:enhance>
		<Fieldset hasError={!!$errors?.aSaisonniers}>
			{#snippet inputs(id)}
				<RadioGroup inline>
					{#snippet input(id)}
						<input
							{id}
							type="radio"
							aria-describedby="radio-{id}-messages"
							value={true}
							bind:group={$form.aSaisonniers}
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
							bind:group={$form.aSaisonniers}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}Non{/snippet}
				</RadioGroup>

				{#if $errors?.aSaisonniers}
					<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
						<p class="fr-message fr-message--error" id="{id}-errors">
							{$errors.aSaisonniers}
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

<FormDebug
	{form}
	{errors}
	data={data.equipe.saisonniers}
	progression={data.progressionEquipe}
></FormDebug>
