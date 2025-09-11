<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group2.svelte";
	import { nestedSpaForm } from "$lib/form-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const schema = z.object({
		// Voir https://superforms.rocks/default-values#changing-a-default-value
		// on veut une valeur initiale nulle, sans pour autant rendre le champ
		// nullable
		nouveauDirigeant: z
			.boolean()
			.default(data.dirigeant.nouveauDirigeant ?? (null as unknown as boolean)),
	});

	const { form, errors, enhance } = nestedSpaForm(defaults(zod4(schema)), {
		validators: zod4(schema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					merge(data.dirigeant, { ...form.data });

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

<FormDebug {form} {errors} data={data.declaration.donnees.equipe}></FormDebug>
