<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		title,
		href,
		children,
	}: {
		title: string;
		href: string;
		children: Snippet;
	} = $props();
</script>

<a
	title="{title} - ouvre une nouvelle fenêtre"
	{href}
	target="_blank"
	rel="noopener external"
>
	{@render children?.()}
</a>
