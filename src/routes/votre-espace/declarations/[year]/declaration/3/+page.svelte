<script lang="ts">
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Textareagroup from "$lib/components/textarea–group.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { enhanceNoInvalidate } from "$lib/utils";

	const context = getDeclarationContext();
</script>

<h1 class="fr-h2">
	Avez-vous relevé des données erronées dans le formulaire ?
</h1>
<form method="POST" use:enhanceNoInvalidate>
	<Fieldset>
		{#snippet inputs()}
			<Textareagroup
				name="data-errors-txt"
				rows={5}
				bind:value={context.formErreursComment}
			>
				{#snippet label()}Décrivez les erreurs que vous avez constatées dans le
					formulaire :
				{/snippet}
			</Textareagroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="2" nextIsButton />
</form>
