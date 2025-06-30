<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	const { data } = $props();

	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		dc.etapes.concessionValidee = true;
		submitDeclarationContext(event, data.idDeclarationCourante, dc, "3");
	};
</script>

<h1 class="fr-h2">
	Avez-vous eu des événements exceptionnels au cours de l'année {data.year} ?
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
				bind:value={dc.commentaires.evnmtsExceptionnels}
			>
				{#snippet label()}Si oui, veuillez les préciser :{/snippet}
			</TextareaGroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
