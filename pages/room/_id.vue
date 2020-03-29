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
          :class="'videos ' + videoCountClass"
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
    <controls
      :should-show-controls="showingControls || showingControlsBlocking"
      @blockHiding="showingControlsBlocking = true"
      @hide="showingControlsBlocking = false"
      @toggleSound="toggleSound"
      @leaveGoBack="leaveGoBack"
      @leaveGotoHome="leaveGotoHome"
    />
  </div>
</template>

<script>
import * as io from 'socket.io-client'
window.io = io

export default {
  components: {
    Controls: () => import('@/components/controls/Controls')
  },
  data() {
    return {
      roomId: this.$route.params.id,
      videoHeight: 'auto',
      loadedAudio: false,
      playing: false,
      showVideos: false,
      showingControls: false,
      showingControlsBlocking: false
    }
  },
  computed: {
    localVideoId() {
      return this.$refs.video.localVideo.id
    },
    videos() {
      if (typeof this.$refs.video !== 'undefined')
        return this.$refs.video.$refs.videos
      else return 0
    },
    videoCountClass() {
      if (this.videos.length > 2) {
        return 'flex-1-1-50'
      } else {
        return 'flex-1-1-100'
      }
    }
  },
  mounted() {
    if (this.$store.getters.getInvitation) {
    } else if (this.roomId) {
      this.joinRoom()
    } else {
      this.$router.push('/')
    }
    this.$refs.soundBeer.addEventListener('canplay', this.canPlayAudio)
    this.$refs.soundDoor.addEventListener('canplay', this.canPlayAudio)
    document.addEventListener('mousemove', this.showControls)
  },
  updated() {
    if (typeof this.$refs.video.$refs.videos !== 'undefined') {
      this.$refs.video.$refs.videos.map(($v) => {
        $v.controls = false
      })
    }
  },
  beforeDestroy() {
    this.$refs.soundBeer.removeEventListener('canplay', this.canPlayAudio)
    this.$refs.soundDoor.removeEventListener('canplay', this.canPlayAudio)
    document.removeEventListener('mousemove', this.showControls)
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
    },
    openedRoom(video) {},
    joinedRoom(video) {
      this.showVideos = true
      if (this.loadedAudio === true) this.$refs.soundBeer.play()
    },
    leftRoom(video) {
      if (this.loadedAudio === true) this.$refs.soundDoor.play()
    },
    showControls() {
      setTimeout(() => {
        this.showingControls = false
      }, 5000)
      this.showingControls = true
    },
    toggleSound(sound) {
      this.videos.map((item) => {
        if (item.id !== this.localVideoId) item.muted = !sound
      })
    },
    leaveGoBack() {
      this.leaveRoom()
      this.$router.go(-1)
    },
    leaveGotoHome() {
      this.leaveRoom()
      this.$router.push('/')
    }
  },
  /* ToDo load socket local */
  head() {
    return {
      title: this.roomId + ' Telekneipe'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.leaveRoom()
    next()
  }
}
</script>

<style scoped>
.video-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
}
.sound {
  visibility: hidden;
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
</style>
<style>
/* unscoped styles for vue-webrtc */
.videos.video-list {
  background: transparent !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.videos.video-list .video-item {
  background: transparent !important;
  object-fit: cover;
}
.videos.video-list .video-item video {
  max-width: 100%;
  -webkit-border-radius: 1px;
  border-radius: 1px;
}
@media screen and (max-width: 992px) {
  .videos.video-list {
  }
}
</style>
