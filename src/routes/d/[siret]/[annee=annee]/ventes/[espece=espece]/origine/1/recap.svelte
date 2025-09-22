<script lang="ts">
	import { MODE_ELEVAGE } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();

	const modesActifs = MODE_ELEVAGE.filter(
		(m) => donneesEspece.modeElevage?.[m.id] != null,
	);
</script>

<div class="fr-table fr-table--lg">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell--multiline">
					<thead>
						<tr>
							<th>Mode d’élevage</th>
							<th class="fr-cell--right">Part de la production vendue</th>
						</tr>
					</thead>
					<tbody>
						{#each modesActifs as mode (mode.id)}
							<tr>
								<td>{mode.label}</td>

								<td class="fr-cell--right">
									{formatInt(donneesEspece.modeElevage?.[mode.id]?.part, "%")}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
