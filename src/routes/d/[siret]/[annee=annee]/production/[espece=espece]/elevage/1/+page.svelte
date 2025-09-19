<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { STADES_ELEVAGE } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("./2");
	};

	const stades = [
		{ id: "captage", label: "Naissain – captage" },
		{ id: "ecloserieNurserie", label: "Naissain – écloserie/nurserie" },
		...STADES_ELEVAGE,
		{ id: "affinage", label: "Affinage" },
	];
</script>

<div>
	<p class="fr-text--xl">Quelle(s) phase(s) d’élevage réalisez-vous ?</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}
				Vous pouvez sélectionner une ou plusieurs réponses.
			{/snippet}
			{#snippet inputs()}
				{#each stades as stade (stade.id)}
					{@const stadeId = stade.id}
					<CheckboxGroup name={stadeId} id={stadeId} onCheck={() => {}}>
						{#snippet label()}{stade.label}{/snippet}
					</CheckboxGroup>
				{/each}
			{/snippet}
		</Fieldset>

		<NavigationLinks
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>
