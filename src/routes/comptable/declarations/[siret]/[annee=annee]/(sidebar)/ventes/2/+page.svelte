<script lang="ts">
	// import assert from "assert";
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ESPECES, type ESPECES_ID } from "$lib/constants";
	import { ventesParEspece } from "$lib/declaration-utils";
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

	const handleCheck = (checked: boolean, id: ESPECES_ID) => {
		const v = ventesParEspece(donnees, id);
		if (checked) {
			v.enable();
		} else {
			v.disable();
		}
	};
</script>

<h1 class="fr-h2">Ventes</h1>

<p class="fr-text--xl">Quelles espèces de coquillages avez-vous vendues ?</p>

<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet legend()}
			Vous pouvez sélectionner une ou plusieurs réponses.
		{/snippet}

		{#snippet inputs()}
			{#each ESPECES as espece (espece.id)}
				<CheckboxGroup
					name={espece.id}
					id={espece.id}
					checked={ventesParEspece(donnees, espece.id).active()}
					onCheck={(event) =>
						handleCheck(event.currentTarget.checked, espece.id)}
				>
					{#snippet label()}{espece.label}{/snippet}
				</CheckboxGroup>
			{/each}
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="./1" nextIsButton />
</form>
