<script lang="ts">
  const { step, baseUrl } = $props();
</script>

<nav
  class="fr-sidemenu fr-sidemenu--sticky fr-sidemenu--sticky-full-height"
  aria-labelledby="fr-sidemenu-title"
>
  <div class="fr-sidemenu__inner">
    <button
      class="fr-sidemenu__btn"
      hidden
      aria-controls="fr-sidemenu-wrapper"
      aria-expanded="false"
    >
      Dans cette rubrique
    </button>
    <div class="fr-collapse" id="fr-sidemenu-wrapper">
      <h1 class="fr-sidemenu__title fr-h3" id="fr-sidemenu-title">Ma déclaration annuelle</h1>
      <ul class="fr-sidemenu__list">
        <li class="fr-sidemenu__item fr-sidemenu__item--active">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/entreprise"
            target="_self"
            aria-current={step === 'entreprise' ? 'page' : undefined}>Mon entreprise</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/concessions"
            target="_self"
            aria-current={step === 'concessions' ? 'page' : undefined}>Mes concessions</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/production"
            target="_self"
            aria-current={step === 'production' ? 'page' : undefined}>Production aquacole vendue</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/stock"
            target="_self"
            aria-current={step === 'stock' ? 'page' : undefined}>Stock</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/eco"
            target="_self"
            aria-current={step === 'eco' ? 'page' : undefined}>Données économiques</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/declaration"
            target="_self"
            aria-current={step === 'declaration' ? 'page' : undefined}>Déclaration obligatoire</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/envoi"
            target="_self"
            aria-current={step === 'envoi' ? 'page' : undefined}>Envoi</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
