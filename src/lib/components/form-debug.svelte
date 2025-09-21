<script lang="ts">
	import isEmpty from "lodash/isEmpty";
	import SuperDebug from "sveltekit-superforms";

	import { env } from "$env/dynamic/public";

	import type { SuperFormErrors } from "sveltekit-superforms/client";

	const {
		form,
		errors,
		data,
	}: {
		form?: object | null;
		errors?: SuperFormErrors<Record<string, unknown>>;
		data?: object | null;
	} = $props();
</script>

{#if env.PUBLIC_DEBUG_FORM === "true"}
	<div class="fr-mt-5w">
		{#if errors != null && !isEmpty($errors)}
			<div
				class="fr-mb-2w"
				style="border: 2px solid red; padding: 8px; border-radius: 8px;"
			>
				<SuperDebug data={errors} status={false} label="erreurs" />
			</div>
		{/if}
		<div style="display: flex; width: 100%; gap: 1rem; ">
			<div style="flex: 1">
				<SuperDebug data={form} status={false} label="formulaire" />
			</div>
			<div style="flex: 1">
				<SuperDebug {data} status={false} label="BDD" />
			</div>
		</div>
	</div>
{/if}
