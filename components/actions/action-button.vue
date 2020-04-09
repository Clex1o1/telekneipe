<template>
  <div class="action-button">
    <div
      :class="'action-button-add ' + (showActions ? 'active' : '')"
      @click="showActions = !showActions"
    >
      +
    </div>
    <transition-group name="show-actions" tag="div" class="acition-buttons">
      <div
        v-show="showActions"
        key="cheers-all"
        class="action-button-animated action-button-cheers-all"
        @click="
          $emit('sendAction', { to: 'all' }), (showActions = !showActions)
        "
      >
        🍻
      </div>
      <div
        v-show="showActions"
        key="cheers-one"
        class="action-button-animated action-button-cheers-one"
        @click="
          $emit('sendAction', { to: targetId }), (showActions = !showActions)
        "
      >
        🍺
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  props: { targetId: { default: null, type: String } },
  data: () => ({
    showActions: false
  })
}
</script>
<style scoped>
.action-button {
  position: absolute;
  bottom: 12%;
  right: 8%;
}
.action-buttons {
  position: relative;
}
.action-button-animated {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.action-button-add {
  position: absolute;
  background: var(--color-blue);
  border-radius: 100%;
  width: 50px;
  height: 50px;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  user-select: none;
  transition: transform 200ms ease;
  will-change: transform;
  transform-origin: center;
}
.action-button-add.active {
  transform: rotate(45deg);
}
.action-button-cheers-all {
  transform: scale(1) translate(-50%, -115%);
  background: var(--color-green);
}
.action-button-cheers-one {
  transform: scale(1) translate(-130%, 0);
  background: var(--color-yellow);
}

.show-actions-enter,
.show-actions-leave-to {
  transform: scale(0) translate(0, 0);
  opacity: 0;
}
.show-actions-enter-active,
.show-actions-leave-active {
  will-change: opacity, transform;
  transition-property: opacity, transform;
  transition-duration: 200ms, 200ms;
  transition-timing-function: ease, ease;
}
.show-actions-enter-active.action-button-cheers-all,
.show-actions-leave-active.action-button-cheers-all {
  transition-delay: 100ms, 100ms;
}
</style>
