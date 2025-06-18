<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";
</script>

<Pictogram pict="environment/leaf" width={124} height={124}></Pictogram>

<h1 class="fr-h2 fr-mt-6v">
	Nous allons à présent nous intéresser à votre production aquacole vendue.
</h1>

<p>
	Il vous sera demandé de valider ou compléter des informations concernant la
	répartition de votre production et de votre chiffre d'affaires selon l’espèce,
	le stade d’élevage et la destination.
</p>

<NavigationLinks prevHref="../concessions/3" nextHref="2" />
