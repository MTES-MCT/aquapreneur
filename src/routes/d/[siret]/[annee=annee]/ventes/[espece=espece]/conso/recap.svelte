<script lang="ts">
	import { DESTINATIONS_VENTES_CONSO_FRANCE } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();

	const dest = donneesEspece.consommation!.destination!;
	const destFrActifs = DESTINATIONS_VENTES_CONSO_FRANCE.filter(
		(d) => dest.france?.[d.id] != null,
	);
</script>

<div class="fr-table fr-table--lg">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell--multiline">
					<thead>
						<tr>
							<th>Destination</th>
							<th>Montant des ventes</th>
							<th>Quantité</th>
						</tr>
					</thead>
					<tbody>
						{#if dest.france}
							<tr>
								<td
									colspan="3"
									class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
								>
									En France
								</td>
							</tr>
							{#each destFrActifs as destination (destination.id)}
								{#if dest.france[destination.id]}
									<tr>
										<td>{destination.label}</td>
										<td class="fr-cell--right">
											{formatInt(dest.france[destination.id]!.valeurHT, "€")}
										</td>
										<td class="fr-cell--right">
											{formatInt(dest.france[destination.id]!.quantiteKg, "kg")}
										</td>
									</tr>
								{/if}
							{/each}
						{/if}
						{#if dest.unionEuropeenne || dest.horsUnionEuropeenne}
							<tr>
								<td
									colspan="3"
									class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
								>
									À l’étranger
								</td>
							</tr>
							{#if dest.unionEuropeenne}
								<tr>
									<td>Au sein de l’Union Européenne</td>
									<td class="fr-cell--right">
										{formatInt(dest.unionEuropeenne.valeurHT, "€")}
									</td>
									<td class="fr-cell--right">
										{formatInt(dest.unionEuropeenne.quantiteKg, "kg")}
									</td>
								</tr>
							{/if}
							{#if dest.horsUnionEuropeenne}
								<tr>
									<td>Hors de l’Union Européenne</td>
									<td class="fr-cell--right">
										{formatInt(dest.horsUnionEuropeenne.valeurHT, "€")}
									</td>
									<td class="fr-cell--right">
										{formatInt(dest.horsUnionEuropeenne.quantiteKg, "kg")}
									</td>
								</tr>
							{/if}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
