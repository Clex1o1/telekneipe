<template>
  <footer>
    <nuxt-link to="thanks" class="link">Danke</nuxt-link
    ><nuxt-link to="support" class="link">Unterstützen</nuxt-link
    ><a
      rel="noreferrer"
      href="https://telefonkneipe.de/"
      target="_blank"
      class="link"
      >Telefonkneipe</a
    >
    <nuxt-link to="imprint" class="link">Impressum</nuxt-link>
  </footer>
</template>
<script>
export default {}
</script>
<style scoped>
.link {
  border-right: 2px solid var(--color-primary);
  padding: 0 var(--space-small);
}
.link:last-child {
  border: none;
}
@media screen and (max-width: 992px) {
  .link {
    font-size: var(--font-size-small);
  }
}
</style>
