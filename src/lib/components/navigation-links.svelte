<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		children,
		prevHref,
		nextHref,
		nextIsButton = false,
		nextLabel,
		cantAnswerBtn = false,
		center = false,
	}: {
		children?: Snippet;
		prevHref?: string;
		nextHref?: string;
		nextLabel?: string;
		nextIsButton?: boolean;
		cantAnswerBtn?: boolean;
		center?: boolean;
	} = $props();

	let clicked = $state(false);
</script>

{#if children}
	<div
		class="fr-mt-8w"
		style="display:flex; justify-content: {center ? 'center' : 'right'};"
	>
		{@render children()}
	</div>
{:else}
	<div
		class="fr-mt-8w"
		style="display:flex; flex-wrap: wrap; row-gap: 1rem; justify-content: {(
			prevHref
		) ?
			'space-between'
		: center ? 'center'
		: 'right'};"
	>
		{#if prevHref}
			<a
				href={prevHref}
				class="fr-link fr-icon-arrow-left-line fr-link--icon-left"
				style="justify-self: start; align-self: center;"
			>
				Précédent
			</a>
		{/if}
		<div
			style="display: flex; flex-wrap: wrap; row-gap: 0.5rem; column-gap: 1rem; justify-content: space-between"
		>
			{#if cantAnswerBtn}
				<button
					class="fr-btn fr-btn--secondary"
					disabled={clicked}
					name="cantAnswer"
					type="submit"
				>
					Je ne peux pas répondre
				</button>
			{/if}
			{#if nextHref}
				<a
					href={nextHref}
					class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
					style="justify-self: end"
				>
					{nextLabel || "Suivant"}
				</a>
			{:else if nextIsButton}
				<button name="validate" class="fr-btn" disabled={clicked} type="submit">
					{nextLabel || "Valider"}
				</button>
			{/if}
		</div>
	</div>
{/if}
