<script lang="ts">
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();

	const affinage = donneesEspece.consommation?.affinage;
</script>

{#if affinage}
	<div class="fr-table fr-table--lg">
		<div class="fr-table__wrapper">
			<div class="fr-table__container">
				<div class="fr-table__content">
					<table class="fr-cell--multiline">
						<thead>
							<tr>
								<th>Type d’affinage</th>
								<th class="fr-cell--right">Part de la production vendue</th>
								<th class="fr-cell--right">Surface d’affinage</th>
							</tr>
						</thead>
						<tbody>
							{#if affinage.claires}
								<tr>
									<td>Affinage en claire</td>
									<td class="fr-cell--right">
										{formatInt(affinage.claires.part, "%")}
									</td>
									<td class="fr-cell--right">
										{formatInt(affinage.claires.surfaceHa, "ha")}
									</td>
								</tr>
							{/if}
							{#if affinage.parcs}
								<tr>
									<td>Affinage en parcs</td>
									<td class="fr-cell--right">
										{formatInt(affinage.parcs.part, "%")}
									</td>
									<td class="fr-cell--right">
										{formatInt(affinage.parcs.surfaceHa, "ha")}
									</td>
								</tr>
							{/if}
							{#if affinage.pousseClaire}
								<tr>
									<td>Pousse en claire</td>
									<td class="fr-cell--right">
										{formatInt(affinage.pousseClaire.part, "%")}
									</td>
									<td class="fr-cell--right">
										{formatInt(affinage.pousseClaire.surfaceHa, "ha")}
									</td>
								</tr>
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
{/if}
