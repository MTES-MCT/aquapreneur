<script lang="ts">
  import { onMount } from 'svelte';

  import { page } from '$app/state';

  import Footer from '$lib/components/footer.svelte';
  import Header from '$lib/components/header.svelte';
  import Skiplink from '$lib/components/skiplink.svelte';

  import '../app.css';

  onMount(async () => {
    // @ts-expect-error -- pas de type disponible
    await import('@gouvfr/dsfr/dist/dsfr.module.js');
  });

  let { data, children } = $props();
</script>

<svelte:head>
  {#if page.data.title}
    <title>{page.data.title} | Aquapreneur</title>
  {/if}
</svelte:head>

<Skiplink></Skiplink>

<Header utilisateur={data.utilisateur}></Header>

<!-- svelte-ignore a11y_no_redundant_roles -->
<main role="main" id="contenu">
  <div class="fr-container fr-mt-8v fr-mt-md-14v fr-mb-8v">
    {@render children()}
  </div>
</main>

<Footer></Footer>
