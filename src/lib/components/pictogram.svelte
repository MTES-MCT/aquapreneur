<script lang="ts">
  const {
    pict,
    width = 80,
    height = 80
  }: {
    pict: string;
    width: number;
    height: number;
  } = $props();
</script>

<svg
  aria-hidden="true"
  class="fr-artwork"
  viewBox="0 0 {width} {height}"
  width="{width}px"
  height="{height}px"
>
  <use class="fr-artwork-decorative" href="{pict}#artwork-decorative"></use>
  <use class="fr-artwork-minor" href="{pict}#artwork-minor"></use>
  <use class="fr-artwork-major" href="{pict}#artwork-major"></use>
</svg>
