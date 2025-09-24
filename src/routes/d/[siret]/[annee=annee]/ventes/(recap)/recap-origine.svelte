<script lang="ts">
	import type { EspeceId } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap1 from "../[espece=espece]/origine/1/recap.svelte";
	import Recap2 from "../[espece=espece]/origine/2/recap.svelte";
	import Recap3 from "../[espece=espece]/origine/3/recap.svelte";
	import Recap4 from "../[espece=espece]/origine/4/recap.svelte";

	const {
		especeId,
		donneesEspece,
	}: {
		especeId: EspeceId;
		donneesEspece: DonneesEspece;
	} = $props();
</script>

<Recap1 {donneesEspece}></Recap1>

<Recap2 {especeId} {donneesEspece}></Recap2>

<Recap3 {donneesEspece}></Recap3>

{#if especeId !== "mouleCommune"}
	<Recap4 {donneesEspece}></Recap4>
{/if}
