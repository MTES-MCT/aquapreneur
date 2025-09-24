<script lang="ts">
	import type { EspeceId } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap from "../[espece=espece]/elevage/recap.svelte";

	const {
		especeId,
		donneesEspece,
		annee,
	}: {
		especeId: EspeceId;
		donneesEspece: DonneesEspece;
		annee: number;
	} = $props();
</script>

<Recap {especeId} {donneesEspece} {annee}></Recap>
