<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ORIGINES_NAISSAIN } from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";
	import { submitDeclarationUpdate, toNumber } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(
		JSON.parse(JSON.stringify(data.declaration.donnees)),
	) as DeclarationSchema;

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		dVentes(donnees, data.espece.id).consommation.origineValidé = true;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("../../recapitulatif");
	};

	// TODO La catégorie `origine` a été validée dans ./intro ; on considère
	// pour l’instant qu’elle est bien définie, mais c’est fragile.
	let d = $derived(donnees.ventes[data.espece.id]!.consommation!.origine!);
</script>

<div>
	<p class="fr-text--xl">
		Quelle part des ventes à la consommation est issue du captage ou d’écloserie
		?
	</p>

	<p>
		Vous pouvez répondre en indiquant un montant ou un pourcentage sur les
		quantités vendues.
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
											<th>
												Pourcentage <span class="fr-text--regular">(%)</span>
											</th>
											<th>
												Montant des ventes <span class="fr-text--regular">
													(€ HT)
												</span>
											</th>
										</tr>
									</thead>
									<tbody>
										{#each ORIGINES_NAISSAIN as origine (origine.id)}
											<tr>
												<td>{origine.label}</td>
												<td><input class="fr-input" disabled /></td>
												<td>
													<input
														class="fr-input"
														type="text"
														value={d[origine.id]}
														onchange={(v) =>
															(d[origine.id] = toNumber(v.currentTarget.value))}
													/>
												</td>
											</tr>
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
