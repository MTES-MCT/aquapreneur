<script lang="ts">
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap1 from "../[espece=espece]/origine/1/recap.svelte";
	import Recap2 from "../[espece=espece]/origine/2/recap.svelte";
	import Recap3 from "../[espece=espece]/origine/3/recap.svelte";
	import Recap4 from "../[espece=espece]/origine/4/recap.svelte";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

<Recap1 {donneesEspece}></Recap1>

<Recap2 {donneesEspece}></Recap2>

<Recap3 {donneesEspece}></Recap3>

<Recap4 {donneesEspece}></Recap4>
