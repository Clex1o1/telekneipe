<template>
  <div
    class="icon share"
    @click="share"
    @mouseover="blockHiding"
    @mouseout="hide"
  >
    <transition name="fadeUp">
      <span v-if="linkCopied" class="copy-message">Link&nbsp;kopiert!</span>
    </transition>
    <img src="@/assets/icons/share.svg" alt="Leave" />
  </div>
</template>
<script>
import { icon } from '@/mixins/icon'
export default {
  mixins: [icon],
  props: {
    url: { default: '', type: String },
    text: { default: '', type: String },
    title: { default: '', type: String }
  },
  data: () => ({
    linkCopied: false
  }),
  computed: {
    shareData() {
      return {
        url: window.location.href,
        text:
          'Komm mit in ' +
          this.$store.getters.getRoomId +
          ' und trink ein Bier mit mir.',
        title: 'Teile ' + this.$store.getters.getRoomId
      }
    }
  },
  methods: {
    share() {
      if (typeof navigator.share === 'function') {
        const sharePromise = navigator.share(this.shareData)
        sharePromise.then((response) => {
          this.$emit('shareSuccess')
        })
      } else {
        this.$clipboard(window.location.href)
        this.linkCopied = true
        setTimeout(() => {
          this.linkCopied = false
        }, 3000)
        this.$emit('shareSuccess')
      }
    }
  }
}
</script>
<style scoped>
.icon.share {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: var(--space-medium);
}
.copy-message {
  color: var(--color-text-alternative);
  background: var(--color-text);
  border-radius: 2px;
  padding: calc(var(--space-small) / 2) var(--space-small);
  font-size: var(--font-size-small);
  position: absolute;
  left: 50%;
  box-sizing: content-box;
  transform: translate(-50%, -100%);
  top: calc(var(--space-small) / -1);
}
.fadeUp-enter,
.fadeUp-leave-to {
  opacity: 0;
  transform: translate(-50%, 0);
}

.fadeUp-enter-active,
.fadeUp-leave-active {
  will-change: transform, opacity;
  transition: opacity var(--transition-default),
    transform var(--transition-default);
}
</style>
