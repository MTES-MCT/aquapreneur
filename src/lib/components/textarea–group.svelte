<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		label,
		name,
		rows = 2,
		value = $bindable(),
	}: {
		label: Snippet;
		name: string;
		rows: number;
		value?: string | null;
	} = $props();
	const id = $props.id();
</script>

<div class="fr-fieldset__element">
	<div class="fr-input-group">
		<label class="fr-label" for={id}>
			{@render label()}
		</label>
		<textarea class="fr-input" {id} {name} {rows} bind:value></textarea>
	</div>
</div>
