<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		content,
		header,
		headerAction,
		headerLevel = "h3",
		id,
	}: {
		header: Snippet;
		headerAction?: Snippet;
		content: Snippet;
		headerLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
		id?: string;
	} = $props();

	const defaultId = $props.id();
	id = id ?? defaultId;
</script>

<section class="fr-accordion">
	<svelte:element this={headerLevel} class="fr-accordion__title">
		{#if !headerAction}
			<button
				type="button"
				class="fr-accordion__btn"
				aria-expanded="false"
				aria-controls={id}
			>
				{@render header()}
			</button>
		{:else}
			<div class="fr-accordion__btn no-after">
				{@render header()}
				{@render headerAction()}
			</div>
		{/if}
	</svelte:element>
	<div {id} class="fr-collapse">
		<!-- données de l'accordéon -->
		{@render content()}
	</div>
</section>

<style>
	.no-after.fr-accordion__btn::after {
		content: none;
	}
</style>
