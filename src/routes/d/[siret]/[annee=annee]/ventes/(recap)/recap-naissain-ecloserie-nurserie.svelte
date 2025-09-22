<script lang="ts">
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap from "../[espece=espece]/naissain-ecloserie-nurserie/recap.svelte";

	const {
		donneesEspece,
	}: {
		donneesEspece: DonneesEspece;
	} = $props();
</script>

<Recap {donneesEspece}></Recap>
