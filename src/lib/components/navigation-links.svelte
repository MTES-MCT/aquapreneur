<script lang="ts">
	const {
		prevHref,
		nextHref,
		nextIsButton = false,
		nextLabel = "Suivant",
		cantAnswerBtn = false,
	}: {
		prevHref?: string;
		nextHref?: string;
		nextLabel?: string;
		nextIsButton?: boolean;
		cantAnswerBtn?: boolean;
	} = $props();

	let clicked = $state(false);
</script>

<div
	class="fr-mt-8w"
	style="display:flex; justify-content: {prevHref ? 'space-between' : (
		'center'
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
	<div>
		{#if cantAnswerBtn}
			<button
				class="fr-btn fr-btn--secondary fr-mx-4v"
				disabled={clicked}
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
				{nextLabel}
			</a>
		{:else if nextIsButton}
			<button class="fr-btn" disabled={clicked} type="submit">Valider</button>
		{/if}
	</div>
</div>
