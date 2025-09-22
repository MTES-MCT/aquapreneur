<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import {
		QUARTIERS_IMMATRICULATION,
		QUARTIERS_IMMATRICULATION_IDS,
	} from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, {
		zonesProduction: {},
	});

	const schema = z.object({
		zones: z
			.literal(QUARTIERS_IMMATRICULATION_IDS)
			.array()
			.min(1, ERR_MUST_CHOOSE_AT_LEAST_ONE_ANSWER),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./2",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionProdEspece.zones)) {
					data.progressionProdEspece.zones = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				QUARTIERS_IMMATRICULATION_IDS.forEach((q) => {
					if (form.data.zones.includes(q)) {
						merge(data.donneesEspece.zonesProduction, { [q]: {} });
					} else {
						delete data.donneesEspece.zonesProduction?.[q];
					}
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	const localisations = [
		"Atlantique",
		"Manche",
		"Mer du Nord",
		"Méditerranée",
		"Outre-Mer",
	];

	let modal: Node;

	// @ts-expect-error typage à revoir
	$form.zones = Object.keys(data.donneesEspece.zonesProduction ?? {});
</script>

<dialog
	id="modal-zones-edit"
	bind:this={modal}
	class="fr-modal"
	aria-labelledby="modal-modal-zones-edit-title"
	data-fr-concealing-backdrop="true"
>
	<div class="fr-container fr-container--fluid fr-container-md">
		<div class="fr-grid-row fr-grid-row--center">
			<div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
				<div class="fr-modal__body">
					<div class="fr-modal__header">
						<button
							aria-controls="modal-zones-edit"
							title="Fermer"
							type="button"
							class="fr-btn--close fr-btn"
						>
							Fermer
						</button>
					</div>
					<div class="fr-modal__content">
						<h2 id="modal-zones-edit-title" class="fr-modal__title">
							Sélectionner les zones de production
						</h2>
						<div class="fr-ml-3v">
							<Fieldset>
								{#snippet legend()}
									<p class="fr-text--light fr-text--sm fr-mb-2w">
										Vous pouvez sélectionner une ou plusieurs réponses.
									</p>
								{/snippet}
								{#snippet inputs()}
									{#each localisations as localisation (localisation)}
										<h3 class="fr-h6 fr-mt-2w">{localisation}</h3>
										{#each QUARTIERS_IMMATRICULATION.filter((q) => q.localisation === localisation) as q (q.code)}
											<CheckboxGroup>
												{#snippet input(id)}
													<input
														type="checkbox"
														aria-describedby="checkbox-{id}-messages"
														{id}
														value={q.code}
														bind:group={$form.zones}
														autocomplete="off"
													/>
												{/snippet}
												{#snippet label()}{q.nom}{/snippet}
											</CheckboxGroup>
										{/each}
									{/each}
								{/snippet}
							</Fieldset>
							<NavigationLinks>
								<!-- <button
									class="fr-btn fr-btn--secondary fr-mr-3w"
									onclick={() => {
										// @ts-expect-error `dsfr` est global
										window.dsfr(modal).modal.conceal();
									}}
								>
									Annuler
								</button> -->
								<button
									class="fr-btn"
									onclick={() => {
										// @ts-expect-error `dsfr` est global
										window.dsfr(modal).modal.conceal();
									}}
								>
									Confirmer la selection
								</button>
							</NavigationLinks>
							<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</dialog>

<form method="POST" use:enhance>
	<Fieldset hasError={!!$errors?.zones?._errors}>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">Où est située votre production ?</h2>

			<p class="fr-text--sm fr-text--light">
				Vous pouvez sélectionner une ou plusieurs réponses.
			</p>
		{/snippet}

		{#snippet inputs(id)}
			{#each QUARTIERS_IMMATRICULATION.filter( (q) => $form.zones.includes(q.code), ) as q (q.code)}
				<CheckboxGroup>
					{#snippet input(id)}
						<input
							type="checkbox"
							aria-describedby="checkbox-{id}-messages"
							{id}
							value={q.code}
							bind:group={$form.zones}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}{q.nom}{/snippet}
				</CheckboxGroup>
			{/each}
			{#if $errors?.zones?._errors}
				<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
					<p class="fr-message fr-message--error" id="{id}-errors">
						{$errors.zones._errors}
					</p>
				</div>
			{/if}
			<button
				class="fr-btn fr-btn--tertiary fr-btn--sm fr-mt-2w fr-icon-add-line fr-btn--icon-right"
				aria-controls="modal-zones-edit"
				data-fr-opened="false"
				type="button"
			>
				Ajouter ou retirer une zone
			</button>
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton cantAnswerBtn={data.persona === "comptable"} />
</form>

<FormDebug {form} {errors} data={data.donneesEspece}></FormDebug>
