<!--
Cette page permet de tester l’envoi d’erreurs à Sentry
-->

<script>
  import * as Sentry from '@sentry/sveltekit';

  function getSentryData() {
    Sentry.startSpan(
      {
        name: 'Example Frontend Span',
        op: 'test'
      },
      async () => {
        const res = await fetch('/sonde-sentry');
        if (!res.ok) {
          throw new Error('Sonde frontend');
        }
      }
    );
  }
</script>

<svelte:head>
  <title>Sonde Sentry | Aquapreneur</title>
</svelte:head>

<div class="fr-grid-row">
  <div class="fr-col-8 fr-py-12v" id="contenu">
    <button class="fr-btn" type="button" onclick={getSentryData}> Déclencher une erreur </button>
  </div>
</div>
