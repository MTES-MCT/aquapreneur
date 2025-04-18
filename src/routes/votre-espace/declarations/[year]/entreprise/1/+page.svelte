<script lang="ts">
  import CityHallPict from '@gouvfr/dsfr/dist/artwork/pictograms/buildings/city-hall.svg';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict={CityHallPict} width={124} height={124}></Pictogram>

<h1 class="fr-h2 fr-mt-6v">Nous allons commencer par vérifier vos informations d’entreprise</h1>

<p>
  Cette étape permet de confirmer les informations et coordonnées liées à votre entreprise, et si
  besoin les corriger ou les compléter.
</p>

<NavigationLinks nextHref="2" />
