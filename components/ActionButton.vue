<template>
  <div class="action-button">
    +
  </div>
</template>
<script>
export default {
  props: {
    videoId: {
      default: null,
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.action-button {
  background: var(--color-primary);
  border-radius: 100%;
  padding: var(--space-small);
  color: var(--color-text);
}
</style>
