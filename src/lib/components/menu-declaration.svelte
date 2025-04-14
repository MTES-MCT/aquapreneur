<script lang="ts">
  const { step, baseUrl } = $props();
</script>

<nav class="fr-sidemenu fr-sidemenu--sticky-full-height" aria-labelledby="fr-sidemenu-title">
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
      <div class="fr-sidemenu__title" id="fr-sidemenu-title">Ma déclaration annuelle</div>
      <ul class="fr-sidemenu__list">
        <li class="fr-sidemenu__item fr-sidemenu__item--active">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/entreprise"
            aria-current={step === 'entreprise' ? 'page' : undefined}>Mon entreprise</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/concessions"
            aria-current={step === 'concessions' ? 'page' : undefined}>Mes concessions</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/production"
            aria-current={step === 'production' ? 'page' : undefined}>Production aquacole vendue</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/stock"
            aria-current={step === 'stock' ? 'page' : undefined}>Stock</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/eco"
            aria-current={step === 'eco' ? 'page' : undefined}>Données économiques</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/declaration"
            aria-current={step === 'declaration' ? 'page' : undefined}>Déclaration obligatoire</a
          >
        </li>
        <li class="fr-sidemenu__item">
          <a
            class="fr-sidemenu__link"
            href="{baseUrl}/envoi"
            aria-current={step === 'envoi' ? 'page' : undefined}>Envoi</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
