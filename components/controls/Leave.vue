<template>
  <div
    class="icon leave"
    @click="$emit('leaveGoBack')"
    @mouseover="blockHiding"
    @mouseout="hide"
  >
    <img src="@/assets/icons/exit.svg" alt="Leave" />
  </div>
</template>
<script>
import { icon } from '@/mixins/icon'
export default {
  mixins: [icon]
}
</script>
<style scoped>
.icon.leave {
  cursor: pointer;
  position: absolute;
  right: var(--space-medium);
  top: var(--space-medium);
}
</style>
