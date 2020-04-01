<template>
  <div class="link copyright">
    <a href="https://westwerk.ac" target="_blank"
      >Beta © {{ year }} Alexander Classen - powered by westwerk</a
    >
    <a href="https://handkemacht.com/" target="_blank"> & handkemacht</a>
  </div>
</template>
<script>
export default {
  computed: {
    year() {
      const date = new Date()
      return date.getFullYear()
    }
  }
}
</script>
<style scoped>
.copyright {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: var(--space-small);
}
</style>
