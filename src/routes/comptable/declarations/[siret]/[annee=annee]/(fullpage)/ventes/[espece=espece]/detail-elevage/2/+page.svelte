<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import {
		DESTINATIONS_ELEVAGE,
		type DESTINATIONS_ELEVAGE_ID,
		DESTINATIONS_ELEVAGE_IDS,
		STADES_ELEVAGE_IDS,
	} from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const v = dVentes(donnees, data.espece.id).elevage;
		console.log(checkboxStates);
		for (const key in checkboxStates) {
			const destId = key as DESTINATIONS_ELEVAGE_ID;
			STADES_ELEVAGE_IDS.filter((s) => v[s].active()).forEach((s) => {
				if (checkboxStates[destId]) {
					v[s].destination[destId].enable();
				} else {
					v[s].destination[destId].disable();
				}
			});
		}
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./3");
	};

	const handleCheck = (checked: boolean, id: DESTINATIONS_ELEVAGE_ID) => {
		checkboxStates[id] = checked;
	};

	const destinationActive = (destId: DESTINATIONS_ELEVAGE_ID) => {
		return STADES_ELEVAGE_IDS.some((s) =>
			dVentes(donnees, data.espece.id).elevage[s].destination?.[
				destId
			].active(),
		);
	};

	let checkboxStates: {
		[key: string]: boolean | undefined;
	} = Object.fromEntries(
		DESTINATIONS_ELEVAGE_IDS.map((destId) => [
			destId,
			destinationActive(destId),
		]),
	);
</script>

<div>
	<p class="fr-text--xl">
		<!-- TODO: gestion des pluriels -->
		Où ont été vendues les {data.espece.label} destinées à l’élevage ?
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}
				Vous pouvez sélectionner une ou plusieurs réponses.
			{/snippet}

			{#snippet inputs()}
				{#each DESTINATIONS_ELEVAGE as destination (destination.id)}
					{@const destId = destination.id}
					<CheckboxGroup
						name={destId}
						id={destId}
						checked={destinationActive(destId)}
						onCheck={(event) =>
							handleCheck(event.currentTarget.checked, destId)}
					>
						{#snippet label()}{destination.label}{/snippet}
					</CheckboxGroup>
				{/each}
			{/snippet}
		</Fieldset>

		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>
