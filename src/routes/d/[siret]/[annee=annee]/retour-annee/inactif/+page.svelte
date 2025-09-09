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
		raisonsInactivite: z.string().nullable().default(retour.raisonsInactivite),
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
				goto("./recapitulatif");
			}
		},
	});
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

<FormDebug {form} {errors} data={data.declaration.donnees.retourAnnee}
></FormDebug>
