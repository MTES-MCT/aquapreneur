<script lang="ts">
	import { getDeclarationContext } from "$lib/declaration-context";

	const {
		withEdit = false,
	}: {
		withEdit?: boolean;
	} = $props();

	const dc = getDeclarationContext();
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
							<td>{dc.etablissement.denomination}</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Numéro SIRET</th>
							<td>{dc.etablissement.siret}</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Activité principale</th>
							<td>
								{dc.etablissement.activitePrincipale}
								({dc.etablissement.codeActivitePrincipale})
							</td>
							<td class="fr-cell--right">
								{@render editBtn()}
							</td>
						</tr>
						<tr>
							<th scope="row">Adresse postale</th>
							<td>
								{dc.etablissement.adresse},
								{dc.etablissement.codePostal}
								{dc.etablissement.commune}
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
