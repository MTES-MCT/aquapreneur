<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { TYPES_CONTRAT } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils.js";
	import { PositiveInt } from "$lib/types";

	const { data } = $props();

	const hommes = data.declaration.donnees.equipe.saisonniers?.hommes;

	const schema = z.object({
		cdd: z.object({
			nbJours: PositiveInt.default(
				hommes?.cdd?.nbJours ?? (null as unknown as number),
			),
			nbPersonnes: PositiveInt.default(
				hommes?.cdd?.nbPersonnes ?? (null as unknown as number),
			),
		}),
		interim: z.object({
			nbJours: PositiveInt.default(
				hommes?.interim?.nbJours ?? (null as unknown as number),
			),
			nbPersonnes: PositiveInt.default(
				hommes?.interim?.nbPersonnes ?? (null as unknown as number),
			),
		}),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			isLastStep: () => true,
			getNextPage: () => "../../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionEquipe.saisonniers)) {
					data.progressionEquipe.saisonniers = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.declaration.donnees.equipe, {
					saisonniers: {
						hommes: form.data,
					},
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<div>
	<p class="fr-text--xl">
		Combien d’hommes saisonniers ont travaillé pour l’entreprise ?
	</p>
	<form method="POST" use:enhance>
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
											<th>Nombre total d’hommes</th>
											<th>Nombre total de jours travaillés</th>
										</tr>
									</thead>
									<tbody>
										{#each TYPES_CONTRAT as c (c.id)}
											<tr>
												<td>{c.label}</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form[c.id].nbPersonnes}
														errors={$errors?.[c.id]?.nbPersonnes}
													/>
												</td>
												<td>
													<InputGroup
														type="number"
														bind:value={$form[c.id].nbJours}
														errors={$errors?.[c.id]?.nbJours}
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
		<NavigationLinks
			prevHref="./1"
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>

<FormDebug
	{form}
	{errors}
	data={data.equipe.saisonniers}
	progression={data.progressionEquipe}
></FormDebug>
