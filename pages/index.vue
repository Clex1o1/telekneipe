<template>
  <div class="container">
    <v-header :room-id="roomId"></v-header>
    <div class="join-screen">
      <h3 class="sub-headline">Erstelle deine eigene Telekneipe</h3>
      <fieldset>
        <label for="room-id">Name:</label
        ><input
          id="room-id"
          v-model="roomId"
          type="text"
          name="room-id"
          class="text-input"
          maxlength="50"
          @keyup.enter="$router.push('room/' + encodeURI(roomId))"
        />
      </fieldset>
      <nuxt-link class="button" :to="'room/' + encodeURI(roomId)"
        >Kneipe eröffnen</nuxt-link
      >
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from '@/components/VHeader'
export default {
  components: {
    VHeader,
    VFooter: () => import('@/components/VFooter')
  },
  data: () => ({
    videoHeight: 'auto',
    roomId: "Jedermann's"
  }),
  mounted() {
    if (this.$route.query.roomId) {
      this.$store.commit('setInvitation')
      this.$store.commit('setRoomId', this.$route.query.roomId)
    }
  },
  methods: {},
  /* ToDo load socket local */
  head() {
    return {
      title: this.roomId + ' Telekneipe',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Lade deine Freunde in deine eigene Telekneipe ein! Der Videochat im Kneipen-Flair. Du braucht keinen Account nur einen aktuellen Browser und eine Webcam mit Mikrofon und schon kannst du Zeit mit deinen Freunden in deiner Kneipe verbringen.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.join-screen {
  width: 100%;
  max-width: 86%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: var(--space-small);
}
.join-screen > * {
  margin: var(--space-medium) 0;
}
.join-screen .text-input {
  font-size: var(--font-size-medium);
  font-weight: bold;
  width: 100%;
}
.join-screen fieldset {
  display: flex;
  width: 100%;
  max-width: 320px;
  align-items: baseline;
}
</style>
