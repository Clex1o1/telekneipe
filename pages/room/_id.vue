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
      <action-button
        v-for="videoItem in videoObjects"
        :key="videoItem.id"
        @sendAction="sendAction"
      />
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
if (process.client) {
  window.io = io
}

export default {
  components: {
    Controls: () => import('@/components/controls/Controls'),
    ActionButton: () => import('@/components/action-button')
  },
  data() {
    return {
      roomId: this.$route.params.id,
      videoHeight: 'auto',
      loadedAudio: false,
      playing: false,
      showVideos: false,
      showingControls: false,
      showingControlsBlocking: false,
      videos: [],
      videoObjects: {}
    }
  },
  computed: {
    roomRunning() {
      return typeof this.$refs.video !== 'undefined'
    },
    localVideoId() {
      return this.$refs.video.localVideo.id
    },
    videoCountClass() {
      if (this.videos.length > 8) {
        return 'grid-50-100 '
      } else if (this.videos.length > 2) {
        return 'grid-50'
      } else if (this.videos.length <= 1) {
        return 'grid-100'
      } else {
        return 'grid-100'
      }
    }
  },
  created() {
    if (this.roomId) {
      this.$store.commit('setRoomId', this.roomId)
    } else {
      this.$router.push('/')
    }
  },
  mounted() {
    if (this.roomId) {
      this.joinRoom()
    }
    this.$refs.soundBeer.addEventListener('canplay', this.canPlayAudio)
    this.$refs.soundDoor.addEventListener('canplay', this.canPlayAudio)
    document.addEventListener('mousemove', this.showControls)
    this.$refs.video.rtcmConnection.onmessage(this.handleAction)
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
      if (typeof this.$refs.video.$refs.videos !== 'undefined')
        this.videos = this.$refs.video.$refs.videos
      if (typeof this.$refs.video.videoList !== 'undefined')
        this.videoObjects = this.$refs.video.videoList
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
      if (this.videos.length) {
        this.videos.map((item) => {
          if (item.id !== this.localVideoId) item.muted = !sound
        })
      }
    },
    leaveGoBack() {
      if (this.roomRunning) {
        this.leaveRoom()
        this.$router.go(-1)
      }
    },
    leaveGotoHome() {
      if (this.roomRunning) {
        this.leaveRoom()
        this.$router.push('/')
      }
    },
    sendAction() {
      console.log('click')
      this.videoObjects.map(($v) => {
        console.log($v.id)
        this.$refs.video.rtcmConnection.send({ testtext: 'Hello' })
      })
    },
    handleAction(message) {
      console.log(1)
      console.log(message)
    }
  },
  head() {
    return {
      title: this.roomId + ' Telekneipe'
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.roomRunning) {
      this.leaveRoom()
    }
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
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
}

.videos.video-list .video-item {
  background: transparent !important;
  object-fit: cover;
}
.videos.video-list .video-item video {
  max-width: 100%;
  -webkit-border-radius: 1px;
  border-radius: 1px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: center center;
}
@media screen and (max-width: 992px) and (orientation: portrait) {
  .videos.video-list {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    max-height: 100vh;
  }
  .videos.video-list.grid-50 {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  }
  .videos.video-list.grid-50-100 {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
    max-height: 100%;
  }
}
@media screen and (max-width: 992px) and (orientation: landscape) {
  .videos.video-list {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  }
  .videos.video-list.grid-50 {
    grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
  }
}
</style>
