<script lang="ts">
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap from "../[espece=espece]/naissain-captage/recap.svelte";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

<Recap {donneesEspece}></Recap>
