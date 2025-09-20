<script lang="ts">
	import { TYPES_DUREE_TRAVAIL } from "$lib/constants";
	import type { DonneesDeclaration } from "$lib/schemas/donnees-declaration-schema";

	const {
		permanents,
	}: {
		permanents: DonneesDeclaration["equipe"]["permanents"];
	} = $props();
</script>

<div class="fr-table fr-table--lg">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table class="fr-cell">
					<thead>
						<tr style="cell-w:20rem">
							<th style="min-width: 15rem">Type de contrat</th>
							<th>Homme salarié</th>
							<th>Homme non-salarié</th>
						</tr>
					</thead>
					<tbody>
						{#each TYPES_DUREE_TRAVAIL as duree (duree.id)}
							<tr>
								<td>{duree.label}</td>
								<td>
									{permanents?.hommes?.salarie?.[duree.id]}
								</td>
								<td>
									{permanents?.hommes?.nonSalarie?.[duree.id]}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
