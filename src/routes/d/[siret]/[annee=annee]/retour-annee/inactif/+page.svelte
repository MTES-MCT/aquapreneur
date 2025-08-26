<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./recapitulatif");
	};
</script>

<h1 class="fr-h3">
	Pourquoi n’avez-vous pas réalisé de ventes en {data.annee} ?
</h1>

<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet legend()}{/snippet}

		{#snippet inputs()}
			<TextareaGroup
				name="details"
				rows={4}
				bind:value={donnees.commentaires.raisonsInactivite}
			>
				{#snippet label()}Indiquez les raisons dans le champs ci-dessous :
				{/snippet}
			</TextareaGroup>{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton />
</form>
