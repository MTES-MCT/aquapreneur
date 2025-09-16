<script lang="ts">
	import { type Snippet } from "svelte";

	import type { StatutProgression } from "$lib/schemas/declaration-schema";

	type RecapLineMode = "edit" | "review";

	let {
		label,
		icon,
		status,
		headerLevel = "h3",
		id,
		onEdit,
		children,
	}: {
		label: string;
		icon: string;
		status: StatutProgression;
		headerLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
		id?: string;
		onEdit: () => void;
		children: Snippet;
	} = $props();

	const defaultId = $props.id();
	id = id ?? defaultId;

	const colors = $derived.by(() => {
		switch (status) {
			case "en cours comptable":
			case "en cours producteur":
				return ["#FEF7DA", "#66673D"];
			case "validé comptable":
			case "validé producteur":
				return ["#ECECFE", "#6A6AF4"];
			case "passage producteur":
				return ["#ECECFE", "#6A6AF4"];
			default:
				return ["var(--background-alt-grey)", "var(--text-disabled-grey)"];
		}
	});

	const mode: RecapLineMode = $derived.by(() => {
		switch (status) {
			case "en cours comptable":
			case "en cours producteur":
				return "edit";
			case "validé comptable":
			case "validé producteur":
			case "passage producteur":
				return "review";
			default:
				return "edit";
		}
	});

	const currentIcon = $derived.by(() => {
		switch (status) {
			case "en cours comptable":
			case "en cours producteur":
				return "fr-icon-time-line";
			case "validé comptable":
			case "validé producteur":
				return "fr-icon-success-fill";
			case "passage producteur":
				return "fr-icon-error-warning-fill";
			default:
				return icon;
		}
	});

	let disclosed = $state(false);
</script>

{#snippet content()}
	<div
		class="fr-mr-2w"
		style="background-color: {colors[0]}; height: 3rem; width: 3.5rem; display: flex; align-items: center; justify-content: center;"
	>
		<span
			class="{currentIcon} fr-icon--sm"
			style="color: {colors[1]}; "
			aria-hidden="true"
		></span>
	</div>
	<div class="" style="flex: 1; color: var(--text-default-grey)">
		{label}
		{#if status === "en cours comptable" || status === "en cours producteur"}
			<span class="fr-text--xs fr-text--light">en cours</span>
		{/if}
	</div>

	{#if status === "passage producteur"}
		<p class="fr-badge fr-badge--sm fr-badge--blue-cumulus fr-mr-1w">
			Passage producteur attendu
		</p>
	{/if}

	{#if mode === "review" && disclosed}
		<button
			class="fr-btn fr-btn--sm fr-btn--secondary fr-mr-2w"
			onclick={onEdit}
		>
			Modifier
		</button>
	{/if}
{/snippet}

<section class="fr-accordion">
	<svelte:element this={headerLevel} class="fr-accordion__title">
		{#if mode === "review"}
			<button
				type="button"
				style="color: var(--text-default-grey)"
				class="fr-accordion__btn fr-p-0 fr-pr-2w fr-text--sm"
				aria-expanded="false"
				aria-controls={id}
				onclick={() => (disclosed = !disclosed)}
			>
				{@render content()}
			</button>
		{:else}
			<button
				type="button"
				style="color: var(--text-default-grey)"
				class="fr-accordion__btn fr-p-0 fr-pr-2w fr-text--sm fr-icon-arrow-right-line"
				aria-expanded="false"
				onclick={onEdit}
			>
				{@render content()}
			</button>
		{/if}
	</svelte:element>

	<div {id} class="fr-collapse">
		{@render children()}
	</div>
</section>
