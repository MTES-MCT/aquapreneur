<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Textareagroup from "$lib/components/textarea–group.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./5");
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
				bind:value={donnees.commentaires.suggestions}
			>
				{#snippet label()}
					Si oui, merci de les décrire dans le champ ci-dessous :
				{/snippet}
			</Textareagroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="3" nextIsButton />
</form>
