<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		input,
		label,
		small = false,
	}: {
		input: Snippet<[string]>;
		label: Snippet;
		small?: boolean;
	} = $props();
	const id = $props.id();
</script>

<div class={["fr-fieldset__element", small && "fr-checkbox-group--sm"]}>
	<div class="fr-checkbox-group">
		{@render input(id)}
		<label class="fr-label" for={id}>{@render label()}</label>
		<div
			class="fr-messages-group"
			id="checkbox-1-messages"
			aria-live="polite"
		></div>
	</div>
</div>
