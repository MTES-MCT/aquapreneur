<script lang="ts">
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict="/dsfr-1.13.1/artwork/pictograms/buildings/city-hall.svg" width={124} height={124}
></Pictogram>

<h1 class="fr-h2 fr-mt-6v">Nous allons commencer par vérifier vos informations d’entreprise</h1>

<p>
  Cette étape permet de confirmer les informations et coordonnées liées à votre entreprise, et si
  besoin les corriger ou les compléter.
</p>

<NavigationLinks nextHref="2" />
