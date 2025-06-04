<script lang="ts">
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Textareagroup from "$lib/components/textarea–group.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { enhanceNoInvalidate } from "$lib/utils";

	const context = getDeclarationContext();
</script>

<h1 class="fr-h2">
	Avez-vous des remarques ou suggestions concernant l’outil ?
</h1>
<form method="POST" use:enhanceNoInvalidate>
	<Fieldset>
		{#snippet inputs()}
			<Textareagroup
				name="suggestions-txt"
				rows={5}
				bind:value={context.suggestionsComment}
			>
				{#snippet label()}
					Si oui, merci de les décrire dans le champ ci-dessous :
				{/snippet}
			</Textareagroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="3" nextIsButton />
</form>
