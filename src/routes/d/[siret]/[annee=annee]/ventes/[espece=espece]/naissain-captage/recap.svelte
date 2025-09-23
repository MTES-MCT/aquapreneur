<script lang="ts">
	import { DESTINATIONS_NAISSAIN } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();

	const destinationsActives = DESTINATIONS_NAISSAIN.filter(
		(d) => donneesEspece.naissainCaptage?.destination?.[d.id] != null,
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
							<th class="fr-cell--right">Montant des ventes</th>
							<th class="fr-cell--right">Quantité</th>
						</tr>
					</thead>
					<tbody>
						{#each destinationsActives as dest (dest.id)}
							<tr>
								<td>{dest.label}</td>
								<td class="fr-cell--right">
									{formatInt(
										donneesEspece.naissainCaptage?.destination?.[dest.id]
											?.valeurHT,
										"€",
									)}
								</td>
								<td class="fr-cell--right">
									<!-- TODO: gérer les moules -->
									{formatInt(
										donneesEspece.naissainCaptage?.destination?.[dest.id]
											?.quantiteMilliers,
										"milliers",
									)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
