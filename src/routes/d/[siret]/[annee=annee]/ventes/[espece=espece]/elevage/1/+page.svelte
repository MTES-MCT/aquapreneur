<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { STADES_ELEVAGE, type STADES_ELEVAGE_ID } from "$lib/constants";
	import { dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("./2");
	};

	const handleCheck = (checked: boolean, id: STADES_ELEVAGE_ID) => {
		const v = dVentes(donnees, data.espece.id).elevage[id];
		if (checked) {
			v.enable();
		} else {
			v.disable();
		}
	};
</script>

<div>
	<p class="fr-text--xl">
		À quels stades d’élevage ont été vendues les {data.espece.label} ?
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}
				Vous pouvez sélectionner une ou plusieurs réponses.
			{/snippet}

			{#snippet inputs()}
				{#each STADES_ELEVAGE as stade (stade.id)}
					{@const stadeId = stade.id}
					<CheckboxGroup
						name={stadeId}
						id={stadeId}
						checked={dVentes(donnees, data.espece.id).elevage?.[
							stadeId
						].active()}
						onCheck={(event) =>
							handleCheck(event.currentTarget.checked, stadeId)}
					>
						{#snippet label()}{stade.label}{/snippet}
					</CheckboxGroup>
				{/each}
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./intro" nextIsButton cantAnswerBtn />
	</form>
</div>
