<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { DESTINATIONS_VENTES_CONSO_FRANCE } from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate, toNumber } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("../../recapitulatif");
	};

	let prevHref = $derived(
		dVentes(donnees, data.espece.id).consommation.destination.france.active() ?
			"./2"
		:	"./1",
	);
</script>

<div>
	<p class="fr-text--xl">Comment le chiffre d’affaires est-il réparti ?</p>

	<p>
		Renseignez le montant des ventes pour chaque destination, ainsi que la
		quantité lorsqu’elle est connue.
	</p>

	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<div class="fr-table fr-table--lg">
					<div class="fr-table__wrapper">
						<div class="fr-table__container">
							<div class="fr-table__content">
								<table class="fr-cell--multiline">
									<thead>
										<tr>
											<th>Destination</th>
											<th>
												Montant des ventes <span class="fr-text--regular">
													(€ HT)
												</span>
											</th>
											<th>
												Quantité <span class="fr-text--regular">(kg)</span>
											</th>
										</tr>
									</thead>
									<tbody>
										{#if dVentes(donnees, data.espece.id).consommation.destination?.france?.active()}
											<tr>
												<td
													colspan="3"
													class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
												>
													En France
												</td>
											</tr>
											{#each DESTINATIONS_VENTES_CONSO_FRANCE as destination (destination.id)}
												{#if dVentes(donnees, data.espece.id)
													.consommation.destination?.france?.detail(destination.id)
													?.active()}
													<!-- TODO. ajouter des getter/setter sur dVentes plutot que de
															 toucher directement à la structure -->
													{@const value =
														donnees.ventes[data.espece.id]!.consommation!
															.destination!.france![destination.id]!}
													<tr>
														<td>{destination.label}</td>
														<td>
															<input
																class="fr-input"
																type="text"
																value={value?.valeurHT}
																onchange={(v) =>
																	(value.valeurHT = toNumber(
																		v.currentTarget.value,
																	))}
																autocomplete="off"
															/>
														</td>
														<td>
															<input
																class="fr-input"
																disabled
																autocomplete="off"
															/>
														</td>
													</tr>
												{/if}
											{/each}
										{/if}
										{#if dVentes(donnees, data.espece.id).consommation.destination?.unionEuropeenne?.active() || dVentes(donnees, data.espece.id).consommation.destination?.horsUnionEuropeenne?.active()}
											<tr>
												<td
													colspan="3"
													class="fr-text--bold fr-icon-arrow-right-line fr-icon--sm"
												>
													À l’étranger
												</td>
											</tr>
											{#if dVentes(donnees, data.espece.id).consommation.destination?.unionEuropeenne?.active()}
												<!-- TODO. ajouter des getter/setter sur dVentes plutot que de
										   			 toucher directement à la structure -->
												{@const value =
													donnees.ventes[data.espece.id]!.consommation!
														.destination!.unionEuropeenne!}
												<tr>
													<td>Au sein de l’Union Européenne</td>
													<td>
														<input
															class="fr-input"
															type="text"
															value={value?.valeurHT}
															onchange={(v) =>
																(value.valeurHT = toNumber(
																	v.currentTarget.value,
																))}
															autocomplete="off"
														/>
													</td>
													<td>
														<input
															class="fr-input"
															disabled
															autocomplete="off"
														/>
													</td>
												</tr>
											{/if}
											{#if dVentes(donnees, data.espece.id).consommation.destination?.horsUnionEuropeenne?.active()}
												<!-- TODO. ajouter des getter/setter sur dVentes plutot que de
										   			 toucher directement à la structure -->
												{@const value =
													donnees.ventes[data.espece.id]!.consommation!
														.destination!.horsUnionEuropeenne!}
												<tr>
													<td>Hors de l’Union Européenne</td>
													<td>
														<input
															class="fr-input"
															type="text"
															value={value?.valeurHT}
															onchange={(v) =>
																(value.valeurHT = toNumber(
																	v.currentTarget.value,
																))}
															autocomplete="off"
														/>
													</td>
													<td>
														<input
															class="fr-input"
															disabled
															autocomplete="off"
														/>
													</td>
												</tr>
											{/if}
										{/if}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			{/snippet}
		</Fieldset>

		<NavigationLinks {prevHref} nextIsButton cantAnswerBtn />
	</form>
</div>
