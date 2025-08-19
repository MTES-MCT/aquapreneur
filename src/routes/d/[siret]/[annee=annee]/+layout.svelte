<script lang="ts">
	import { type SlideParams, slide } from "svelte/transition";

	import { navigating, page } from "$app/state";

	let { children } = $props();

	function maybeSlide(
		node: Element,
		options: SlideParams & { shouldTransition: boolean },
	) {
		const previousDepth = navigating.from?.route?.id?.split("/").length ?? 0;
		const currentDepth = navigating.to?.route?.id?.split("/").length ?? 0;

		// TODO: transition dans l’autre sens
		if (options.shouldTransition && currentDepth > previousDepth) {
			return slide(node, options);
		}
		return {};
	}
</script>

{#key page.url.pathname}
	<div
		transition:maybeSlide={{
			axis: "y",
			shouldTransition: page.data.shouldTransition,
		}}
	>
		{@render children()}
	</div>
{/key}
