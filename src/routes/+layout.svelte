<script lang="ts">
  import { onMount } from 'svelte';

  import Header from '$lib/header.svelte';

  import Footer from '$lib/components/footer.svelte';

  import '../app.css';

  onMount(async () => {
    // @ts-expect-error -- pas de type disponible
    await import('@gouvfr/dsfr/dist/dsfr.module.js');
  });

  let { children } = $props();
</script>

<Header></Header>

<!-- svelte-ignore a11y_no_redundant_roles -->
<main role="main" id="content" class="fr-container">
  {@render children()}
</main>

<Footer></Footer>
