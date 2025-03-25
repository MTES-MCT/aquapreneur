<script lang="ts">
  import { onMount } from 'svelte';

  import Footer from '$lib/components/footer.svelte';
  import Header from '$lib/components/header.svelte';

  import '../app.css';

  onMount(async () => {
    // @ts-expect-error -- pas de type disponible
    await import('@gouvfr/dsfr/dist/dsfr.module.js');
  });

  let { children } = $props();
</script>

<Header></Header>

<!-- svelte-ignore a11y_no_redundant_roles -->
<main role="main" id="content">
  <div class="fr-container fr-mt-8v fr-mt-md-14v fr-mb-2v fr-mb-md-8v">
    {@render children()}
  </div>
</main>

<Footer></Footer>
