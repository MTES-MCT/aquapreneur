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
	import { nestedSpaForm } from "$lib/form-utils.js";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const equipe = data.declaration.donnees.equipe;

	const schema = z.object({
		aSaisonniers: z.boolean().default(!!equipe.saisonniers),
	});

	const { form, errors, enhance } = nestedSpaForm(defaults(zod4(schema)), {
		validators: zod4(schema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					if (form.data.aSaisonniers) {
						merge(equipe, {
							saisonniers: {},
						});
					} else {
						delete equipe.saisonniers;
					}
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
				if (data.declaration.donnees.equipe.saisonniers) {
					goto("./saisonniers/1");
				} else {
					goto("../recapitulatif");
				}
			}
		},
	});
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
