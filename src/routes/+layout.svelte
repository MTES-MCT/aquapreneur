<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import Header from '$lib/header.svelte';

  onMount(async () => {
    // @ts-ignore
    await import('@gouvfr/dsfr/dist/dsfr.module.js');
  });

  let { children } = $props();
</script>

<Header></Header>

<!-- svelte-ignore a11y_no_redundant_roles -->
<main role="main" id="content" class="fr-container">
  {@render children()}
</main>
