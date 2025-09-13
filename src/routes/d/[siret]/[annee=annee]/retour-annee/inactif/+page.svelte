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
		raisonsInactivite: z
			.string()
			.nullable()
			.default(data.retourAnnee.raisonsInactivite),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			isLastStep: () => false,
			getNextPage: () => "./recapitulatif",
			updateProgress: () => {
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

<h1 class="fr-h3">
	Pourquoi n’avez-vous pas réalisé de ventes en {data.annee} ?
</h1>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}{/snippet}

		{#snippet inputs()}
			<TextareaGroup
				name="details"
				rows={4}
				bind:value={$form.raisonsInactivite}
				errors={$errors?.raisonsInactivite}
			>
				{#snippet label()}Indiquez les raisons dans le champs ci-dessous :
				{/snippet}
			</TextareaGroup>{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton />
</form>

<FormDebug {form} {errors} data={data.retourAnnee}></FormDebug>
