<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";

	import type { Snippet } from "svelte";

	let {
		label,
		type,
		errors,
		min,
		max,
		value = $bindable(),
		required = false,
		actionButton,
		onChange,
	}: {
		label?: Snippet;
		type: "text" | "email" | "tel" | "number";
		errors?: string[];
		min?: number;
		max?: number;
		value?: number | string | null;
		required?: boolean;
		actionButton?: Snippet;
		onChange?: ChangeEventHandler<HTMLInputElement>;
	} = $props();
	const id = $props.id();
</script>

<div class="fr-fieldset__element">
	<div class={["fr-input-group", errors && "fr-input-group--error"]}>
		{#if label}
			<label class="fr-label" for={id}>
				{@render label()}
			</label>
		{/if}
		<div class:wbtn={!!actionButton} class="fr-mt-2v">
			<input
				class="fr-input"
				aria-describedby="{id}-messages"
				aria-invalid={errors?.length ? "true" : undefined}
				{type}
				{id}
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
{#if errors?.length}
	<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
		<p class="fr-message fr-message--error">{errors.join(", ")}</p>
	</div>
{/if}

<style>
	.wbtn {
		display: flex;
		column-gap: 1rem;
	}
</style>
