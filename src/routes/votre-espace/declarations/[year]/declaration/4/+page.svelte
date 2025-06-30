<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Textareagroup from "$lib/components/textarea–group.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	const { data } = $props();
	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		submitDeclarationContext(event, data.idDeclarationCourante, dc, "5");
	};
</script>

<h1 class="fr-h2">
	Avez-vous des remarques ou suggestions concernant l’outil ?
</h1>
<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet inputs()}
			<Textareagroup
				name="suggestions-txt"
				rows={5}
				bind:value={dc.commentaires.suggestions}
			>
				{#snippet label()}
					Si oui, merci de les décrire dans le champ ci-dessous :
				{/snippet}
			</Textareagroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="3" nextIsButton />
</form>
