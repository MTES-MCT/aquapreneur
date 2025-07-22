<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";
</script>

<Pictogram pict="institutions/money" width={124} height={124}></Pictogram>

<h1 class="fr-h2 fr-mt-6v">Ventes</h1>

<p>
	Cette étape traite de la production vendue au cours de l’année passée. Il vous
	sera demandé de vérifier les informations saisies via votre logiciel
	comptable, et de les compléter.
</p>

<NavigationLinks prevHref="../intro/2" nextHref="2" />
