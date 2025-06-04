<script lang="ts">
	import { goto } from "$app/navigation";

	import { getDeclarationContext } from "$lib/declaration-context";

	import BilanTable from "../declaration/5/bilan-table.svelte";
	import EtablissementDataTable from "../entreprise/2/etablissement-data-table.svelte";
	import ContactTable from "../entreprise/3/contact-table.svelte";
	import ProductionDetails from "../production/2/production-details.svelte";
	import StockDetails from "../stock/2/stock-details.svelte";

	let { data } = $props();

	function handleCloseModal(modalId: string) {
		const element = document.getElementById(modalId);
		// @ts-expect-error -- pas de type disponible
		dsfr(element).modal.conceal();
	}

	const context = getDeclarationContext();

	function handleSubmit() {
		context.envoiComplete = true;
		context.valide = true;
		goto("/");
	}
</script>

{#snippet fieldContent(content: string)}
	{#if content}
		<p>
			{#each content.split("\n") as line (line)}
				{line}
				<br />
			{/each}
		</p>
	{:else}
		<p class="fr-text--light">Aucune réponse</p>
	{/if}
{/snippet}

<h1 class="fr-h2">Voici le récapitulatif de votre déclaration</h1>

<p>
	Avant d’envoyer votre déclaration, merci de vérifier que toutes les
	informations saisies sont exactes. Vous pouvez encore revenir en arrière pour
	les modifier si nécessaire.
</p>

<div class="header-wrapper">
	<h2 class="fr-h5">Données entreprise</h2>
	<a
		href="entreprise/1"
		class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
	>
		Revoir
	</a>
</div>

<h3 class="fr-text--md fr-text--bold">Informations</h3>

<EtablissementDataTable
	etablissement={data.etablissement}
	activitePrincipale={data.activitePrincipale}
></EtablissementDataTable>

<h3 class="fr-text--md fr-text--bold">Contact</h3>

<ContactTable {data}></ContactTable>

<div class="header-wrapper">
	<h2 class="fr-h5">Concessions</h2>
	<a
		href="concessions/1"
		class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
	>
		Revoir
	</a>
</div>

<p>
	Vous avez effectué un ou plusieurs changements sur vos concessions cette
	année.
</p>
{#if context.concessionsErreursComment}
	<h3 class="fr-text--md fr-text--bold">Changement(s) non pris en compte</h3>
	{@render fieldContent(context.concessionsErreursComment)}
{:else}
	<p>Les informations sur vos concessions sont à jour.</p>
{/if}

<div class="header-wrapper">
	<h2 class="fr-h5">Production aquacole vendue</h2>
	<a
		href="production/1"
		class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
	>
		Revoir
	</a>
</div>

<ProductionDetails bilan={data.bilan} etablissement={data.etablissement}
></ProductionDetails>

<div class="header-wrapper">
	<h2 class="fr-h5">Stock</h2>
	<a
		href="stock/1"
		class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
	>
		Revoir
	</a>
</div>

<StockDetails bilan={data.bilan} etablissement={data.etablissement}
></StockDetails>

<div class="header-wrapper">
	<h2 class="fr-h5">Déclaration obligatoire</h2>
	<a
		href="declaration/1"
		class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
	>
		Revoir
	</a>
</div>

<h3 class="fr-text--md fr-text--bold">Bilan comptable</h3>

<BilanTable bilan={data.bilan} etablissement={data.etablissement}></BilanTable>

<h3 class="fr-text--md fr-text--bold">
	Avez-vous eu des événements exceptionnels au cours de l'année 2024 ?
</h3>

{@render fieldContent(context.evtExceptionnelsComment)}

<h3 class="fr-text--md fr-text--bold">
	Avez-vous relevé des données erronées dans le formulaire ?
</h3>
{@render fieldContent(context.formErreursComment)}

<h3 class="fr-text--md fr-text--bold">
	Avez-vous des remarques ou suggestions concernant l’outil ?
</h3>
{@render fieldContent(context.suggestionsComment)}

<!-- ####################################################################### -->

<!-- Bouton d'ouverture de la modale -->

<div class="fr-mt-8w" style="display:flex; justify-content: space-between;">
	<a
		href="declaration/5"
		class="fr-link fr-icon-arrow-left-line fr-link--icon-left"
		style="justify-self: start; align-self: center;"
	>
		Précédent
	</a>

	<button
		class="fr-btn"
		data-fr-opened="false"
		aria-controls="fr-modal-confirmation"
	>
		Envoyer la déclaration
	</button>
</div>

<!-- Modale avec zone d'action DSFR
   Idéalement, la balise <dialog> devrait être un enfant direct de la balise <body>
-->

<!-- svelte-ignore a11y_no_redundant_roles -->
<dialog
	aria-labelledby="fr-modal-confirmation-title"
	id="fr-modal-confirmation"
	class="fr-modal"
	role="dialog"
>
	<div class="fr-container fr-container--fluid fr-container-md">
		<div class="fr-grid-row fr-grid-row--center">
			<div class="fr-col-12 fr-col-md-8">
				<div class="fr-modal__body">
					<div class="fr-modal__header">
						<button
							class="fr-btn--close fr-btn"
							aria-controls="fr-modal-confirmation"
						>
							Fermer
						</button>
					</div>
					<div class="fr-modal__content">
						<h1 id="fr-modal-confirmation-title" class="fr-modal__title">
							Confirmation de l’envoi
						</h1>
						<p>
							Êtes-vous sûr(e) de vouloir soumettre votre déclaration ? Une fois
							envoyée, vous ne pourrez plus modifier les informations. Vérifiez
							bien que toutes les données sont correctes avant de confirmer.
						</p>
					</div>
					<div class="fr-modal__footer">
						<div
							class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
						>
							<button class="fr-btn fr-btn--icon-left" onclick={handleSubmit}>
								Envoyer
							</button>
							<button
								class="fr-btn fr-btn--secondary"
								onclick={() => handleCloseModal("fr-modal-confirmation")}
							>
								Continuer la déclaration
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</dialog>

<style lang="postcss">
	.header-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 1.5em;
		margin-top: 3rem;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 0;
	}

	h3 {
		margin-bottom: 0;
		margin-top: 1rem;
	}
</style>
