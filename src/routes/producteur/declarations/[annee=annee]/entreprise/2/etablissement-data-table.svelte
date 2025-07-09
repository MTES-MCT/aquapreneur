<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	const {
		donnees,
		withEdit = false,
	}: {
		donnees: DeclarationSchema;
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
							<td>{donnees.etablissement.denomination}</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Numéro SIRET</th>
							<td>{donnees.etablissement.siret}</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Activité principale</th>
							<td>
								{donnees.etablissement.activitePrincipale}
								({donnees.etablissement.codeActivitePrincipale})
							</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Adresse postale</th>
							<td>
								{donnees.etablissement.adresse},
								{donnees.etablissement.codePostal}
								{donnees.etablissement.commune}
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
