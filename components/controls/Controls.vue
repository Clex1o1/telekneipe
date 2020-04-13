<template>
  <transition name="fade-controls">
    <div v-show="showControls" class="controls">
      <home
        class="icon"
        @leaveGotoHome="$emit('leaveGotoHome')"
        @blockHiding="$emit('blockHiding')"
        @hide="$emit('hide')"
      />
      <leave
        class="icon"
        @leaveGoBack="$emit('leaveGoBack')"
        @blockHiding="$emit('blockHiding')"
        @hide="$emit('hide')"
      />
      <sound
        class="icon"
        @toggleSound="
          (sound) => {
            $emit('toggleSound', sound)
          }
        "
        @blockHiding="$emit('blockHiding')"
        @hide="$emit('hide')"
      />
      <share
        class="icon"
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
import Share from './Share'
export default {
  components: {
    Leave,
    Home,
    Sound,
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
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100vw;
  /* box-shadow: inset 0px 0px 55px 15px rgba(0, 0, 0, 0.75); */
  pointer-events: none;
  display: flex;
  justify-content: space-around;
}
.controls > * {
  pointer-events: all;
}
.fade-controls-enter,
.fade-controls-leave-to {
  transform: translateY(100%);
}
.fade-controls-enter-active,
.fade-controls-leave-active {
  will-change: transform;
  transition: transform 200ms ease;
}
.icon {
  height: 48px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
