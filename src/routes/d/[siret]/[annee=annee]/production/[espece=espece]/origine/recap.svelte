<script lang="ts">
	import isEmpty from "lodash/isEmpty";

	import { MODES_ELEVAGE, ORIGINES_NAISSAIN } from "$lib/constants";
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
														MODES_ELEVAGE.find((m) => m.id === key)?.label ??
														"",
												)
												.join(" / ")
										:	""}
								</td>
							</tr>
						{/if}
						{#if !isEmpty(donneesEspece?.origines)}
							<tr id="table-0-row-key-2" data-row-key="2">
								<th>Origine</th>
								<td>
									{donneesEspece
										.origines!.map(
											(oid) =>
												ORIGINES_NAISSAIN.find((o) => o.id === oid)?.label ??
												"",
										)
										.join(", ")}
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
