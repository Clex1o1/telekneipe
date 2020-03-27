<template>
  <div class="container">
    <nuxt-link to="/" class="link-back">Zurück</nuxt-link>
    <h1>Danke!</h1>
    <p>
      Danke an alle Kneipen, Bars, Clubs, Discotheken, die uns so viele schöne
      Abende oder Nächte geschenkt haben.<br />
      Danke auch an alle, die in dieser Zeit ihren Job machen, damit es uns
      weiterhin gut geht.<br />
      A special thanks to
      <a href="https://muazkhan.com/" target="_blank">Muaz Khan</a> for his
      WebRTC Javascript library and
      <a href="http://www.westonsoftware.com/" target="_blank">Andy Weston</a>
      for his Vue implementation. Design by
      <a href="https://bandeins.de/" target="_blank">Max Müsgens</a>. Concept &
      idea by
      <a href="https://www.markus-h.de/" target="_blank">Markus Handke.</a>
    </p>
    <div class="link">
      <a href="https://westwerk.ac" target="_blank"
        >Beta © {{ year }} Alexander Classen - powered by westwerk</a
      >
      <a href="https://www.markus-h.de/" target="_blank"> & handkemacht</a>
    </div>
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
  flex-direction: column;
  padding: var(--space-small);
}
h1 {
  margin: var(--space-medium);
}
.link {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: var(--space-small);
}
.link-back {
  position: fixed;
  top: var(--space-medium);
  left: var(--space-medium);
}
</style>
