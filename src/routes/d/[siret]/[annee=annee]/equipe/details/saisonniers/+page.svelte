<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group2.svelte";
	import { prepareForm } from "$lib/form-utils.js";
	import { Bool } from "$lib/types";

	const { data } = $props();

	const equipe = data.declaration.donnees.equipe;

	const schema = z.object({
		aSaisonniers: Bool.default(
			equipe.saisonniers ? true : (null as unknown as boolean),
		),
	});

	const { form, errors, enhance } = prepareForm(
		schema,
		data.declaration,
		() =>
			data.declaration.donnees.equipe.saisonniers ?
				"./saisonniers/1"
			:	"../recapitulatif",
		(form) => {
			if (form.data.aSaisonniers) {
				merge(equipe, {
					saisonniers: {},
				});
			} else {
				delete equipe.saisonniers;
			}
			return data.declaration;
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

		<NavigationLinks nextIsButton cantAnswerBtn />
	</form>
</div>

<FormDebug {form} {errors} data={data.declaration.donnees.equipe}></FormDebug>
