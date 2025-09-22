<script lang="ts">
	import isEmpty from "lodash/isEmpty";

	import { MODE_ELEVAGE } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

<div class="fr-table" id="table-0-component">
	<div class="fr-table__wrapper">
		<div class="fr-table__container">
			<div class="fr-table__content">
				<table id="table-0">
					<tbody>
						{#if !isEmpty(donneesEspece.modeElevage)}
							<tr id="table-0-row-key-1" data-row-key="1">
								<th>Mode d’élevage</th>
								<td>
									{donneesEspece.modeElevage ?
										Object.entries(donneesEspece.modeElevage)
											.filter(([_key, value]) => !!value)
											.map(
												([key, _value]) =>
													MODE_ELEVAGE.find((m) => m.id === key)?.label ?? "",
											)
											.join(" / ")
									:	""}
								</td>
							</tr>
						{/if}
						{#if !isEmpty(donneesEspece.consommation?.origine)}
							<tr id="table-0-row-key-2" data-row-key="2">
								<th>Origine</th>
								<td>
									<!-- TODO : à vérifier après branchement -->
									{donneesEspece.consommation?.origine ?
										Object.entries(donneesEspece.consommation.origine)
											.filter(([_key, value]) => !isEmpty(value))
											.map(
												([key, _value]) => key,
												//MODE_ELEVAGE.find((m) => m.id === key)?.label ?? "",
											)
											.join(" / ")
									:	""}
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
