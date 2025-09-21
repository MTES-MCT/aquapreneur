<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Bool } from "$lib/types";

	const { data } = $props();

	const aVendu = $derived(
		!!data.donneesEspece.pregrossissement?.destination ||
			!!data.donneesEspece.demiElevage?.destination ||
			!!data.donneesEspece.elevageAdulte?.destination,
	);

	const schema = z.object({
		aVenduElevage: Bool.default((() => aVendu)()),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: (form) => !form.data.aVenduElevage,
			getNextPage: () => {
				return aVendu ? "./elevage/1" : "../recapitulatif";
			},
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.elevage)) {
					data.progressionVentesEspece.elevage = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				if (form.data.aVenduElevage) {
					merge(data.donneesEspece, {
						pregrossissement: { destination: {} },
						demiElevage: { destination: {} },
						elevageAdulte: { destination: {} },
					});
				} else {
					delete data.donneesEspece.pregrossissement?.destination;
					delete data.donneesEspece.demiElevage?.destination;
					delete data.donneesEspece.elevageAdulte?.destination;
				}
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.aVenduElevage}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Avez-vous réalisé des ventes à l’élevage (hors naissain) ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Il s’agit des ventes de {data.espece.label} destinées au grossissement ou
				à l’affinage par d’autres professionnels.
			</p>
		{/snippet}
		{#snippet inputs(id)}
			<RadioGroup inline>
				{#snippet input(id)}
					<input
						{id}
						type="radio"
						aria-describedby="radio-{id}-messages"
						value={true}
						bind:group={$form.aVenduElevage}
						autocomplete="off"
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
						bind:group={$form.aVenduElevage}
						autocomplete="off"
					/>
				{/snippet}
				{#snippet label()}Non{/snippet}
			</RadioGroup>

			{#if $errors?.aVenduElevage}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.aVenduElevage}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton cantAnswerBtn={data.persona === "comptable"} />
</form>

<FormDebug
	{form}
	{errors}
	data={{
		pregrossissement: data.donneesEspece.pregrossissement,
		demiElevage: data.donneesEspece.demiElevage,
		elevageAdulte: data.donneesEspece.elevageAdulte,
	}}
></FormDebug>
