<script lang="ts">
	import { ORIGINES_NAISSAIN_ECLOSERIE_NURSERIE } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();

	const dest = donneesEspece.naissainEcloserieNurserie?.destination;
</script>

{#if donneesEspece.naissainEcloserieNurserie?.destination}
	<div class="fr-table fr-table--lg">
		<div class="fr-table__wrapper">
			<div class="fr-table__container">
				<div class="fr-table__content">
					<table class="fr-cell--multiline">
						<thead>
							<tr>
								<th>Destination</th>
								<th class="fr-cell--right">Montant des ventes</th>
								<th class="fr-cell--right">Quantité</th>
							</tr>
						</thead>
						<tbody>
							{#if dest?.france}
								<tr>
									<td
										colspan="3"
										class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
									>
										En France
									</td>
								</tr>
								{#each ORIGINES_NAISSAIN_ECLOSERIE_NURSERIE as ori (ori.id)}
									<tr>
										<td>{ori.label}</td>
										<td class="fr-cell--right">
											{formatInt(dest.france[ori.id]?.valeurHT, "€")}
										</td>
										<td class="fr-cell--right">
											<!-- todo : moules -->
											{formatInt(
												dest.france[ori.id]?.quantiteMilliers,
												"milliers",
											)}
										</td>
									</tr>
								{/each}
							{/if}
							{#if dest?.etranger}
								<tr>
									<td
										colspan="3"
										class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
									>
										À l’étranger
									</td>
								</tr>
								<!-- filter active states -->
								{#each ORIGINES_NAISSAIN_ECLOSERIE_NURSERIE as ori (ori.id)}
									<tr>
										<td>{ori.label}</td>
										<td class="fr-cell--right">
											{formatInt(dest.etranger[ori.id]?.valeurHT, "€")}
										</td>
										<td class="fr-cell--right">
											<!-- todo moules -->
											{formatInt(
												dest.etranger[ori.id]?.quantiteMilliers,
												"milliers",
											)}
										</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
{/if}
