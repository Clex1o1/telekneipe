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
        url: encodeURI(
          window.location.origin + '/invite/' + this.$store.getters.getRoomId
        ),
        title:
          'Komm und trink ein Bier mit mir in ' + this.$store.getters.getRoomId
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
        this.$clipboard(
          encodeURI(
            window.location.origin + '/invite/' + this.$store.getters.getRoomId
          )
        )
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
.copy-message {
  color: var(--color-text-alternative);
  background: var(--color-text);
  border-radius: 2px;
  padding: calc(var(--space-small) / 2) var(--space-small);
  font-size: var(--font-size-small);
  position: absolute;
  right: 0;
  box-sizing: content-box;
  transform: translate(0, -100%);
  top: calc(var(--space-small) / -1);
}
.fadeUp-enter,
.fadeUp-leave-to {
  opacity: 0;
  transform: translate(0, 0);
}

.fadeUp-enter-active,
.fadeUp-leave-active {
  will-change: transform, opacity;
  transition: opacity var(--transition-default),
    transform var(--transition-default);
}
</style>
