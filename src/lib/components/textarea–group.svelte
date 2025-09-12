<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		label,
		errors,

		name,
		rows = 2,
		value = $bindable(),
	}: {
		label: Snippet;
		errors?: string[];

		name: string;
		rows: number;
		value?: string | null;
	} = $props();
	const id = $props.id();
</script>

<div class="fr-fieldset__element">
	<div class={["fr-input-group", errors && "fr-input-group--error"]}>
		<label class="fr-label" for={id}>
			{@render label()}
		</label>
		<textarea
			class="fr-input"
			aria-describedby="{id}-messages"
			aria-invalid={errors?.length ? "true" : undefined}
			{id}
			{name}
			{rows}
			bind:value
			autocomplete="off"
		></textarea>
	</div>
</div>
{#if errors?.length}
	<div class="fr-messages-group" id="{id}-messages" aria-live="polite">
		<p class="fr-message fr-message--error">{errors.join(", ")}</p>
	</div>
{/if}
