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
							<th style="min-width: 20rem">Zone</th>
							<th class="fr-cell--right">Surface détenue</th>
						</tr>
					</thead>
					<tbody>
						{#each activeZones as q (q.code)}
							{@const surf = donneesEspece.zonesProduction?.[q.code]?.surfaceHa}
							{#if surf}
								<tr>
									<td>{q.nom}</td>
									<td class="fr-cell--right">
										{formatNum(surf ?? null, "ha")}
									</td>
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
