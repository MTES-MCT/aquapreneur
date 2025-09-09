<script lang="ts">
	import SuperDebug from "sveltekit-superforms";

	import { dev } from "$app/environment";

	const { form, errors, data } = $props();
</script>

{#if dev}
	<div class="fr-mt-5w">
		form
		<SuperDebug data={form} />
		errors
		<SuperDebug data={errors} />
		data
		<SuperDebug {data} />
	</div>
{/if}
