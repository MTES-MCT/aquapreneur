<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { prepareForm } from "$lib/form-utils";
	import { Percent, PositiveInt } from "$lib/types";

	const { data } = $props();

	const affinage =
		data.declaration.donnees.ventes[data.espece.id]!.consommation?.affinage;

	const schema = z.object({
		claires: z.object({
			part: Percent.default(affinage?.claires?.part ?? 0),
			surfaceHa: PositiveInt.default(affinage?.claires?.surfaceHa ?? 0),
		}),
		parcs: z.object({
			part: Percent.default(affinage?.parcs?.part ?? 0),
			surfaceHa: PositiveInt.default(affinage?.parcs?.surfaceHa ?? 0),
		}),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			isLastStep: () => false,
			getNextPage: () => "./2",
			updateProgress: () => {
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.declaration.donnees.ventes, {
					[data.espece.id]: { consommation: { affinage: form.data } },
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<div>
	<p class="fr-text--xl">
		Quelle part de la production a été affinée avant la vente ?
	</p>

	<form method="POST" use:enhance>
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
												<InputGroup
													type="number"
													bind:value={$form.claires.part}
													errors={$errors.claires?.part}
												></InputGroup>
											</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.parcs.part}
													errors={$errors.parcs?.part}
												></InputGroup>
											</td>
										</tr>

										<tr>
											<td>Surface d’affinage (ha)</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.claires.surfaceHa}
													errors={$errors.claires?.surfaceHa}
												></InputGroup>
											</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.parcs.surfaceHa}
													errors={$errors.parcs?.surfaceHa}
												></InputGroup>
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
		<NavigationLinks
			prevHref="./intro"
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>

<FormDebug
	{form}
	{errors}
	data={data.declaration.donnees.ventes[data.espece.id]}
	progression={data.declaration.donnees.progression}
></FormDebug>
