<script lang="ts">
  import FranceMapPict from '@gouvfr/dsfr/dist/artwork/pictograms/map/location-france.svg';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict={FranceMapPict} width={124} height={124}></Pictogram>,

<h2 class="fr-h5">Nous allons maintenant examiner vos concessions</h2>

<NavigationLinks nextHref="2" />
