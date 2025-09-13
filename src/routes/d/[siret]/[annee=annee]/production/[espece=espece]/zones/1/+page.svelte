<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { QUARTIERS_IMMATRICULATION } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("./2");
	};

	const localisations = [
		"Atlantique",
		"Manche",
		"Mer du Nord",
		"Méditerranée",
		"Outre-Mer",
	];

	let modal: Node;

	const zones = ["AC", "LR", "BL", "LS"];
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
						<h2 id="modal-zones-edit-title" class="fr-modal__title fr-mb-4w">
							Sélectionner les zones de production
						</h2>
						<div class="fr-ml-3v">
							<Fieldset>
								{#snippet inputs()}
									{#each localisations as localisation (localisation)}
										<h3 class="fr-h6">{localisation}</h3>
										{#each QUARTIERS_IMMATRICULATION.filter((q) => q.localisation === localisation) as q (q.code)}
											<CheckboxGroup
												name={q.code}
												id={q.code}
												small
												checked={zones.includes(q.code)}
												onCheck={() => {}}
											>
												{#snippet label()}{q.nom}{/snippet}
											</CheckboxGroup>
										{/each}
									{/each}
								{/snippet}
							</Fieldset>
							<NavigationLinks>
								<button
									class="fr-btn fr-btn--secondary fr-mr-3w"
									onclick={() => {
										// @ts-expect-error `dsfr` est global
										window.dsfr(modal).modal.conceal();
									}}
								>
									Annuler
								</button>
								<button
									class="fr-btn"
									onclick={() => {
										// TODO : propager la selection
										// @ts-expect-error `dsfr` est global
										window.dsfr(modal).modal.conceal();
									}}
								>
									Confirmer la selection
								</button>
							</NavigationLinks>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</dialog>

<div>
	<p class="fr-text--xl">Où est située votre production ?</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				{#each QUARTIERS_IMMATRICULATION.filter( (q) => zones.includes(q.code), ) as q (q.code)}
					<CheckboxGroup name={q.code} id={q.code} checked onCheck={() => {}}>
						{#snippet label()}{q.nom}{/snippet}
					</CheckboxGroup>
				{/each}

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

		<NavigationLinks nextIsButton cantAnswerBtn />
	</form>
</div>
