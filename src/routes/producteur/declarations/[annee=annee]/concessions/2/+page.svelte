<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
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
</script>

<h1 class="fr-h2">
	Avez-vous effectué des changements sur vos concessions depuis l'année
	dernière ?
</h1>

<p>
	Cela concerne tout changement ayant un impact sur l’usage de vos concessions.
	Par exemple : changement d’activité sur une zone, remplacement de tables par
	des filières en mer, extension d’une concession, arrêt de l’exploitation d’une
	concession…
</p>

<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet inputs()}
			<RadioGroup name="radio-inline" id="radio-oui" checked inline>
				{#snippet label()}Oui{/snippet}
			</RadioGroup>

			<RadioGroup name="radio-inline" id="radio-non" disabled inline>
				{#snippet label()}Non{/snippet}
			</RadioGroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
