<script lang="ts">
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import { enhanceNoInvalidate } from '$lib/utils';

  import ContactTable from './contact-table.svelte';

  const { data } = $props();
</script>

<h1 class="fr-h2">Comment vous contacter</h1>
<p>
  Merci de vérifier si vos coordonnées de contact sont exactes, et si besoin les corriger ou les
  compléter.
</p>
<form method="POST" use:enhanceNoInvalidate>
  <ContactTable {data} editable></ContactTable>
  <NavigationLinks prevHref="2" nextIsButton />
</form>
