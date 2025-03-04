<script lang="ts">
  import { enhance } from '$app/forms';
  import ProconnectButton from '$lib/components/proconnect-button.svelte';

  const { data } = $props();
</script>

{#if data?.user}
  <h1>Bienvenue sur Aquapreneur {data.user.email} !</h1>
  <form method="post" action="/auth/logout/proconnect" use:enhance>
    <button class="fr-btn">Se deconnecter</button>
  </form>
{:else}
  <h1>Bienvenue sur Aquapreneur !</h1>
  <form method="post" action="/auth/login/proconnect" use:enhance>
    <ProconnectButton />
  </form>
{/if}
