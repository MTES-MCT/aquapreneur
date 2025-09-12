<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		input,
		label,
		small = false,
		inline = false,
	}: {
		input: Snippet<[string]>;
		label: Snippet;
		small?: boolean;
		inline: boolean;
	} = $props();
	const id = $props.id();
</script>

<div
	class={[
		"fr-fieldset__element",
		inline && "fr-fieldset__element--inline",
		small && "fr-checkbox-group--sm",
	]}
>
	<div class="fr-radio-group">
		{@render input(id)}
		<label class="fr-label" for={id}>{@render label()}</label>
		<div
			class="fr-messages-group"
			id="radio-{id}-messages"
			aria-live="polite"
		></div>
	</div>
</div>
