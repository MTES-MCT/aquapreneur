<script lang="ts">
  import { page } from '$app/state';

  import Footer from '$lib/components/footer.svelte';
  import Header from '$lib/components/header.svelte';
  import Skiplink from '$lib/components/skiplink.svelte';

  import '../app.css';

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
<main role="main" id="content">
  {@render children()}
</main>

<Footer></Footer>
