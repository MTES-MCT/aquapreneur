<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	const { data } = $props();
	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		submitDeclarationContext(event, data.idDeclarationCourante, dc, "3");
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
