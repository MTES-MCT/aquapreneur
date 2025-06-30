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
		submitDeclarationContext(event, data.idDeclarationCourante, dc, "4");
	};
</script>

<h1 class="fr-h2">
	Avez-vous relevé des données erronées dans le formulaire ?
</h1>
<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet inputs()}
			<Textareagroup
				name="data-errors-txt"
				rows={5}
				bind:value={dc.commentaires.erreursFormulaire}
			>
				{#snippet label()}Décrivez les erreurs que vous avez constatées dans le
					formulaire :
				{/snippet}
			</Textareagroup>
		{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="2" nextIsButton />
</form>
