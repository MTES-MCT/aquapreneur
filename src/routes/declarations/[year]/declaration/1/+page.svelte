<script lang="ts">
  import CommunityPict from '@gouvfr/dsfr/dist/artwork/pictograms/leisure/community.svg';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict={CommunityPict} width={124} height={124}></Pictogram>

<h2 class="fr-h5 fr-mt-6v">
  Pour terminer, veuillez répondre à ces dernières questions afin de compléter votre déclaration
</h2>

<NavigationLinks nextHref="2" />
