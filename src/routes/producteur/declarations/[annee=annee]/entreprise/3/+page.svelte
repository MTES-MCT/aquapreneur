<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	import ContactTable from "./contact-table.svelte";

	const { data } = $props();

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		donnees.etapes.entrepriseValidee = true;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("../concessions/");
	};
</script>

<h1 class="fr-h2">Comment vous contacter</h1>
<p>
	Merci de vérifier si vos coordonnées de contact sont exactes, et si besoin les
	corriger ou les compléter.
</p>
<form method="POST" onsubmit={handleSubmit}>
	<ContactTable bind:donnees editable></ContactTable>

	<NavigationLinks prevHref="./2" nextIsButton />
</form>
