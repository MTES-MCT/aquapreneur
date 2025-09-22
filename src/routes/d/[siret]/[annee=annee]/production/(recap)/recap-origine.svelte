<script lang="ts">
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap from "../[espece=espece]/origine/recap.svelte";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

<Recap {donneesEspece}></Recap>
