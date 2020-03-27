<template>
  <div class="container">
    <div ref="videoContainer" class="video-container">
      <transition name="fade">
        <vue-webrtc
          v-show="showVideos"
          ref="video"
          width="100%"
          :socket-u-r-l="'https://telekneipe-server.classen.rocks/'"
          :room-id="roomId"
          :camera-height="videoHeight"
          class="videos"
          @opened-room="openedRoom"
          @joined-room="joinedRoom"
          @left-room="leftRoom"
        >
        </vue-webrtc>
      </transition>
    </div>
    <audio
      ref="soundBeer"
      preload="true"
      class="sound beer"
      src="/sounds/beer.mp3"
    ></audio>
    <audio
      ref="soundDoor"
      preload="true"
      class="sound door"
      src="/sounds/door.mp3"
    ></audio>
  </div>
</template>

<script>
import * as io from 'socket.io-client'
window.io = io
export default {
  data() {
    return {
      roomId: this.$route.params.id,
      loaded: false,
      videoHeight: 'auto',
      loadedAudio: false,
      playing: false,
      showVideos: false
    }
  },
  mounted() {
    this.$refs.soundBeer.addEventListener('canplay', this.canPlayAudio())
    this.$refs.soundDoor.addEventListener('canplay', this.canPlayAudio())
    if (this.$store.getters.getInvitation) {
    } else {
      this.joinRoom()
    }
  },
  methods: {
    canPlayAudio() {
      this.loadedAudio = true
    },
    isPlaying() {
      this.playing = !this.playing
    },
    joinRoom() {
      this.$refs.video.join()
      this.$store.commit(
        'setVideoLink',
        window.location.origin + '?roomId=' + encodeURIComponent(this.roomId)
      )
    },
    leaveRoom() {
      this.$refs.video.leave()
      this.showControls = true
      this.showVideos = false
    },
    openedRoom(video) {},
    joinedRoom(video) {
      this.showVideos = true
      if (this.loadedAudio === true) this.$refs.soundBeer.play()
    },
    leftRoom(video) {
      if (this.loadedAudio === true) this.$refs.soundDoor.play()
    }
  },
  /* ToDo load socket local */
  head() {
    return {
      title: this.roomId + ' Telekneipe'
    }
  }
}
</script>

<style scoped>
.video-container {
  width: 100%;
}
.videos.video-list {
  background: transparent !important;
  padding: var(--space-medium);
  display: grid;
  flex-wrap: wrap;
  justify-content: space-around;
  display: grid;
  grid-gap: 4em 2em;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.sound {
  visibility: hidden;
}

.videos.video-list .video-item {
  background: transparent !important;
}
.videos.video-list .video-item video {
  max-width: 100%;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  will-change: opacity;
  transition: opacity var(--transition-default);
}
@media screen and (max-width: 992px) {
  .videos.video-list {
    grid-template-columns: repeat(auto-fit, 136px);
    grid-gap: var(--space-small);
  }
}
</style>
