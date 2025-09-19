<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { MODE_ELEVAGE } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("./2");
	};
	const groupes = [
		{
			id: "decouvrant",
			label: "Terrain découvrant ou semi-découvrant",
		},
		{
			id: "pleineMer",
			label: "Pleine mer",
		},
	];
</script>

<div>
	<p class="fr-text--xl">Quels mode d’élevage pratiquez-vous ?</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				{#each groupes as groupe (groupe.id)}
					<h3 class="fr-h5 fr-mt-4w">{groupe.label}</h3>

					{#each MODE_ELEVAGE.filter((m) => m.groupe === groupe.id && (m.especes == null || (m.especes as ReadonlyArray<string>).includes(data.espece.id))) as mode (mode.id)}
						{@const modeId = mode.id}
						<CheckboxGroup name={modeId} id={modeId} onCheck={() => {}}>
							{#snippet label()}{mode.label}{/snippet}
						</CheckboxGroup>
					{/each}
				{/each}
			{/snippet}
		</Fieldset>

		<NavigationLinks
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>
