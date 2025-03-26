<script lang="ts">
  import { enhance } from '$app/forms';

  import IllustrationAccueil from '$lib/assets/illustration-page-accueil.svg';
  import ProconnectButton from '$lib/components/proconnect-button.svelte';

  const { data } = $props();
</script>

<div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
  <div class="fr-col-md-6 fr-col-lg-5 fr-hidden fr-unhidden-md">
    <img class="fr-responsive-img" alt="" src={IllustrationAccueil} />
  </div>
  <div class="fr-col-12 fr-col-sm-10f fr-col-md-6 fr-col-lg-6 fr-m-auto">
    <h1 class="fr-h2">
      Aquapreneur, le portail qui accompagne les entrepreneurs et entrepreneuses aquacoles
    </h1>

    {#if data?.utilisateur}
      <form method="post" action="/auth/logout/proconnect" use:enhance>
        <button class="fr-btn">Se deconnecter</button>
      </form>
    {:else}
      <form method="post" action="/auth/login/proconnect" use:enhance>
        <ProconnectButton />
      </form>
    {/if}
  </div>
</div>
