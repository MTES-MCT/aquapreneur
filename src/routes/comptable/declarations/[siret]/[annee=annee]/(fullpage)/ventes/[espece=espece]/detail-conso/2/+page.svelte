<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import {
		DESTINATION_VENTES_CONSO_FRANCE,
		type DESTINATION_VENTES_CONSO_FRANCE_ID,
	} from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
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

	const handleCheck = (
		checked: boolean,
		id: DESTINATION_VENTES_CONSO_FRANCE_ID,
	) => {
		const v = dVentes(
			donnees,
			data.espece.id,
		).consommation.destination.france.detail(id);
		if (checked) {
			v.enable();
		} else {
			v.disable();
		}
	};
</script>

<div>
	<p class="fr-text--xl">
		En France, quels ont été les circuits de distribution ?
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}
				Vous pouvez sélectionner une ou plusieurs réponses.
			{/snippet}

			{#snippet inputs()}
				{#each DESTINATION_VENTES_CONSO_FRANCE as destination (destination.id)}
					{@const destId = destination.id}
					<CheckboxGroup
						name={destId}
						id={destId}
						checked={dVentes(donnees, data.espece.id)
							.consommation.destination.france.detail(destId)
							.active()}
						onCheck={(event) =>
							handleCheck(event.currentTarget.checked, destId)}
					>
						{#snippet label()}{destination.label}{/snippet}
					</CheckboxGroup>
				{/each}
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./1" nextIsButton />
	</form>
</div>
