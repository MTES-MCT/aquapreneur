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
	import { nestedSpaForm } from "$lib/form-utils.js";
	import { Percent } from "$lib/types";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const bio =
		data.declaration.donnees.ventes[data.espece.id]!.consommation?.bio;

	const schema = z.object({
		part: Percent.default(bio?.part ?? 0),
	});

	const { form, errors, enhance } = nestedSpaForm(defaults(zod4(schema)), {
		validators: zod4(schema),
		onUpdate: async ({ form }) => {
			if (form.valid) {
				try {
					merge(data.declaration.donnees.ventes, {
						[data.espece.id]: { consommation: { bio: form.data } },
					});
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
				goto("./3");
			}
		},
	});
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
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>

<FormDebug
	{form}
	{errors}
	data={data.declaration.donnees.ventes[data.espece.id]}
></FormDebug>
