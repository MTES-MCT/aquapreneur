<script lang="ts">
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Pictogram from '$lib/components/pictogram.svelte';
</script>

<Pictogram pict="/dsfr-1.13.1/artwork/pictograms/map/location-france.svg" width={124} height={124}
></Pictogram>

<h1 class="fr-h2 fr-mt-6v">Nous allons maintenant examiner vos concessions</h1>

<p>
  Dans cette étape, vous vérifierez les informations liées à vos concessions. Si des changements ont
  eu lieu, il vous sera demandé de compléter certains informations.
</p>

<NavigationLinks prevHref="../entreprise/3" nextHref="2" />
