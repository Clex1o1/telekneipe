<template>
  <div class="container">
    <nuxt-link to="/" class="link-back">Zurück</nuxt-link>
    <div class="content">
      <h1>Unterstütze deine lieblings Kniepe!</h1>
      <donation />
      <p>
        Sendet vorschläge welche Kneipe, Bar, Café oder Einzelhändler wir
        untersützen sollen. Oder bist du betroffen? Setze dich mit uns in
        Kontakt und wir veröffentlichen dein Paypal-Spendenkonto. Einfach eine
        kurze Mail an:
        <a href="mailto:alexander@classen.rocks">alexander@classen.rocks</a>
      </p>
      <p>
        Support us on
        <a href="https://github.com/clexi/telekneipe" target="_blank"
          >Github <img class="icon" src="@/assets/icons/github.svg" alt="Github"
        /></a>
      </p>
    </div>
    <copyright />
  </div>
</template>

<script>
export default {
  components: {
    Donation: () => import('@/components/Donation'),
    Copyright: () => import('@/components/Copyright')
  },
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
.content {
  max-width: 50%;
  margin: var(--space-medium);
}
h1 {
  margin: var(--space-medium) 0;
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
.icon {
  width: 24px;
}
</style>
