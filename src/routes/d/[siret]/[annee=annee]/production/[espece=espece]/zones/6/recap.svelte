<script lang="ts">
	import { QUARTIERS_IMMATRICULATION } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatNum } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();

	const activeZonesIds = Object.keys(donneesEspece.zonesProduction ?? {});
	const activeZones = QUARTIERS_IMMATRICULATION.filter((q) =>
		activeZonesIds.includes(q.code),
	);
</script>

<div class="fr-table fr-table--sm">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell">
					<thead>
						<tr style="cell-w:20rem">
							<th style="min-width: 15rem">Zone</th>
							<th class="fr-cell--right">
								Part du stock
								<br />
							</th>
							<th class="fr-cell--right">Pertes</th>
						</tr>
					</thead>
					<tbody>
						{#each activeZones as q (q.code)}
							{@const part =
								donneesEspece.zonesProduction?.[q.code]?.partStockElevageAdulte}
							{@const pertes =
								donneesEspece.zonesProduction?.[q.code]?.pertesElevageAdulte}
							<tr>
								<td>{q.nom}</td>
								<td class="fr-cell--right">
									{formatNum(part ?? null, "%")}
								</td>
								<td class="fr-cell--right">
									{formatNum(pertes ?? null, "%")}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
