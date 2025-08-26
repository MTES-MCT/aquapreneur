<script lang="ts">
	import SubNav from "$lib/components/subnav.svelte";

	let { children } = $props();
</script>

<SubNav>{@render children()}</SubNav>
