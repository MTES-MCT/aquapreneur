<script lang="ts">
	import { TYPES_DUREE_TRAVAIL } from "$lib/constants";
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	const {
		permanents,
	}: {
		permanents: DeclarationSchema["equipe"]["permanents"];
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
							<th>Femme salariée</th>
							<th>Femme non-salariée</th>
						</tr>
					</thead>
					<tbody>
						{#each TYPES_DUREE_TRAVAIL as duree (duree.id)}
							<tr>
								<td>{duree.label}</td>
								<td>
									{permanents?.femmes?.salarie?.[duree.id]}
								</td>
								<td>
									{permanents?.femmes?.nonSalarie?.[duree.id]}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
