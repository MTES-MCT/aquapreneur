<script lang="ts">
	import { STADES_ELEVAGE } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";
	import { formatNum } from "$lib/utils";

	const {
		donneesEspece,
		annee,
	}: {
		donneesEspece: DonneesEspece;
		annee: number;
	} = $props();

	const isNaissain = (id: string) =>
		id === "naissainCaptage" || id === "naissainEcloserieNurserie";

	const stades = [
		{ id: "naissainCaptage", label: "Naissain – captage" },
		{ id: "naissainEcloserieNurserie", label: "Naissain – écloserie/nurserie" },
		...STADES_ELEVAGE,
		{ id: "consommation", label: "Taille marchande" },
	] as const;

	const stadesActifs = stades.filter((s) => donneesEspece[s.id] != null);
	const stadesActifsIds = stadesActifs.map((s) => s.id);

	const data = Object.fromEntries(
		stadesActifsIds.map((id) => [
			id,
			isNaissain(id) ?
				{
					// TODO: gérer les moules
					stockN: donneesEspece[id]?.stock?.stockMilliers,
					stockNmoins1: donneesEspece[id]?.stock?.stockNmoins1milliers,
				}
			:	{
					stockN: donneesEspece[id]?.stock?.stockKg,
					stockNmoins1: donneesEspece[id]?.stock?.stockNmoins1kg,
				},
		]),
	);
</script>

<div class="fr-table fr-table--sm">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell--multiline">
					<thead>
						<tr>
							<th>Stade d’élevage</th>
							<th class="fr-cell--right">Stock au 30 juin {annee - 1}</th>
							<th class="fr-cell--right">Stock au 1er juin {annee}</th>
						</tr>
					</thead>
					<tbody>
						{#each stadesActifs as stade (stade.id)}
							{@const nMoins1 = data[stade.id].stockNmoins1}
							{@const n = data[stade.id].stockN}
							{#if nMoins1 || n}
								<tr>
									<td>
										{stade.label}
									</td>
									<td class="fr-cell--right">
										{#if nMoins1}
											<!--  TODO: gérer les moules -->
											{formatNum(
												nMoins1,
												isNaissain(stade.id) ? "millier(s)" : "kg",
											)}
										{/if}
									</td>
									<td class="fr-cell--right">
										{#if n}
											{formatNum(n, isNaissain(stade.id) ? "millier(s)" : "kg")}
										{/if}
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
