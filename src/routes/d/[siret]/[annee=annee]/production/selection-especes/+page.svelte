<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group2.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ESPECES, ESPECES_IDS } from "$lib/constants";
	import { prepareForm } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";

	const { data } = $props();

	const schema = z.object({
		especes: z
			.enum(ESPECES_IDS)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER)
			.default(ESPECES_IDS.filter((e) => data.donneesEspeces[e] != null)),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "./recapitulatif",
			updateProgress: () => {
				// Pas de suivi de progression pour cette étape
				return data.declaration;
			},
			updateData: (form) => {
				ESPECES_IDS.forEach((e) => {
					if (form.data.especes.includes(e)) {
						// TODO si on part d’une valeur vide, restaurer la valeur préremplie/comptable ?
						merge(data.donneesEspeces, { [e]: {} });
					} else {
						// TODO avertir de la suppression des données
						delete data.donneesEspeces[e];
					}
				});
				form.data.especes.forEach((e) => {
					merge(data.donneesEspeces, { [e]: {} });
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<h1 class="fr-h3">Production</h1>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.especes?._errors}>
		{#snippet legend()}
			<p class="fr-text--lead fr-text--bold fr-mb-1w">
				Quelles espèces de coquillages avez-vous produit ?
			</p>
			<p class="fr-text--sm fr-text--light">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each ESPECES as espece (espece.id)}
				{@const especeId = espece.id}
				<CheckboxGroup>
					{#snippet input(id)}
						<input
							type="checkbox"
							aria-describedby="checkbox-{id}-messages"
							{id}
							value={especeId}
							bind:group={$form.especes}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}{espece.label}{/snippet}
				</CheckboxGroup>
			{/each}
			{#if $errors?.especes?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.especes._errors}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="./verification-especes" nextIsButton />
</form>

<FormDebug {form} {errors} data={data.donneesEspeces}></FormDebug>
