<script lang="ts">
	import isEmpty from "lodash/isEmpty";

	import { type EspeceId, ORIGINES_NAISSAIN } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		especeId,
		donneesEspece,
	}: {
		especeId: EspeceId;
		donneesEspece: DonneesEspece;
	} = $props();

	const activeOrigines = ORIGINES_NAISSAIN.filter(
		(o) => especeId !== "mouleCommune" || o.id === "captage",
	);
</script>

{#if donneesEspece?.consommation?.origine && Object.values(donneesEspece.consommation.origine).some((origine) => !isEmpty(origine))}
	<div class="fr-table fr-table--sm">
		<div class="fr-table__wrapper">
			<div class="fr-table__container">
				<div class="fr-table__content">
					<table class="fr-cell--multiline">
						<thead>
							<tr>
								<th>Origine et ploïdie</th>
								<th class="fr-cell--right">Part de la production vendue</th>
							</tr>
						</thead>
						<tbody>
							{#each activeOrigines as origine (origine.id)}
								<tr>
									<td>{origine.label}</td>
									<td class="fr-cell--right">
										{formatInt(
											donneesEspece.consommation?.origine?.[origine.id]?.part,
											"%",
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
