<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";

	import type { Snippet } from "svelte";

	let {
		label,
		name,
		id,
		inline = false,
		checked,
		defaultChecked,
		disabled,
		required = false,
		value,
		group = $bindable(),
		onChange,
	}: {
		label: Snippet;
		name: string;
		id: string;
		inline: boolean;
		checked?: boolean;
		defaultChecked?: boolean;
		disabled?: boolean;
		required?: boolean;
		value?: string | boolean;
		group?: string | boolean;
		onChange?: ChangeEventHandler<HTMLInputElement>;
	} = $props();
</script>

<div
	class="fr-fieldset__element {inline ? 'fr-fieldset__element--inline' : ''}"
>
	<div class="fr-radio-group">
		<input
			type="radio"
			class="fr-input"
			{id}
			{name}
			{checked}
			{disabled}
			{value}
			{required}
			{defaultChecked}
			bind:group
			autocomplete="off"
			onchange={onChange}
		/>
		<label class="fr-label" for={id}>
			{@render label()}
		</label>
	</div>
</div>
