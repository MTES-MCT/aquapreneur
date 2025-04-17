<script lang="ts">
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import { enhanceNoInvalidate } from '$lib/utils';

  import BilanTable from './bilan-table.svelte';

  let { data } = $props();
</script>

<h1 class="fr-h2">Merci de confirmer les dates de votre exercice comptable</h1>

<p>Veuillez confirmer les informations suivantes liées à votre exercice comptable.</p>

<form method="POST" use:enhanceNoInvalidate>
  <BilanTable bilan={data.bilan}></BilanTable>

  <NavigationLinks prevHref="4" nextIsButton />
</form>
