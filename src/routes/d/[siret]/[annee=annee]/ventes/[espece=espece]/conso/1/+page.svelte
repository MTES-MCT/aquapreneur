<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import {
		DESTINATIONS_VENTES_CONSO,
		type DestinationVenteConsoId,
	} from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		if (
			dVentes(donnees, data.espece.id).consommation.destination.france.active()
		) {
			goto("./2");
		} else {
			goto("./3");
		}
	};

	const handleCheck = (checked: boolean, id: DestinationVenteConsoId) => {
		const v = dVentes(donnees, data.espece.id).consommation.destination[id];
		if (checked) {
			v.enable();
		} else {
			v.disable();
		}
	};
</script>

<div>
	<p class="fr-text--xl">
		<!-- TODO: gestion des pluriels -->
		Où ont été vendues les {data.espece.label} destinées à la consommation ?
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}
				Vous pouvez sélectionner une ou plusieurs réponses.
			{/snippet}
			{#snippet inputs()}
				{#each DESTINATIONS_VENTES_CONSO as destination (destination.id)}
					{@const destId = destination.id}
					<CheckboxGroup
						name={destId}
						id={destId}
						checked={dVentes(
							donnees,
							data.espece.id,
						).consommation.destination?.[destId].active()}
						onCheck={(event) =>
							handleCheck(event.currentTarget.checked, destId)}
					>
						{#snippet label()}{destination.label}{/snippet}
					</CheckboxGroup>
				{/each}
			{/snippet}
		</Fieldset>

		<NavigationLinks
			prevHref="./intro"
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>
