<script lang="ts">
  import { browser } from '$app/environment';
  import { enhance } from '$app/forms';

  import ProconnectButton from '$lib/components/proconnect-button.svelte';

  const { data } = $props();
  console.log('data in page.svelte', data);
  if (browser) console.info('hello console frontend');
  else console.info('hello console ssr');
</script>

{#if data?.utilisateur}
  <h1>Bienvenue sur Aquapreneur {data.utilisateur.courriel} !</h1>
  <form method="post" action="/auth/logout/proconnect" use:enhance>
    <button class="fr-btn">Se deconnecter</button>
  </form>
{:else}
  <h1>Bienvenue sur Aquapreneur !</h1>
  <form method="post" action="/auth/login/proconnect" use:enhance>
    <ProconnectButton />
  </form>
{/if}
