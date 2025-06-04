<script lang="ts">
	const {
		prevHref,
		nextHref,
		nextIsButton = false,
	}: {
		prevHref?: string;
		nextHref?: string;
		nextIsButton?: boolean;
	} = $props();

	let clicked = $state(false);
</script>

<div
	class="fr-mt-8w"
	style="display:flex; justify-content: {prevHref ? 'space-between' : (
		'flex-end'
	)};"
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
	{#if nextHref}
		<a
			href={nextHref}
			class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
			style="justify-self: end"
		>
			Suivant
		</a>
	{:else if nextIsButton}
		<button class="fr-btn" disabled={clicked} type="submit">Valider</button>
	{/if}
</div>
