<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	import ContactTable from "./contact-table.svelte";

	const { data } = $props();
	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		dc.etapes.entrepriseValidee = true;
		submitDeclarationContext(
			event,
			data.idDeclarationCourante,
			dc,
			"../concessions",
		);
	};
</script>

<h1 class="fr-h2">Comment vous contacter</h1>
<p>
	Merci de vérifier si vos coordonnées de contact sont exactes, et si besoin les
	corriger ou les compléter.
</p>
<form method="POST" onsubmit={handleSubmit}>
	<ContactTable editable></ContactTable>
	<NavigationLinks prevHref="2" nextIsButton />
</form>
