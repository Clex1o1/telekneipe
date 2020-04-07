<template>
  <transition name="show-message" class="message-container">
    <div class="message">{{ message.text }}</div>
  </transition>
</template>
<script>
export default {
  props: {
    message: {
      default: () => ({ text: '🍻' }),
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: scale(15);
}
.show-message-enter {
  transform: scale(0);
  opacity: 0;
}
.show-message-leave-to {
  transform: scale(100);
  opacity: 0;
}
.show-message-enter-active,
.show-message-leave-active {
  will-change: opacity, transform;
  transition: opacity 600ms ease, transform 600ms ease;
}
</style>
