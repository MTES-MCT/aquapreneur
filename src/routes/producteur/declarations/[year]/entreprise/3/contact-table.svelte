<script lang="ts">
	import Fieldset from "$lib/components/fieldset.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";

	const { editable = false } = $props();

	const dc = getDeclarationContext();

	// if (!dc.emailEntreprise) {
	//   dc.emailEntreprise = data.utilisateur.courriel;
	// }
	// if (!dc.telEntreprise) {
	//   dc.telEntreprise = data.utilisateur.telephone ?? '';
	// }
</script>

{#if editable}
	<Fieldset>
		{#snippet legend()}
			<span class="fr-fieldset__legend--regular fr-hint-text fr-text--sm">
				* Les champs marqués d’une étoile sont obligatoires
			</span>
		{/snippet}

		{#snippet inputs(fieldsetId)}
			<InputGroup
				name="courriel-entreprise"
				type="email"
				bind:value={dc.entreprise.emailEntreprise}
				{fieldsetId}
				required
			>
				{#snippet label()}
					E-mail de l’entreprise *
					<span class="fr-hint-text">
						Indiquez l’adresse e-mail générale de votre entreprise. Format
						attendu : nom@domaine.fr
					</span>
				{/snippet}
				<!-- {#snippet actionButton()}
          <button
            type="button"
            class="fr-btn fr-btn--tertiary fr-btn--sm"
            disabled={dc.emailEntreprise === data.utilisateur.courriel}
            onclick={() => (
              dc.emailEntreprise = data.utilisateur.courriel)}
            >Réinitialiser</button
          >
        {/snippet} -->
			</InputGroup>

			<InputGroup
				name="courriel-contact"
				type="email"
				{fieldsetId}
				bind:value={dc.entreprise.emailContact}
			>
				{#snippet label()}
					E-mail de contact
					<span class="fr-hint-text">
						Indiquez l’adresse e-mail du contact principal. Format attendu :
						nom@domaine.fr
					</span>
				{/snippet}
			</InputGroup>

			<InputGroup
				name="tel-entreprise"
				type="tel"
				{fieldsetId}
				bind:value={dc.entreprise.telEntreprise}
				required
			>
				{#snippet label()}
					Numéro de téléphone de l’entreprise *
					<span class="fr-hint-text">
						Indiquez le numéro de téléphone principal de votre entreprise.
						Format attendu : 01 22 33 44 55
					</span>
				{/snippet}

				<!-- {#snippet actionButton()}
          <button
            type="button"
            class="fr-btn fr-btn--tertiary fr-btn--sm"
            disabled={dc.telEntreprise === data.utilisateur.telephone}
            onclick={() => (dc.telEntreprise = data.utilisateur.telephone ?? '')}
            >Réinitialiser</button
          >
        {/snippet} -->
			</InputGroup>

			<InputGroup
				name="tel-contact"
				type="tel"
				{fieldsetId}
				bind:value={dc.entreprise.telContact}
			>
				{#snippet label()}
					Numéro de téléphone de contact
					<span class="fr-hint-text">
						Indiquez le numéro de téléphone du contact principal. Format attendu
						: 01 22 33 44 55
					</span>
				{/snippet}
			</InputGroup>
		{/snippet}
	</Fieldset>
{:else}
	<div class="fr-table fr-table--sm">
		<div class="fr-table__wrapper">
			<div class="fr-table__container">
				<div class="fr-table__content">
					<table class="fr-cell--multiline">
						<tbody>
							<tr>
								<th scope="row">Email de l’entreprise</th>
								<td>{dc.entreprise.emailEntreprise}</td>
							</tr>
							<tr>
								<th scope="row">E-mail de contact</th>
								<td>{dc.entreprise.emailContact}</td>
							</tr>
							<tr>
								<th scope="row">Téléphone de l’entreprise</th>
								<td>
									{dc.entreprise.telEntreprise}
								</td>
							</tr>
							<tr>
								<th scope="row">Téléphone de contact</th>
								<td>{dc.entreprise.telContact}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	th {
		width: 15ch;
	}

	@media (min-width: 36em) {
		th {
			width: 25ch;
		}
	}
</style>
