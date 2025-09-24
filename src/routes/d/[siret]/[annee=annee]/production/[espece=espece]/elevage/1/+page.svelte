<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { STADES_ELEVAGE } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { consommation: {} });

	const stades = [
		{ id: "naissainCaptage", label: "Naissain – captage" },
		{ id: "naissainEcloserieNurserie", label: "Naissain – écloserie/nurserie" },
		...STADES_ELEVAGE,
		{ id: "affinage", label: "Affinage" },
	].filter(
		(s) =>
			data.espece.id !== "mouleCommune" || s.id !== "naissainEcloserieNurserie",
	);

	const stadeIds = stades.map((p) => p.id);

	const schema = z.object({
		stade: z
			.literal(stadeIds)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER)
			.default(
				stadeIds.filter((e) =>
					e === "affinage" ?
						data.donneesEspece.consommation?.affinage != null
						// @ts-expect-error typage à revoir
					:	data.donneesEspece[e] != null,
				),
			),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "./2",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionProdEspece.elevage)) {
					data.progressionProdEspece.elevage = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				stadeIds.forEach((e) => {
					if (e === "affinage") {
						if (form.data.stade.includes("affinage")) {
							merge(data.donneesEspece.consommation, { affinage: {} });
						} else {
							delete data.donneesEspece.consommation?.affinage;
						}
					} else {
						if (form.data.stade.includes(e)) {
							merge(data.donneesEspece, { [e]: {} });
						} else {
							// @ts-expect-error typage à revoir
							delete data.donneesEspece[e];
						}
					}
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.stade?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Quelle(s) phase(s) d’élevage réalisez-vous ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each stades as stade (stade.id)}
				{@const stadeId = stade.id}
				<CheckboxGroup>
					{#snippet input(id)}
						<input
							type="checkbox"
							aria-describedby="checkbox-{id}-messages"
							{id}
							value={stadeId}
							bind:group={$form.stade}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}{stade.label}{/snippet}
				</CheckboxGroup>
			{/each}
			{#if $errors?.stade?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.stade._errors}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton cantAnswerBtn={data.persona === "comptable"} />
</form>

<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
