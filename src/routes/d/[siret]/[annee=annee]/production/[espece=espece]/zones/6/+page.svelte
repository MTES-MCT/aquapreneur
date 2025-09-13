<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { QUARTIERS_IMMATRICULATION } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		// TODO: marquer comme validé
		goto("../../recapitulatif");
	};
	const zones = ["AC", "LR", "BL", "LS"];
</script>

<div>
	<p class="fr-text--xl">
		Où a été réalisé l’élevage jusqu’à la taille marchande ?
	</p>
	<p>
		Au 1er juin {data.annee}, vous aviez
		<strong>TODO</strong>
		kilos d’huître creuse au stade d’élevage jusqu’à la taille marchande. Veuillez
		indiquer la part du stock présente chaque zone, et les pertes estimées au cours
		de l’année. La somme des parts du stock doit être égale à 100 %.
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<div class="fr-table fr-table--lg">
					<div class="fr-table__wrapper">
						<div class="fr-table__container">
							<div class="fr-table__content">
								<table class="fr-cell">
									<thead>
										<tr style="cell-w:20rem">
											<th style="min-width: 15rem">Zone</th>
											<th>Part du stock (%)</th>
											<th>Pertes estimées (%)</th>
										</tr>
									</thead>
									<tbody>
										{#each QUARTIERS_IMMATRICULATION.filter( (q) => zones.includes(q.code), ) as q (q.code)}
											<tr>
												<td>{q.nom}</td>
												<td>
													<input
														class="fr-input"
														type="text"
														autocomplete="off"
													/>
												</td>
												<td>
													<input
														class="fr-input"
														type="text"
														autocomplete="off"
													/>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./5" nextIsButton cantAnswerBtn />
	</form>
</div>
