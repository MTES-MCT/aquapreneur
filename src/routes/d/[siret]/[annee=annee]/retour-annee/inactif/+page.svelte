<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const getNextPage = () => {
		// TODO
		return "./2";
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto(getNextPage());
	};
</script>

<h1 class="fr-h2">Retours sur l’année</h1>

<p class="fr-text--lead">
	Pourquoi n’avez-vous pas réalisé de ventes en 2024 ?
</p>

<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet legend()}{/snippet}

		{#snippet inputs()}{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton />
</form>
