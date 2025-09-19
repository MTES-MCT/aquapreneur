<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { prepareForm } from "$lib/form-utils.js";
	import { Percent } from "$lib/types";

	const { data } = $props();

	const bio =
		data.declaration.donnees.ventes[data.espece.id]!.consommation?.bio;

	const schema = z.object({
		part: Percent.default(bio?.part ?? 0),
	});

	const { form, errors, enhance } = prepareForm(
		{
			schema,
			persona: data.persona,
			isLastStep: () => false,
			getNextPage: () => "./3",
			updateProgress: () => {
				return data.declaration;
			},
			updateData: (form) => {
				merge(data.declaration.donnees.ventes, {
					[data.espece.id]: { consommation: { bio: form.data } },
				});
				return data.declaration;
			},
		},
		defaults(zod4(schema)),
	);
</script>

<div>
	<p class="fr-text--xl">Quelle part de la production est certifiée Bio ?</p>
	<form use:enhance>
		<Fieldset>
			{#snippet inputs()}
				<InputGroup
					type="number"
					bind:value={$form.part}
					errors={$errors?.part as string[]}
					required
				>
					{#snippet label()}Part certifiée Agriculture biologique (AB) (%)
						<span class="fr-hint-text">
							Sur les quantités vendues à la consommation
						</span>
					{/snippet}
				</InputGroup>
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
	data={data.declaration.donnees.ventes[data.espece.id]}
></FormDebug>
