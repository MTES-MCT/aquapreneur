<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		inputs,
		legend,
		id,
	}: {
		inputs: Snippet<[string]>;
		legend?: Snippet;
		id?: string;
	} = $props();

	const defaultId = $props.id();
	id = id ?? defaultId;
</script>

<fieldset class="fr-fieldset" {id} aria-labelledby="{id}-legend {id}-messages">
	{#if legend}
		<!-- TODO a11y : on veut sans doute rendre cette légende obligatoire
   quite à la réserver aux lecteurs d’écrans -->
		<legend id="{id}-legend" class="fr-fieldset__legend">
			{@render legend()}
		</legend>
	{/if}
	{@render inputs(id)}

	<div class="fr-messages-group" id="{id}-messages" aria-live="polite"></div>
</fieldset>
