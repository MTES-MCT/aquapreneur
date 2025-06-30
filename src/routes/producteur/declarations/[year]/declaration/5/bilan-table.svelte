<script lang="ts">
	import { getDeclarationContext } from "$lib/declaration-context";
	import { formatDate } from "$lib/utils";

	const dc = getDeclarationContext();
</script>

{#if !dc.dateBilan}
	<div class="fr-alert fr-alert--warning fr-my-2v">
		<h3 class="fr-alert__title">Données manquantes</h3>
		<p>
			Nous n’avons pas trouvé de données sur le bilan de l’établissement
			<br />
			{dc.etablissement.denomination}.
		</p>
	</div>
{:else}
	<div class="fr-table fr-table--sm">
		<div class="fr-table__wrapper">
			<div class="fr-table__container">
				<div class="fr-table__content">
					<table class="fr-cell--multiline">
						<tbody>
							<tr>
								<th scope="row">Date de début d’exercice</th>
								<td>{formatDate(dc.debutExercice)}</td>
							</tr>
							<tr>
								<th scope="row">Date de fin d’exercice</th>
								<td>{formatDate(dc.finExercice)}</td>
							</tr>
							<tr>
								<th scope="row">Date de soumission</th>
								<td>{formatDate(dc.dateBilan)}</td>
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
