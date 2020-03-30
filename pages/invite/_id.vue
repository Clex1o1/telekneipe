<template>
  <div class="container">
    <v-header :room-id="roomId"></v-header>
    <div class="invitation">
      <h3>Du wurdest in {{ roomId }} Telekneipe eingeladen.</h3>
      <nuxt-link class="button" :to="'/room/' + encodeURI(roomId)"
        >Kneipe beitreten</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/VHeader'
export default {
  components: {
    VHeader
  },
  data() {
    return {
      roomId: this.$route.params.id
    }
  },
  created() {
    if (this.roomId) {
      this.$store.commit('setRoomId', this.roomId)
    } else {
      this.$router.push('/')
    }
  },
  mounted() {},
  head() {
    return {
      title: this.roomId + ' Telekneipe'
    }
  }
}
</script>

<style scoped>
.invitation {
  width: 100%;
  max-width: 86%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: var(--space-small);
}
.invitation .button {
  margin: var(--space-medium);
}
</style>
