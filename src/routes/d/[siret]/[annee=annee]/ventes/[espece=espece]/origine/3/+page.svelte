<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Percent } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { consommation: {} });

	const bio = data.donneesEspece.consommation?.bio;

	const schema = z.object({
		part: Percent,
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => data.espece.id === "mouleCommune",
			getNextPage: () =>
				data.espece.id === "mouleCommune" ? "../../recapitulatif" : "./4",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.origine)) {
					data.progressionVentesEspece.origine = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.declaration.donnees.especes, {
					[data.espece.id]: { consommation: { bio: form.data } },
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	// @ts-expect-error typage à revoir
	$form.part = bio?.part;
</script>

<form use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4">Quelle part de la production est certifiée Bio ?</h2>
		{/snippet}

		{#snippet inputs()}
			<InputGroup
				type="number"
				bind:value={$form.part}
				errors={$errors?.part as string[]}
			>
				{#snippet label()}Part certifiée Agriculture biologique (AB) (%)
					<span class="fr-hint-text">
						Sur les quantités vendues à la consommation
					</span>
				{/snippet}
			</InputGroup>
		{/snippet}
	</Fieldset>
	<NavigationLinks
		prevHref="./2"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug {form} {errors} data={data.donneesEspece.consommation!.bio}
></FormDebug>
