<script lang="ts">
	import SuperDebug from "sveltekit-superforms";

	import { dev } from "$app/environment";

	const {
		form,
		errors,
		data,
		progression,
	}: {
		form?: object | null;
		errors?: object | null;
		data?: object | null;
		progression?: object | null;
	} = $props();
</script>

{#if dev}
	{#if progression}
		progression
		<SuperDebug data={progression} />
		<hr />
	{/if}
	<div class="fr-mt-5w">
		form
		<SuperDebug data={form} />
		errors
		<SuperDebug data={errors} />
		data
		<SuperDebug {data} />
	</div>
{/if}
