<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { nestedSpaForm } from "$lib/form-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const retour = data.declaration.donnees.retourAnnee;

	const schema = z.object({
		difficultes: z.string().nullable().default(retour.difficultes),
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
				goto("./3");
			}
		},
	});
</script>

<div class="fr-stepper">
	<h1 class="fr-stepper__title">
		Avez-vous rencontré d’autres défis ou difficultés cette année ?
		<span class="fr-stepper__state">Question 2 sur 3</span>
	</h1>
	<div
		class="fr-stepper__steps"
		data-fr-current-step="2"
		data-fr-steps="3"
	></div>
	<p class="fr-stepper__details">
		<span class="fr-text--bold">Étape suivante :</span>
		Avez-vous des suggestions d’amélioration pour la prochaine enquête ?
	</p>
</div>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}{/snippet}

		{#snippet inputs()}
			<TextareaGroup
				name="details"
				bind:value={$form.difficultes}
				errors={$errors?.difficultes}
				rows={4}
			>
				{#snippet label()}Si oui, merci de les décrire dans le champ ci-dessous{/snippet}
			</TextareaGroup>{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="./1" nextIsButton />
</form>

<FormDebug {form} {errors} data={data.declaration.donnees.retourAnnee}
></FormDebug>
