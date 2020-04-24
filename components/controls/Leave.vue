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
