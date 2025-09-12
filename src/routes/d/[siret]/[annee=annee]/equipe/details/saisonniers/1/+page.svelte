<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { TYPES_CONTRAT } from "$lib/constants";
	import { nestedSpaForm } from "$lib/form-utils.js";
	import { PositiveInt } from "$lib/types";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	// TODO : à remplacer par une version mettant les types à jour.
	merge(data.declaration.donnees.equipe, {
		saisonniers: {
			femmes: { cdd: {}, interim: {} },
		},
	});

	const femmes = data.declaration.donnees.equipe.saisonniers!.femmes!;

	const schema = z.object({
		cdd: z.object({
			nbJours: PositiveInt.default(
				femmes.cdd!.nbJours ?? (null as unknown as number),
			),
			nbPersonnes: PositiveInt.default(
				femmes.cdd!.nbPersonnes ?? (null as unknown as number),
			),
		}),
		interim: z.object({
			nbJours: PositiveInt.default(
				femmes.interim!.nbJours ?? (null as unknown as number),
			),
			nbPersonnes: PositiveInt.default(
				femmes.interim!.nbPersonnes ?? (null as unknown as number),
			),
		}),
	});

	const { form, errors, enhance } = nestedSpaForm(defaults(zod4(schema)), {
		validators: zod4(schema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					merge(femmes, { ...form.data });
					data.declaration.donnees = await submitDeclarationUpdate(
						data.declaration.id,
						data.declaration.donnees,
					);
				} catch (err) {
					console.error(err);
				}
			}
		},
		onUpdated({ form }) {
			if (form.valid) {
				goto("./2");
			}
		},
	});
</script>

<div>
	<p class="fr-text--xl">
		Combien de femmes saisonnières ont travaillé pour l’entreprise ?
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
											<th>Nombre total de femmes</th>
											<th>Nombre total de jours travaillés</th>
										</tr>
									</thead>
									<tbody></tbody>
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

		<NavigationLinks prevHref="../saisonniers" nextIsButton cantAnswerBtn />
	</form>
</div>

<FormDebug {form} {errors} data={data.declaration.donnees.equipe}></FormDebug>
