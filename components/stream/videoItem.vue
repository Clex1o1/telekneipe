<template>
  <div
    :class="
      'video-item ' +
        (activeVideo ? 'active-video ' : '') +
        (unactiveVideo ? 'unactive-video ' : '') +
        (allActive ? 'all-active ' : '')
    "
  >
    <video
      :id="id"
      ref="video"
      :controls="controls"
      autoplay
      playsinline
      :height="cameraHeight"
      :muted="muted"
    ></video>
    <transition name="show-video-overlay">
      <div v-if="unactiveVideo" class="video-overlay"></div>
    </transition>
    <action-button
      v-if="!isLocalVideo"
      :target-id="id"
      @sendAction="sendAction"
    />
  </div>
</template>
<script>
export default {
  components: {
    ActionButton: () => import('@/components/actions/action-button')
  },
  props: {
    id: { default: null, type: String },
    cameraHeight: { default: 'auto', type: String },
    muted: { default: true, type: Boolean },
    controls: { default: true, type: Boolean },
    stream: undefined,
    isLocalVideo: { default: false, type: Boolean }
  },
  data: () => ({
    allActive: false,
    activeVideo: false,
    unactiveVideo: false
  }),
  mounted() {
    this.$refs.video.srcObject = this.stream
  },
  methods: {
    sendAction(event) {
      this.$emit('sendAction', event)
    }
  }
}
</script>
<style scoped>
.video-item video {
  max-width: 100%;
  -webkit-border-radius: 1px;
  border-radius: 1px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: center center;
  position: relative;
}
.video-item {
  will-change: transform;
  transition: transform 300ms ease;
  position: relative;
}
.video-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.video-item.active-video {
  transform: scale(0.9);
}
.video-item.all-active {
  transform: scale(0.9);
}
.video-item.unactive-video {
  transform: translate3d(0, 0, -10px);
}
.show-video-overlay-enter,
.show-video-overlay-leave-to {
  opacity: 0;
}
.show-video-overlay-enter-active,
.show-video-overlay-leave-active {
  will-change: opacity;
  transition: opacity 300ms ease;
}
</style>
