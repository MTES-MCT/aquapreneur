<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { QUARTIERS_IMMATRICULATION } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./3");
	};

	const zones = ["AC", "LR", "BL", "LS"];
</script>

<div>
	<p class="fr-text--xl">Quelle surface détenez-vous dans chaque zone ?</p>
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
											<th style="min-width: 20rem">Zone</th>
											<th>Surface détenue (ha)</th>
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
