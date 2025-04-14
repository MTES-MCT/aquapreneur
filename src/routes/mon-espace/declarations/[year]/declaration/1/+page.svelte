<script lang="ts">
  import CommunityPict from '@gouvfr/dsfr/dist/artwork/pictograms/leisure/community.svg';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict={CommunityPict} width={124} height={124}></Pictogram>

<h1 class="fr-h2 fr-mt-6v">Pour conclure</h1>

<p>
  Avant d’envoyer votre déclaration, vous pouvez partager ici tout événement exceptionnel survenu en
  2024 ou tout retour utile concernant l’outil et votre déclaration.
</p>

<NavigationLinks nextHref="2" prevHref="stock/3" />
