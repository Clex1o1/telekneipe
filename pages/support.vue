<template>
  <div class="container">
    <nuxt-link to="/" class="link-back">Zurück</nuxt-link>
    <div class="content">
      <h1>Unterstütze deine Lieblingskneipe!</h1>
      <donation />
      <p>
        Unterstütze deine Lieblingskneipe! Sendet Vorschläge welche Kneipe, Bar
        oder welches Café ihr unterstützen wollt. Bist du selber Gastronom und
        hast schon eine Hilfsmöglichkeit eingerichtet? Setze dich mit uns in
        Kontakt und wir veröffentlichen dein Paypal-Spendenkonto bzw. den Link
        zu deiner Aktion. Einfach eine kurze Mail an:
        <a rel="noreferrer" href="mailto:alex@telefonkneipe.de"
          >alex@telefonkneipe.de</a
        >
      </p>
      <p>
        Support us on
        <a
          rel="noreferrer"
          href="https://github.com/clexi/telekneipe"
          target="_blank"
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
@media screen and (max-width: 992px) {
  .content {
    max-width: 100%;
  }
}
</style>
