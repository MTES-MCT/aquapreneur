<script lang="ts">
	import type { etablissements } from "$db/schema/entreprise";

	const {
		etablissement,
		withEdit = false,
	}: {
		etablissement: typeof etablissements.$inferSelect;
		withEdit?: boolean;
	} = $props();
</script>

{#snippet editBtn()}
	{#if withEdit}
		<button
			class="fr-btn fr-icon-edit-line fr-btn--tertiary-no-outline fr-btn--sm"
			title="Éditer"
			disabled
		>
			Éditer
		</button>
	{/if}
{/snippet}

<div class="fr-table fr-table--sm">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell--multiline">
					<tbody>
						<tr>
							<th scope="row">Dénomination</th>
							<td>{etablissement.denomination}</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Numéro SIRET</th>
							<td>{etablissement.siret}</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Activité principale</th>
							<td>
								{etablissement.activitePrincipale}
								({etablissement.codeActivitePrincipale})
							</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Adresse postale</th>
							<td>
								{etablissement.adresse},
								{etablissement.codePostal}
								{etablissement.commune}
							</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

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
