<template>
  <div
    class="icon home"
    @click="$emit('leaveGotoHome')"
    @mouseover="blockHiding"
    @mouseout="hide"
  >
    <img src="@/assets/icons/home.svg" alt="Leave" />
  </div>
</template>
<script>
import { icon } from '@/mixins/icon'
export default {
  mixins: [icon]
}
</script>
