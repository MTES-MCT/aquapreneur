<script lang="ts">
  import { goto } from '$app/navigation';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import { getDeclarationContext } from '$lib/declaration-context';
  import { enhanceNoInvalidate } from '$lib/utils';

  import BilanTable from './bilan-table.svelte';

  let { data, form } = $props();

  $effect(() => {
    if (form?.success) {
      const context = getDeclarationContext();
      context.declarationComplete = true;
      goto('../envoi');
    }
  });
</script>

<h1 class="fr-h2">Merci de confirmer les dates de votre exercice comptable</h1>

<p>Veuillez confirmer les informations suivantes liées à votre exercice comptable.</p>

<form method="POST" use:enhanceNoInvalidate>
  <BilanTable bilan={data.bilan} etablissement={data.etablissement}></BilanTable>

  <NavigationLinks prevHref="4" nextIsButton />
</form>
