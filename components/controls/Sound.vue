<template>
  <div
    class="icon sound"
    @click="toggleSound"
    @mouseover="blockHiding"
    @mouseout="hide"
  >
    <img v-show="sound" src="@/assets/icons/volume_on.svg" alt="Leave" />
    <img v-show="!sound" src="@/assets/icons/volume_off.svg" alt="Leave" />
  </div>
</template>
<script>
import { icon } from '@/mixins/icon'
export default {
  mixins: [icon],
  data: () => ({
    sound: true
  }),
  methods: {
    toggleSound() {
      this.sound = !this.sound
      this.$emit('toggleSound', this.sound)
    }
  }
}
</script>
<style scoped>
.icon.sound {
  position: absolute;
  left: var(--space-medium);
  bottom: var(--space-medium);
}
</style>
