<script lang="ts">
  let { data } = $props();
</script>

<div class="fr-container">
  <div class="fr-grid-row">
    <div class="fr-col-8 fr-py-12v" id="contenu"><p>{data.statusMessage}</p></div>
  </div>
</div>
