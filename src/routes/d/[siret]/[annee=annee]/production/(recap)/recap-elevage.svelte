<script lang="ts">
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap from "../[espece=espece]/elevage/recap.svelte";

	const {
		donneesEspece,
		annee,
	}: {
		donneesEspece: DonneesEspece;
		annee: number;
	} = $props();
</script>

<Recap {donneesEspece} {annee}></Recap>
