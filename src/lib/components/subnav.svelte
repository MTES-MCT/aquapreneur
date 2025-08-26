<script lang="ts">
	import capitalize from "lodash/capitalize";

	import { page } from "$app/state";

	let { children } = $props();
</script>

<div style="background-color: var(--background-alt-grey); ">
	<div class="fr-container">
		<div class="fr-grid-row fr-py-6v fr-grid-row--center">
			{#if page.data.espece}
				<div class="fr-col-4 fr-col-md-2">
					<p class="fr-tag">{capitalize(page.data.espece.label)}</p>
				</div>
			{/if}
			{#if !page.data.currentStep}
				<div class="fr-col-6 fr-col-md-8">
					<p class="fr-text--lg fr-text--bold fr-m-0">{page.data.sousTitre}</p>
				</div>
			{:else}
				<div class="fr-col-6 fr-col-md-8">
					<div class="fr-stepper fr-my-0">
						<h2 class="fr-stepper__title fr-text--sm" style="display:block">
							{page.data.sousTitre} :
							<span class="fr-text--regular">
								étape {page.data.currentStep} sur {page.data.numSteps}
							</span>
						</h2>
						<div
							class="fr-stepper__steps"
							data-fr-current-step={page.data.currentStep}
							data-fr-steps={page.data.numSteps}
						></div>
					</div>
				</div>
			{/if}
			<div class="fr-col-md-1"></div>
			<div class="fr-col-2 fr-col-md-1">
				<a
					href={page.data.returnUrl}
					type="button"
					class="fr-btn fr-icon-close-line fr-btn--icon-right fr-btn--tertiary-no-outline"
				>
					Fermer
				</a>
			</div>
		</div>
	</div>
</div>

<div class="fr-container">
	<div class="fr-grid-row">
		<div
			id="contenu"
			class="fr-col-12 fr-col-md-8 fr-col-lg-7 fr-mx-auto fr-pt-md-12v fr-pt-8v fr-pb-12v"
			style="min-height: 100vh;"
		>
			{@render children()}
		</div>
	</div>
</div>
