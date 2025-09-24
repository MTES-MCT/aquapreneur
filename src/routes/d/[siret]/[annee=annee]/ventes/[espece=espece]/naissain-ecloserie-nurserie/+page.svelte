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

	const schema = z.object({
		aVenduNaissain: Bool.default(
			!!data.donneesEspece.naissainEcloserieNurserie?.destination,
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: (form) => !form.data.aVenduNaissain,
			getNextPage: () =>
				data.donneesEspece.naissainEcloserieNurserie?.destination ?
					"./naissain-ecloserie-nurserie/1"
				:	"../recapitulatif",
			updateProgress: (statut) => {
				if (
					shouldUpdateStatus(
						data.progressionVentesEspece.naissainEcloserieNurserie,
					)
				) {
					data.progressionVentesEspece.naissainEcloserieNurserie = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				if (form.data.aVenduNaissain) {
					merge(data.donneesEspece, {
						naissainEcloserieNurserie: { destination: {} },
					});
				} else {
					delete data.donneesEspece.naissainEcloserieNurserie?.destination;
				}
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.aVenduNaissain}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Avez-vous vendu votre naissain d’écloserie/nurserie ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Il s’agit des ventes de naissains obtenus au sein de l’entreprise.
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
						bind:group={$form.aVenduNaissain}
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
						bind:group={$form.aVenduNaissain}
						autocomplete="off"
					/>
				{/snippet}
				{#snippet label()}Non{/snippet}
			</RadioGroup>

			{#if $errors?.aVenduNaissain}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.aVenduNaissain}
					</p>
				</div>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton cantAnswerBtn={data.persona === "comptable"} />
</form>

<FormDebug {form} {errors} data={data.donneesEspece.naissainEcloserieNurserie}
></FormDebug>
