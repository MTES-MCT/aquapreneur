<script lang="ts">
	import type { EspeceId } from "$lib/constants";
	import type { DonneesEspece } from "$lib/schemas/donnees-declaration-schema";

	import Recap from "../[espece=espece]/naissain-ecloserie-nurserie/recap.svelte";

	const {
		especeId,
		donneesEspece,
	}: {
		especeId: EspeceId;

		donneesEspece: DonneesEspece;
	} = $props();
</script>

<Recap {especeId} {donneesEspece}></Recap>
