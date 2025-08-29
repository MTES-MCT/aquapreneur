<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";

	import type { Snippet } from "svelte";

	let {
		label,
		type,
		name,
		min,
		max,
		value = $bindable(),
		fieldsetId,
		required,
		actionButton,
		onChange,
	}: {
		label: Snippet;
		type: "text" | "email" | "tel" | "number";
		name: string;
		min?: number;
		max?: number;
		value?: number | string | null;
		fieldsetId: string;
		required?: boolean;
		actionButton?: Snippet;
		onChange?: ChangeEventHandler<HTMLInputElement>;
	} = $props();
	const id = $props.id();
</script>

<div class="fr-fieldset__element">
	<div class="fr-input-group">
		<label class="fr-label" for={id}>
			{@render label()}
		</label>
		<div class:wbtn={!!actionButton} class="fr-mt-2v">
			<input
				class="fr-input"
				aria-describedby="{fieldsetId}-messages"
				{type}
				{id}
				{name}
				bind:value
				{required}
				{min}
				{max}
				onchange={onChange}
				autocomplete="off"
			/>
			{#if actionButton}
				{@render actionButton()}
			{/if}
		</div>
	</div>
</div>

<style>
	.wbtn {
		display: flex;
		column-gap: 1rem;
	}
</style>
