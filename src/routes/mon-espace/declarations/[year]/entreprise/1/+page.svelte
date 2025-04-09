<script lang="ts">
  import CityHallPict from '@gouvfr/dsfr/dist/artwork/pictograms/buildings/city-hall.svg';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict={CityHallPict} width={124} height={124}></Pictogram>

<h2 class="fr-h5 fr-mt-6v">Nous allons commencer par vérifier vos informations d’entreprise</h2>

<NavigationLinks nextHref="2" />
