<script lang="ts">
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ORIGINES } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";
	import { nomEspece } from "$lib/utils";

	const { data } = $props();

	const originesIds = ORIGINES.map((m) => m.id);
	const schema = z.object({
		origine: z
			.literal(originesIds)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER),
		// .default(stadeIds.filter((e) => data.donneesEspece[e] != null)),
	});
	// TODO: default values
	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "../../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionProdEspece.origine)) {
					data.progressionProdEspece.origine = statut;
				}
				return data.declaration;
			},
			updateData: () => {
				// TODO update data
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.origine?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Quelle est l’origine des {nomEspece(data.espece, { plural: true })} en cours
				d’élevage ?
			</h2>

			<p class="fr-text--sm fr-text--light">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each ORIGINES as origine (origine.id)}
				{@const origineId = origine.id}

				<CheckboxGroup>
					{#snippet input(id)}
						<input
							type="checkbox"
							aria-describedby="checkbox-{id}-messages"
							{id}
							value={origineId}
							bind:group={$form.origine}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}{origine.label}{/snippet}
				</CheckboxGroup>
			{/each}
			{#if $errors?.origine?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.origine._errors}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>
	<NavigationLinks
		prevHref="./1"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
