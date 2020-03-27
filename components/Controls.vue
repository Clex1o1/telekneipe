<template>
  <div :class="'controls ' + (showControls ? 'open' : 'close')">
    <div class="controls-form">
      <h1 v-if="$mq !== 'lg'" class="headline">
        {{ $store.getters.getRoomId }} Telekneipe
      </h1>
      <h3 class="sub-headline">Join Title</h3>
      <input
        v-model="$store.getters.getRoomId"
        type="text"
        name="room-id"
        class="text-input"
      />
      <button class="button" @click="joinRoom">Eintreten</button>
      <button class="button" @click="leaveRoom">
        Nach hause torkeln
      </button>
      <button
        v-show="$store.getters.getVideoLink"
        v-clipboard="() => $store.getters.getVideoLink"
        v-clipboard:success="linkCopied"
        class="button video-link"
      >
        <transition name="tooltip"
          ><span v-show="shareMessage" class="tooltip"
            >Link kopiert!</span
          ></transition
        >

        Teilen
      </button>
      <div class="link">
        <nuxt-link to="thanks">Danke |</nuxt-link>
        <a href="https://telefonkneipe.de/" target="_blank">Telefonkneipe |</a>
        <nuxt-link to="support">Unterstützen</nuxt-link>
      </div>
    </div>
    <button class="button-control" @click="showControls = !showControls">
      <span class="menu-string menu-string-1"></span>
      <span class="menu-string menu-string-2"></span>
      <span class="menu-string menu-string-3"></span>
    </button>
  </div>
</template>
<script>
import { vueVideo } from '@/mixins/vue-video'
export default {
  mixins: [vueVideo],
  props: {},
  data: () => ({
    showControls: false,
    shareMessage: false
  }),
  methods: {
    linkCopied() {
      this.shareMessage = true
      window.setTimeout(() => {
        this.shareMessage = false
      }, 3000)
    }
  }
}
</script>
<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  width: 25vw;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  align-items: center;
  background: var(--color-background-light);
  padding: var(--space-medium);
  will-change: transform;
  transition: transform var(--transition-default);
}

.controls .sub-headline {
  width: 100%;
}
.controls.close {
  transform: translateX(-100%);
}
.controls.open {
  transform: translateX(0%);
}
.controls-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.controls-form h3 {
  margin-right: auto;
}
.controls .text-input {
  width: 100%;
}
.controls .button-control {
  position: absolute;
  top: var(--space-medium);
  right: -45px;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  outline: none;
}
.controls .link {
  width: 100%;
  position: fixed;
  bottom: var(--space-medium);
  left: var(--space-medium);
}
.controls .button-control .menu-string {
  border: 2px solid var(--color-primary);
  border-radius: 3px;
  margin: 1.5px 0;
  width: 30px;
}

.controls .video-link {
  position: relative;
  margin: var(--space-small);
}
</style>
