<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate, toNumber } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./2");
	};

	// TODO La catégorie `affinage` a été validée à l’étape précédente ; on considère
	// pour l’instant qu’elle est bien définie, mais c’est fragile.
	// Même remarque pour les `input` du tableau.
	let d = $derived(donnees.ventes[data.espece.id]!.consommation!.affinage!);
</script>

<div>
	<p class="fr-text--xl">
		Quelle part de la production a été affinée avant la vente ?
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
											<th></th>
											<th>En claires</th>
											<th>En parcs</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												Part d’affinage (%) sur les quantités vendues à la
												consommation
											</td>
											<td>
												<input
													class="fr-input"
													type="text"
													value={d.claires!.part}
													onchange={(v) =>
														(d.claires!.part = toNumber(v.currentTarget.value))}
												/>
											</td>
											<td>
												<input
													class="fr-input"
													type="text"
													value={d.parcs!.part}
													onchange={(v) =>
														(d.parcs!.part = toNumber(v.currentTarget.value))}
												/>
											</td>
										</tr>

										<tr>
											<td>Surface d’affinage (ha)</td>
											<td>
												<input
													class="fr-input"
													type="text"
													value={d?.claires?.surfaceHa}
													onchange={(v) =>
														(d.claires!.surfaceHa = toNumber(
															v.currentTarget.value,
														))}
												/>
											</td>
											<td>
												<input
													class="fr-input"
													type="text"
													value={d.parcs?.surfaceHa}
													onchange={(v) =>
														(d.parcs!.surfaceHa = toNumber(
															v.currentTarget.value,
														))}
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			{/snippet}
		</Fieldset>

		<NavigationLinks prevHref="./intro" nextIsButton cantAnswerBtn />
	</form>
</div>
