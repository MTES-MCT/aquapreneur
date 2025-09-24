<script lang="ts">
	import isEmpty from "lodash/isEmpty";

	import { DESTINATIONS_NAISSAIN, type EspeceId } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		especeId,
		donneesEspece,
	}: {
		especeId: EspeceId;
		donneesEspece: DonneesEspece;
	} = $props();

	const destinationsActives = DESTINATIONS_NAISSAIN.filter(
		(d) => donneesEspece.naissainCaptage?.destination?.[d.id] != null,
	);
</script>

{#if isEmpty(donneesEspece.naissainCaptage?.destination)}
	<p>Pas de vente de naissain de captage</p>
{:else if donneesEspece.naissainCaptage?.destination}
	<div class="fr-table fr-table--sm">
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
										{especeId === "mouleCommune" ?
											formatInt(
												donneesEspece.naissainCaptage?.destination?.[dest.id]
													?.quantite,
												"mètres",
											)
										:	formatInt(
												donneesEspece.naissainCaptage?.destination?.[dest.id]
													?.quantite,
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
{/if}
