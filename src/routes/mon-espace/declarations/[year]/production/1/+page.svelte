<script lang="ts">
  import LeafPict from '@gouvfr/dsfr/dist/artwork/pictograms/environment/leaf.svg';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict={LeafPict} width={124} height={124}></Pictogram>

<h1 class="fr-h2 fr-mt-6v">Nous allons maintenant examiner votre production aquacole vendue</h1>

<NavigationLinks nextHref="2" />
