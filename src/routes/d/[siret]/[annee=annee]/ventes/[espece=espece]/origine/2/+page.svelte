<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { Percent, PositiveInt } from "$lib/types";

	const { data } = $props();

	merge(data.donneesEspece, { consommation: {} });

	const affinage = data.donneesEspece.consommation!.affinage;

	const schema = z.object({
		claires: z.object({
			part: Percent,
			surfaceHa: PositiveInt,
		}),
		parcs: z.object({
			part: Percent,
			surfaceHa: PositiveInt,
		}),
		pousseClaire: z.object({
			part: Percent,
			surfaceHa: PositiveInt,
		}),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./3",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionVentesEspece.origine)) {
					data.progressionVentesEspece.origine = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.declaration.donnees.especes, {
					[data.espece.id]: { consommation: { affinage: form.data } },
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);

	$form = {
		claires: {
			part: affinage?.claires?.part as unknown as number,
			surfaceHa: affinage?.claires?.surfaceHa as unknown as number,
		},
		parcs: {
			part: affinage?.parcs?.part as unknown as number,
			surfaceHa: affinage?.parcs?.surfaceHa as unknown as number,
		},
		pousseClaire: {
			part: affinage?.pousseClaire?.part as unknown as number,
			surfaceHa: affinage?.pousseClaire?.surfaceHa as unknown as number,
		},
	};
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4">
				Quelle part de la production a été affinée avant la vente ?
			</h2>
		{/snippet}

		{#snippet inputs()}
			<div class="fr-table fr-table--lg">
				<div class="fr-table__wrapper">
					<div class="fr-table__container">
						<div class="fr-table__content">
							<table class="fr-cell--multiline">
								<thead>
									<tr>
										<th>Type d’affinage</th>
										<th>Part de la production vendue (%)</th>
										<th>Surface d’affinage (ha)</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Affinage en claire</td>
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
												bind:value={$form.claires.surfaceHa}
												errors={$errors.claires?.surfaceHa}
											></InputGroup>
										</td>
									</tr>

									<tr>
										<td>Affinage en parcs</td>
										<td>
											<InputGroup
												type="number"
												bind:value={$form.parcs.part}
												errors={$errors.parcs?.part}
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

									<tr>
										<td>Pousse en claire</td>
										<td>
											<InputGroup
												type="number"
												bind:value={$form.pousseClaire.part}
												errors={$errors.pousseClaire?.part}
											></InputGroup>
										</td>
										<td>
											<InputGroup
												type="number"
												bind:value={$form.pousseClaire.surfaceHa}
												errors={$errors.pousseClaire?.surfaceHa}
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
		prevHref="./1"
		nextIsButton
		cantAnswerBtn={data.persona === "comptable"}
	/>
</form>

<FormDebug {form} {errors} data={data.donneesEspece.consommation!.affinage}
></FormDebug>
