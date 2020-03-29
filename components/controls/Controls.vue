<template>
  <transition name="fade-controls">
    <div v-show="showControls" class="controls">
      <home
        @leaveGotoHome="$emit('leaveGotoHome')"
        @blockHiding="$emit('blockHiding')"
        @hide="$emit('hide')"
      />
      <leave
        @leaveGoBack="$emit('leaveGoBack')"
        @blockHiding="$emit('blockHiding')"
        @hide="$emit('hide')"
      />
      <sound
        @toggleSound="
          (sound) => {
            $emit('toggleSound', sound)
          }
        "
        @blockHiding="$emit('blockHiding')"
        @hide="$emit('hide')"
      />
      <share @blockHiding="$emit('blockHiding')" @hide="$emit('hide')" />
      <mic
        @toggleMic="
          (mic) => {
            $emit('toggleMic', mic)
          }
        "
        @blockHiding="$emit('blockHiding')"
        @hide="$emit('hide')"
      />
    </div>
  </transition>
</template>
<script>
import Leave from './Leave'
import Sound from './Sound'
import Home from './Home'
import Mic from './Mic'
import Share from './Share'
export default {
  components: {
    Leave,
    Home,
    Sound,
    Mic,
    Share
  },
  props: {
    shouldShowControls: { default: false, type: Boolean }
  },
  data: () => ({
    initalShowControls: true
  }),
  computed: {
    showControls() {
      return this.shouldShowControls || this.initalShowControls || false
    }
  },
  mounted() {
    setTimeout(() => {
      this.initalShowControls = false
    }, 3000)
  },

  methods: {}
}
</script>
<style scoped>
.controls {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  max-height: 100vh;
  bottom: 0;
  box-shadow: inset 0px 0px 55px 15px rgba(0, 0, 0, 0.75);
}
.fade-controls-enter,
.fade-controls-leave-to {
  opacity: 0;
}
.fade-controls-enter-active,
.fade-controls-leave-active {
  will-change: opacity;
  transition: opacity 300ms ease;
}
</style>
