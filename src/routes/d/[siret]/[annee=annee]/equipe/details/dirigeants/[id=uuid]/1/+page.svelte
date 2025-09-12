<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group2.svelte";
	import { prepareForm } from "$lib/form-utils";
	import { Bool } from "$lib/types";

	const { data } = $props();

	const schema = z.object({
		nouveauDirigeant: Bool.default(
			data.dirigeant.nouveauDirigeant ?? (null as unknown as boolean),
		),
	});

	const { form, errors, enhance } = prepareForm(
		schema,
		() => false,
		() => "./2",

		(statut) => {
			data.progressionDirigeant.statut = statut;
			return data.declaration;
		},

		(form) => {
			merge(data.dirigeant, form.data);
			return data.declaration;
		},

		defaults(zod4(schema)),
	);
</script>

<div>
	<p class="fr-text--xl">
		Cette personne dirigeante ou associée a-t-elle rejoint l’entreprise en
		{data.annee} ?
	</p>
	<form method="POST" use:enhance>
		<Fieldset hasError={!!$errors?.nouveauDirigeant}>
			{#snippet inputs(id)}
				<RadioGroup inline>
					{#snippet input(id)}
						<input
							{id}
							type="radio"
							aria-describedby="radio-{id}-messages"
							value={true}
							bind:group={$form.nouveauDirigeant}
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
							bind:group={$form.nouveauDirigeant}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}Non{/snippet}
				</RadioGroup>

				{#if $errors?.nouveauDirigeant}
					<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
						<p class="fr-message fr-message--error" id="{id}-errors">
							{$errors.nouveauDirigeant}
						</p>
					</div>
				{/if}
			{/snippet}
		</Fieldset>

		<NavigationLinks nextIsButton cantAnswerBtn />
	</form>
</div>

<FormDebug
	{form}
	{errors}
	data={data.dirigeant}
	progression={data.progressionDirigeant}
></FormDebug>
