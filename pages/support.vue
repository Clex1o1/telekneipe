<template>
  <div class="container">
    <nuxt-link to="/" class="link-back">Zurück</nuxt-link>
    <h1>Eure Unterstützung!</h1>
    <p>
      Sendet vorschläge welche Kneipe, Bar, Café oder Einzelhändler wir
      untersützen sollen. Oder bist du betroffen? Setze dich mit uns in Kontakt
      und wir veröffentlichen dein Paypal-Spendenkonto. Einfach eine kurze Mail
      an: <a href="mailto:alexander@classen.rocks">alexander@classen.rocks</a>
    </p>
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
  bottom: var(--space-medium);
  right: var(--space-medium);
}
.link-back {
  position: fixed;
  top: var(--space-medium);
  left: var(--space-medium);
}
</style>
