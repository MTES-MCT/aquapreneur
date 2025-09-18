<script lang="ts">
	import { type Snippet } from "svelte";

	let {
		label,
		headerLevel = "h3",
		id,
		onEdit,
		children,
	}: {
		label: string;
		icon: string;
		headerLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
		id?: string;
		onEdit: () => void;
		children: Snippet;
	} = $props();

	const defaultId = $props.id();
	id = id ?? defaultId;
</script>

<section>
	<div
		style="color: var(--text-default-grey)"
		class="header fr-text--sm fr-px-2w fr-py-1w fr-mb-3w"
	>
		<div class="" style="flex: 1">
			<svelte:element this={headerLevel} class="fr-text--sm fr-text--bold">
				{label}
			</svelte:element>
		</div>

		<button
			class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
			onclick={onEdit}
		>
			Modifier
		</button>
	</div>

	<div {id} class="fr-mb-6w">
		{@render children()}
	</div>
</section>

<style lang="postcss">
	.header {
		background-color: var(--background-alt-grey);
		--text-spacing: 0;
		--title-spacing: 0;
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		color: var(--text-action-high-blue-france);
		border-bottom: 1px solid #cecece;
	}
</style>
