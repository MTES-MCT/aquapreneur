<script lang="ts">
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

<div class="fr-table fr-table--lg">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell--multiline">
					<thead>
						<tr>
							<th>Certification</th>
							<th class="fr-cell--right">Part des ventes</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Part certifiée Agriculture biologique (AB)</td>
							<td class="fr-cell--right">
								{formatInt(donneesEspece.consommation?.bio?.part, "%")}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
