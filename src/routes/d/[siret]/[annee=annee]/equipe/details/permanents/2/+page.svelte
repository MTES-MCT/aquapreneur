<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { TYPES_DUREE_TRAVAIL } from "$lib/constants";
	import { prepareForm, shouldUpdateStatus } from "$lib/form-utils";
	import { PositiveInt } from "$lib/types";

	const { data } = $props();

	const hommes = data.equipe.permanents?.hommes;

	const schema = z.object({
		salarie: z.object({
			tempsPlein: PositiveInt.default(
				hommes?.salarie?.tempsPlein ?? (null as unknown as number),
			),
			plusDunMiTemps: PositiveInt.default(
				hommes?.salarie?.plusDunMiTemps ?? (null as unknown as number),
			),
			miTemps: PositiveInt.default(
				hommes?.salarie?.miTemps ?? (null as unknown as number),
			),
			moinsDunMiTemps: PositiveInt.default(
				hommes?.salarie?.moinsDunMiTemps ?? (null as unknown as number),
			),
		}),
		nonSalarie: z.object({
			tempsPlein: PositiveInt.default(
				hommes?.nonSalarie?.tempsPlein ?? (null as unknown as number),
			),
			plusDunMiTemps: PositiveInt.default(
				hommes?.nonSalarie?.plusDunMiTemps ?? (null as unknown as number),
			),
			miTemps: PositiveInt.default(
				hommes?.nonSalarie?.miTemps ?? (null as unknown as number),
			),
			moinsDunMiTemps: PositiveInt.default(
				hommes?.nonSalarie?.moinsDunMiTemps ?? (null as unknown as number),
			),
		}),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => true,
			getNextPage: () => "../../recapitulatif",
			updateProgress: (statut) => {
				if (shouldUpdateStatus(data.progressionEquipe.permanents)) {
					data.progressionEquipe.permanents = statut;
				}
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.declaration.donnees.equipe, {
					permanents: {
						hommes: form.data,
					},
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<form method="POST" use:enhance>
	<Fieldset>
		{#snippet legend()}
			<h2 class="fr-h4">Combien d’hommes travaillent pour l’entreprise ?</h2>
		{/snippet}

		{#snippet inputs()}
			<div class="fr-table fr-table--lg">
				<div class="fr-table__wrapper">
					<div class="fr-table__container">
						<div class="fr-table__content">
							<table class="fr-cell">
								<thead>
									<tr style="cell-w:20rem">
										<th style="min-width: 15rem">Type de contrat</th>
										<th>Homme salarié</th>
										<th>Homme non-salarié</th>
									</tr>
								</thead>
								<tbody>
									{#each TYPES_DUREE_TRAVAIL as duree (duree.id)}
										<tr>
											<td>{duree.label}</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.salarie[duree.id]}
													errors={$errors?.salarie?.[duree.id]}
												/>
											</td>
											<td>
												<InputGroup
													type="number"
													bind:value={$form.nonSalarie[duree.id]}
													errors={$errors?.nonSalarie?.[duree.id]}
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

<FormDebug {form} {errors} data={data.equipe.permanents}></FormDebug>
