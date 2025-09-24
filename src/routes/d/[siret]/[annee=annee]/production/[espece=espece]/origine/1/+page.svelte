<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { MODES_ELEVAGE, MODES_ELEVAGE_IDS } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { modeElevage: {} });

	const schema = z.object({
		mode: z
			.literal(MODES_ELEVAGE_IDS)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER)
			.default(
				MODES_ELEVAGE_IDS.filter(
					(m) => data.donneesEspece.modeElevage?.[m] != null,
				),
			),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./2",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionProdEspece.origine)) {
					data.progressionProdEspece.origine = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				MODES_ELEVAGE_IDS.forEach((e) => {
					if (form.data.mode.includes(e)) {
						merge(data.donneesEspece, { modeElevage: { [e]: {} } });
					} else {
						delete data.donneesEspece.modeElevage?.[e];
					}
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	const groupes = [
		{
			id: "decouvrant",
			label: "Terrain découvrant ou semi-découvrant",
		},
		{
			id: "pleineMer",
			label: "Pleine mer",
		},
	];
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.mode?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">Quels mode d’élevage pratiquez-vous ?</h2>

			<p class="fr-text--sm fr-text--light">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each groupes as groupe (groupe.id)}
				<h3 class="fr-h6 fr-mt-3w">{groupe.label}</h3>

				{#each MODES_ELEVAGE.filter((m) => m.groupe === groupe.id && (m.especes == null || (m.especes as ReadonlyArray<string>).includes(data.espece.id))) as mode (mode.id)}
					{@const modeId = mode.id}

					<CheckboxGroup>
						{#snippet input(id)}
							<input
								type="checkbox"
								aria-describedby="checkbox-{id}-messages"
								{id}
								value={modeId}
								bind:group={$form.mode}
								autocomplete="off"
							/>
						{/snippet}
						{#snippet label()}{mode.label}{/snippet}
					</CheckboxGroup>
				{/each}
			{/each}
			{#if $errors?.mode?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.mode._errors}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton cantAnswerBtn={data.persona === "comptable"} />
</form>

<FormDebug {form} {errors} data={data.donneesEspece.modeElevage}></FormDebug>
