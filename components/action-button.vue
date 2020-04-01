<template>
  <div class="action-button" @click="$emit('sendAction')">+</div>
</template>
<script>
export default {
  methods: {}
}
</script>
<style scoped>
.action-button {
  background: var(--color-blue);
  border-radius: 100%;
  width: 50px;
  height: 50px;
  color: var(--color-text);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  z-index: 1;
}
</style>
