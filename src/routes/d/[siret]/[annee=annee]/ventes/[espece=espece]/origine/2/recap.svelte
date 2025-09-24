<script lang="ts">
	import { ORIGINES_NAISSAIN } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

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
						{#each ORIGINES_NAISSAIN as origine (origine.id)}
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
