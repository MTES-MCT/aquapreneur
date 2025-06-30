<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";
</script>

<Pictogram pict="leisure/book" width={124} height={124}></Pictogram>

<h1 class="fr-h2 fr-mt-6v">
	Nous allons maintenant faire le point sur votre stock.
</h1>

<p>
	Cette étape concerne votre volume en stock à la fin de votre exercice
	comptable. Vous devrez confirmer ou compléter les informations relative à
	votre stock selon l’espèce et le stade d’élevage.
</p>

<NavigationLinks prevHref="../production/2" nextHref="2" />
