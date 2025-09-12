<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		inputs,
		legend,
		id,
		hasError = false,
	}: {
		inputs: Snippet<[string]>;
		legend?: Snippet;
		id?: string;
		hasError?: boolean;
	} = $props();

	const defaultId = $props.id();
	id = id ?? defaultId;
</script>

<fieldset
	class={["fr-fieldset", hasError && "fr-fieldset--error"]}
	{id}
	aria-labelledby="{id}-legend {id}-messages {id}-errors"
>
	{#if legend}
		<!-- TODO a11y : on veut sans doute rendre cette légende obligatoire
   quite à la réserver aux lecteurs d’écrans -->
		<legend id="{id}-legend" class="fr-fieldset__legend">
			{@render legend()}
		</legend>
	{/if}
	{@render inputs(id)}
</fieldset>
