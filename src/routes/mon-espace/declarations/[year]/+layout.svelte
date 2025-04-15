<script lang="ts">
  import { page } from '$app/state';

  import MenuDeclaration from '$lib/components/menu-declaration.svelte';

  let { data, children } = $props();
</script>

<div class="fr-grid-row fr-py-12v">
  <div class="fr-col-md-4 fr-col-lg-3 fr-col-12">
    <MenuDeclaration step={page.data.step} baseUrl="/mon-espace/declarations/{data.year}"
    ></MenuDeclaration>
  </div>

  <div id="contenu" class="fr-col-12 fr-col-md-8" style="min-height: 100vh; margin: auto">
    {@render children()}
  </div>
</div>
