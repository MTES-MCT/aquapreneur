<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { STADES_ELEVAGE } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { PositiveInt } from "$lib/types";

	const { data } = $props();

	const isNaissain = (id: string) =>
		id === "naissainCaptage" || id === "naissainEcloserieNurserie";

	const stades = [
		{ id: "naissainCaptage", label: "Naissain – captage" },
		{ id: "naissainEcloserieNurserie", label: "Naissain – écloserie/nurserie" },
		...STADES_ELEVAGE,
		{ id: "consommation", label: "Taille marchande" },
	] as const;

	const stadesActifs = stades.filter((s) => data.donneesEspece[s.id] != null);
	const stadesActifsIds = stadesActifs.map((s) => s.id);

	const schema = z.object({
		data: z.record(
			z.enum(stadesActifsIds),
			z.object({
				stockN: PositiveInt,
				stockNmoins1: PositiveInt,
			}),
		),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "../../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionProdEspece.elevage)) {
					data.progressionProdEspece.elevage = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				stadesActifsIds.forEach((id) =>
					merge(data.donneesEspece, {
						[id]: {
							stock:
								// TODO: gérer les moules
								isNaissain(id) ?
									{
										stockMilliers: form.data.data[id].stockN,
										stockNmoins1milliers: form.data.data[id].stockNmoins1,
									}
								:	{
										stockKg: form.data.data[id].stockN,
										stockNmoins1kg: form.data.data[id].stockNmoins1,
									},
						},
					}),
				);

				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	// @ts-expect-error typage à revoir
	$form.data = Object.fromEntries(
		stadesActifsIds.map((id) => [
			id,
			isNaissain(id) ?
				{
					// TODO: gérer les moules
					stockN: data.donneesEspece[id]?.stock?.stockMilliers,
					stockNmoins1: data.donneesEspece[id]?.stock?.stockNmoins1milliers,
				}
			:	{
					stockN: data.donneesEspece[id]?.stock?.stockKg,
					stockNmoins1: data.donneesEspece[id]?.stock?.stockNmoins1kg,
				},
		]),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4 fr-mb-1w">
				Quels étaient vos volumes en stock au cours de l’année passée ?
			</h2>

			<p class="fr-text--light fr-text--sm">
				Indiquez la quantité pour chaque stade d’élevage.
			</p>
		{/snippet}

		{#snippet inputs()}
			<div class="fr-table fr-table--lg">
				<div class="fr-table__wrapper">
					<div class="fr-table__container">
						<div class="fr-table__content">
							<table class="fr-cell--multiline">
								<thead>
									<tr>
										<th>Stade d’élevage</th>
										<th>Stock au 30 juin {data.annee - 1}</th>
										<th>Stock au 1er juin {data.annee}</th>
									</tr>
								</thead>
								<tbody>
									{#each stadesActifs as stade (stade.id)}
										{#if stade.id !== "consommation" || data.donneesEspece.consommation?.stock?.stockKg || data.donneesEspece.consommation?.stock?.stockNmoins1kg}
											<tr>
												<td>
													{stade.label}
													<span class="fr-text--light fr-text--xs">
														<!-- TODO: gérer les moules -->
														({isNaissain(stade.id) ? "milliers" : "kg"})
													</span>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.data[stade.id].stockNmoins1}
														errors={$errors?.data?.[stade.id]?.stockNmoins1}
													/>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form.data[stade.id].stockN}
														errors={$errors?.data?.[stade.id]?.stockN}
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
			</div>
		{/snippet}
	</Fieldset>

	<NavigationLinks
		prevHref="./1"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug form={$form.data} {errors} data={data.donneesEspece}></FormDebug>
