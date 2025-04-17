<script lang="ts">
  import { enhance } from '$app/forms';

  import NavigationLinks from '$lib/components/navigation-links.svelte';

  const { data } = $props();
</script>

<h1 class="fr-h2">Passons en revue votre stock en {data.year}</h1>

<p>
  Veuillez vérifier les données relatives à vos stocks pour chaque espèce et chaque stade d’élevage.
</p>
<form method="POST" use:enhance>
  {#if !data.bilan}
    <div class="fr-alert fr-alert--warning">
      <h3 class="fr-alert__title">Données manquantes</h3>
      <p>
        Nous n’avons pas trouvé de données sur le stock de l’établissement<br />{data.etablissement
          .uniteLegale.denominationUniteLegale}.
      </p>
    </div>
  {:else}
    <h2 class="fr-h6">Huîtres</h2>
    <div class="fr-accordions-group">
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button
            class="fr-accordion__btn"
            type="button"
            aria-expanded="false"
            aria-controls="accordion-114">Stock d’huîtres de taille marchande</button
          >
        </h3>
        <div class="fr-collapse" id="accordion-114">
          <p class="fr-text--sm">
            Il s’agit de vos huîtres de taille marchande disponible à la vente ou pour l’élevage
            auprès d’autres conchyliculteurs.
          </p>
          <dl class="wrapper">
            <dt>Volume en stock</dt>
            <dd>0 kg</dd>
            <dt>Valorisation du stock</dt>
            <dd>
              {0 !== null
                ? Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                    Number.parseFloat('0')
                  )
                : ''}
            </dd>
          </dl>
        </div>
      </section>
    </div>
  {/if}

  <NavigationLinks prevHref="1" nextIsButton />
</form>

<style>
  dl {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }

  dt {
    font-weight: bold;
    margin: 0;
  }

  dd {
    padding: 0;
  }
</style>
