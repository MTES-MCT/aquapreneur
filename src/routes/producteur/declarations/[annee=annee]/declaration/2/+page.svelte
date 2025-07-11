<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		donnees.etapes.concessionValidee = true;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./3");
	};
</script>

<h1 class="fr-h2">
	Avez-vous eu des événements exceptionnels au cours de l'année {data
		.declaration.annee} ?
</h1>

<p>
	Vous pouvez nous indiquer tout évènement pouvant expliquer des changements
	importants de votre production.
</p>
<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet inputs()}
			<TextareaGroup
				name="events-txt"
				rows={5}
				bind:value={donnees.commentaires.evnmtsExceptionnels}
			>
				{#snippet label()}Si oui, veuillez les préciser :{/snippet}
			</TextareaGroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
