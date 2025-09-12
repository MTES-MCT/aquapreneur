<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { ORIGINES_NAISSAIN } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		// TODO: marquer comme validé
		goto("../../recapitulatif");
	};
</script>

<div>
	<p class="fr-text--xl">
		Quelle est l’origine des {data.espece.label} en cours d’élevage ?
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				{#each ORIGINES_NAISSAIN as origine (origine.id)}
					{@const origineId = origine.id}
					<CheckboxGroup name={origineId} id={origineId} onCheck={() => {}}>
						{#snippet label()}{origine.label}{/snippet}
					</CheckboxGroup>
				{/each}
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>
