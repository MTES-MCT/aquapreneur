<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";
	import { formatDate } from "$lib/utils";

	const { donnees }: { donnees: DeclarationSchema } = $props();
</script>

{#if !donnees.dateBilan}
	<div class="fr-alert fr-alert--warning fr-my-2v">
		<h3 class="fr-alert__title">Données manquantes</h3>
		<p>
			Nous n’avons pas trouvé de données sur le bilan de l’établissement
			<br />
			{donnees.etablissement.denomination}.
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
								<td>{formatDate(donnees.debutExercice)}</td>
							</tr>
							<tr>
								<th scope="row">Date de fin d’exercice</th>
								<td>{formatDate(donnees.finExercice)}</td>
							</tr>
							<tr>
								<th scope="row">Date de soumission</th>
								<td>{formatDate(donnees.dateBilan)}</td>
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
