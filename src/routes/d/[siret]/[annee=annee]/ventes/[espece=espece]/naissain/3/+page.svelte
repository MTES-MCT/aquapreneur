<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ORIGINES_NAISSAIN, ORIGINES_NAISSAIN_IDS } from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";
	import { submitDeclarationUpdate, toNumber } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(
		JSON.parse(JSON.stringify(data.declaration.donnees)),
	) as DeclarationSchema;

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("../../recapitulatif");
	};

	const ventesFranceActives = () => {
		return ORIGINES_NAISSAIN_IDS.some((s) =>
			dVentes(donnees, data.espece.id).naissain[
				s
			].destination?.france?.active(),
		);
	};

	const ventesEtrangerActives = () => {
		return ORIGINES_NAISSAIN_IDS.some((s) =>
			dVentes(donnees, data.espece.id).naissain[
				s
			].destination?.etranger?.active(),
		);
	};
</script>

<div>
	<p class="fr-text--xl">Comment le chiffre d’affaires est-il réparti ?</p>

	<p>
		Indiquez le montant des ventes et le prix moyen pour chaque stade d’élevage.
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
											<th>Origine et ploïdie</th>
											{#if ventesFranceActives()}
												<th>
													Ventes en France
													<span class="fr-text--regular">(€ HT)</span>
												</th>
											{/if}
											{#if ventesEtrangerActives()}
												<th>
													Ventes à l’étranger
													<span class="fr-text--regular">(€ HT)</span>
												</th>
											{/if}
											<th>
												Prix moyen au kilo
												<span class="fr-text--regular">(€ HT)</span>
											</th>
										</tr>
									</thead>
									<tbody>
										{#each ORIGINES_NAISSAIN as origine (origine.id)}
											{#if dVentes(donnees, data.espece.id).naissain[origine.id].active()}
												{@const d =
													donnees.ventes[data.espece.id]!.naissain![origine.id]!
														.destination!}
												<tr>
													<td>{origine.label}</td>
													{#if ventesFranceActives()}
														<td>
															<input
																class="fr-input"
																type="text"
																value={d.france?.valeurHT}
																onchange={(v) =>
																	(d.france!.valeurHT = toNumber(
																		v.currentTarget.value,
																	))}
																autocomplete="off"
															/>
														</td>{/if}
													{#if ventesEtrangerActives()}
														<td>
															<input
																class="fr-input"
																type="text"
																value={d.etranger?.valeurHT}
																onchange={(v) =>
																	(d.etranger!.valeurHT = toNumber(
																		v.currentTarget.value,
																	))}
																autocomplete="off"
															/>
														</td>
													{/if}
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
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>{/snippet}
		</Fieldset>

		<NavigationLinks prevHref="./2" nextIsButton cantAnswerBtn />
	</form>
</div>
