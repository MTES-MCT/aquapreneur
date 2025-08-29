<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { TYPES_CONTRAT } from "$lib/constants";
	import { submitDeclarationUpdate, toNumber } from "$lib/utils";

	const { data } = $props();

	const donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./2");
	};
</script>

<div>
	<p class="fr-text--xl">
		Combien de femmes saisonnières ont travaillé pour l’entreprise ?
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
											<th style="min-width: 15rem">Type de contrat</th>
											<th>Nombre total de femmes</th>
											<th>Nombre total de jours travaillés</th>
										</tr>
									</thead>
									<tbody>
										{#each TYPES_CONTRAT as c (c.id)}
											<tr>
												<td>{c.label}</td>
												<td>
													<input
														class="fr-input"
														type="text"
														value={donnees.equipe.saisonniers!.femmes![c.id]!
															.nbPersonnes}
														onchange={(v) =>
															(donnees.equipe.saisonniers!.femmes![
																c.id
															]!.nbPersonnes = toNumber(v.currentTarget.value))}
													/>
												</td>
												<td>
													<input
														class="fr-input"
														type="text"
														value={donnees.equipe.saisonniers!.femmes![c.id]!
															.nbJours}
														onchange={(v) =>
															(donnees.equipe.saisonniers!.femmes![
																c.id
															]!.nbJours = toNumber(v.currentTarget.value))}
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

		<NavigationLinks prevHref="../saisonniers" nextIsButton cantAnswerBtn />
	</form>
</div>
