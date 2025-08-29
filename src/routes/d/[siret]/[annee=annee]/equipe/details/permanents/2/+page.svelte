<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { TYPES_DUREE_TRAVAIL } from "$lib/constants";
	import { submitDeclarationUpdate, toNumber } from "$lib/utils";

	const { data } = $props();

	const donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		// TODO: marquer comme validé
		goto("../../recapitulatif");
	};
</script>

<div>
	<p class="fr-text--xl">Combien d’hommes travaillent pour l’entreprise ?</p>
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
											<th style="min-width: 15rem">Type de contrat</th>
											<th>Homme salariée</th>
											<th>Homme non-salariée</th>
										</tr>
									</thead>
									<tbody>
										{#each TYPES_DUREE_TRAVAIL as duree (duree.id)}
											<tr>
												<td>{duree.label}</td>
												<td>
													<input
														class="fr-input"
														type="text"
														value={donnees.equipe.permanents!.hommes!.salarie![
															duree.id
														]}
														onchange={(v) =>
															(donnees.equipe.permanents!.hommes!.salarie![
																duree.id
															] = toNumber(v.currentTarget.value))}
													/>
												</td>
												<td>
													<input
														class="fr-input"
														type="text"
														value={donnees.equipe.permanents!.hommes!
															.nonSalarie![duree.id]}
														onchange={(v) =>
															(donnees.equipe.permanents!.hommes!.nonSalarie![
																duree.id
															] = toNumber(v.currentTarget.value))}
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
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>
