<template>
  <transition name="show-message" class="message-container">
    <div v-if="showMessage" class="message cheers">
      <img class="beer-right" src="@/assets/icons/beermoji.svg" alt="Prost!" />
      <img class="beer-left" src="@/assets/icons/beermoji.svg" alt="Prost!" />
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    showMessage: { default: false, type: Boolean }
  }
}
</script>
<style scoped>
.message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform-origin: center;
  width: 150px;
  transform: translate(-50%, 0);
}

.message.cheers {
}

.beer-right,
.beer-left {
  will-change: transform;
  transition: 200ms transform ease;
}
.beer-right {
  position: absolute;
  transform: rotateY(180deg) rotateZ(15deg) translate(50%, 0%);
}

.beer-left {
  position: absolute;
  transform: rotateZ(15deg) translate(50%, 0%);
}

.show-message-leave-to .beer-right {
  transform: rotateY(180deg) rotateZ(-15deg) translate(200%, -50%);
}
.show-message-enter .beer-right {
  transform: rotateY(180deg) rotateZ(-15deg) translate(200%, -50%);
}

.show-message-leave-to .beer-left {
  transform: rotateZ(-15deg) translate(200%, -50%);
}
.show-message-enter .beer-left {
  transform: rotateZ(-15deg) translate(200%, -50%);
}

.show-message-enter,
.show-message-leave-to {
  opacity: 0;
}
.show-message-enter-active,
.show-message-leave-active {
  will-change: opacity;
  transition: opacity 200ms ease;
}
</style>
