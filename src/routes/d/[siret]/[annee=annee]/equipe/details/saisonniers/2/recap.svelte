<script lang="ts">
	import { TYPES_CONTRAT } from "$lib/constants";
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	const {
		saisonniers,
	}: {
		saisonniers: DeclarationSchema["equipe"]["saisonniers"];
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
							<th>Nombre total d’hommes</th>
							<th>Nombre total de jours travaillés</th>
						</tr>
					</thead>
					<tbody>
						{#each TYPES_CONTRAT as c (c.id)}
							<tr>
								<td>{c.label}</td>
								<td>
									{saisonniers?.hommes?.[c.id]?.nbPersonnes}
								</td>
								<td>
									{saisonniers?.hommes?.[c.id]?.nbJours}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
