<template>
  <div
    class="icon mic"
    @click="toggleMic"
    @mouseover="blockHiding"
    @mouseout="hide"
  >
    <img v-show="mic" src="@/assets/icons/mic_on.svg" alt="Leave" />
    <img v-show="!mic" src="@/assets/icons/mic_off.svg" alt="Leave" />
  </div>
</template>
<script>
import { icon } from '@/mixins/icon'
export default {
  mixins: [icon],
  data: () => ({
    mic: true
  }),
  methods: {
    toggleMic() {
      this.mic = !this.mic
      this.$emit('toggleMic', this.mic)
    }
  }
}
</script>
<style scoped>
.icon.mic {
  cursor: pointer;
  position: absolute;
  right: var(--space-medium);
  bottom: var(--space-medium);
}
</style>
