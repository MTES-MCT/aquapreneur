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
		goto("./3");
	};
</script>

<div class="fr-stepper">
	<h1 class="fr-stepper__title">
		Avez-vous rencontré d’autres défis ou difficultés cette année ?
		<span class="fr-stepper__state">Question 2 sur 3</span>
	</h1>
	<div
		class="fr-stepper__steps"
		data-fr-current-step="2"
		data-fr-steps="3"
	></div>
	<p class="fr-stepper__details">
		<span class="fr-text--bold">Étape suivante :</span>
		Avez-vous des suggestions d’amélioration pour la prochaine enquête ?
	</p>
</div>

<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet legend()}{/snippet}

		{#snippet inputs()}
			<TextareaGroup
				name="details"
				bind:value={donnees.commentaires.difficultes}
				rows={4}
			>
				{#snippet label()}Si oui, merci de les décrire dans le champ ci-dessous{/snippet}
			</TextareaGroup>{/snippet}
	</Fieldset>

	<NavigationLinks prevHref="./1" nextIsButton />
</form>
