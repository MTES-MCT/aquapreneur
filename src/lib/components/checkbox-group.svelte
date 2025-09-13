<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import type { Snippet } from "svelte";

	let {
		label,
		name,
		id,
		checked,
		disabled,
		onCheck,
		small = false,
	}: {
		label: Snippet;
		name: string;
		id: string;
		checked?: boolean;
		disabled?: boolean;
		onCheck: FormEventHandler<HTMLInputElement>;
		small?: boolean;
	} = $props();
</script>

<div class={["fr-fieldset__element", small && "fr-checkbox-group--sm"]}>
	<div class="fr-checkbox-group">
		<input
			{id}
			{name}
			{checked}
			{disabled}
			type="checkbox"
			onchange={(event) => onCheck(event)}
			autocomplete="off"
		/>
		<label class="fr-label" for={id}>{@render label()}</label>
	</div>
</div>
