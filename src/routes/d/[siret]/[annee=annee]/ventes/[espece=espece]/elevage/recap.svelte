<script lang="ts">
	import isEmpty from "lodash/isEmpty";

	import { DESTINATIONS_ELEVAGE, STADES_ELEVAGE } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatInt } from "$lib/utils";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();

	const stadesActifs = STADES_ELEVAGE.filter(
		(d) => !isEmpty(donneesEspece[d.id]?.destination),
	);

	const destActives = DESTINATIONS_ELEVAGE.filter((d) => {
		return stadesActifs.some(
			(s) => !isEmpty(donneesEspece[s.id]?.destination?.[d.id]),
		);
	});
	const destActivesIds = destActives.map((d) => d.id);
</script>

<div class="fr-table fr-table--lg">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell--multiline">
					<thead>
						<tr>
							<th>Stade d’élevage</th>
							<th class="fr-cell--right">Montant des ventes</th>
							<th class="fr-cell--right">Quantité</th>
						</tr>
					</thead>
					<tbody>
						{#if destActivesIds.includes("france")}
							<tr>
								<td
									colspan="3"
									class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
								>
									En France
								</td>
							</tr>
							{#each stadesActifs as stade (stade.id)}
								{@const dest = donneesEspece[stade.id]?.destination}
								{#if dest}
									<tr>
										<td>{stade.label}</td>
										<td class="fr-cell--right">
											{formatInt(dest.france?.valeurHT, "€")}
										</td>
										<td class="fr-cell--right">
											{formatInt(dest.france?.quantiteKg, "kg")}
										</td>
									</tr>
								{/if}
							{/each}
						{/if}
						{#if destActivesIds.includes("etranger")}
							<tr>
								<td
									colspan="3"
									class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
								>
									À l’étranger
								</td>
							</tr>
							{#each stadesActifs as stade (stade.id)}
								{@const dest = donneesEspece[stade.id]?.destination}
								{#if dest}
									<tr>
										<td>{stade.label}</td>
										<td class="fr-cell--right">
											{formatInt(dest.etranger?.valeurHT, "€")}
										</td>
										<td class="fr-cell--right">
											{formatInt(dest.etranger?.quantiteKg, "kg")}
										</td>
									</tr>
								{/if}
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
