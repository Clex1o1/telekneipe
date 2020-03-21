<template>
  <div class="container">
    <header :class="'header ' + (!showVideos ? '' : 'header-videos')">
      <h1 v-if="invitation" class="headline">{{ roomId }}</h1>
      <div class="logo">
        <img
          class="logo-an"
          src="images/Telekneipe-Logo-AN.png"
          alt="Telekneipe Logo an"
        />
        <img
          class="logo-aus"
          src="images/Telekneipe-Logo-AUS.png"
          alt="Telekneipe Logo aus"
        />
      </div>
      <h1 v-if="invitation" class="headline">Telekneipe</h1>
    </header>
    <div v-if="!showVideos" class="join-screen">
      <h3 class="sub-headline">{{ joinTitle }}</h3>
      <input v-model="roomId" type="text" name="room-id" class="text-input" />
      <button class="button" @click="joinRoom">{{ joinButtonTitle }}</button>
    </div>
    <div :class="'controls ' + (showControls ? 'open' : 'close')">
      <div class="controls-form">
        <h1 v-if="$mq !== 'lg'" class="headline">{{ roomId }} Telekneipe</h1>
        <h3 class="sub-headline">{{ joinTitle }}</h3>
        <input v-model="roomId" type="text" name="room-id" class="text-input" />
        <button class="button" @click="joinRoom">{{ joinButtonTitle }}</button>
        <button class="button" @click="leaveRoom">
          Nach hause torkeln
        </button>
        <button
          v-show="videoLink"
          v-clipboard="() => videoLink"
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
        <nuxt-link to="thanks" class="link">Danke</nuxt-link>
      </div>
      <button class="button-control" @click="showControls = !showControls">
        <span class="menu-string menu-string-1"></span>
        <span class="menu-string menu-string-2"></span>
        <span class="menu-string menu-string-3"></span>
      </button>
    </div>
    <transition name="fade">
      <div ref="videoContainer" class="video-container">
        <vue-webrtc
          v-if="loaded"
          v-show="showVideos"
          ref="video"
          width="100%"
          :room-id="roomId"
          :camera-height="videoHeight"
          class="videos"
          @opened-room="openedRoom"
          @joined-room="joinedRoom"
          @left-room="leftRoom"
        >
        </vue-webrtc>
      </div>
    </transition>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  components: {},
  data: () => ({
    uuidv4,
    loaded: false,
    uuid: '0',
    roomId: 'westwerk',
    showControls: false,
    showVideos: false,
    videoLink: '',
    videoHeight: 'auto',
    ownVideo: '',
    videoIds: [],
    shareMessage: false
  }),
  computed: {
    invitation() {
      return (
        typeof this.$route.query.roomId !== 'undefined' &&
        this.$route.query.roomId !== ''
      )
    },
    joinTitle() {
      if (this.invitation) {
        return (
          'Du wurdest auf ein Bier in ' +
          this.roomId +
          ' Telekneipe eingeladen.'
        )
      } else return 'Erstelle deine Telekneipe'
    },
    joinButtonTitle() {
      if (this.invitation) {
        return 'An den Tisch setzen'
      } else return 'Kneipe öffnen'
    },

    videos() {
      if (typeof this.$refs.video !== 'undefined') {
        if (typeof this.$refs.video.videoList !== 'undefined') {
          return this.$refs.video.videoList.length || 0
        } else {
          return 0
        }
      } else {
        return false
      }
    }
  },
  mounted() {
    this.uuid = uuidv4()
    if (this.invitation) {
      this.roomId = this.$route.query.roomId
    }
  },
  methods: {
    joinRoom() {
      this.$refs.video.join()
      this.showControls = false
      this.videoLink = window.location.origin + '?roomId=' + this.roomId
    },
    leaveRoom() {
      this.$refs.video.leave()
      this.showControls = true
    },
    openedRoom(video) {},
    joinedRoom(video) {
      if (this.videos > 0) {
        this.showVideos = true
      }
      this.$refs.video.videoList.map(($k) => {
        this.videoIds.push($k.id)
      })
    },
    leftRoom(video) {},
    linkCopied() {
      this.shareMessage = true
      window.setTimeout(() => {
        this.shareMessage = false
      }, 3000)
    }
  },
  /* ToDo load socket local */
  head() {
    return {
      title: this.roomId + ' Telekneipe',
      script: [
        {
          hid: 'socket.io',
          src: '/socket.io.min.js',
          defer: true,
          // Changed after script load
          callback: () => {
            this.loaded = true
          }
        }
      ]
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: url(/images/brickwall-pattern.jpg);
  min-height: 100vh;
}
.join-screen {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: var(--space-small);
}
.join-screen > * {
  margin: var(--space-medium) 0;
}
.join-screen .text-input {
  font-size: var(--font-size-medium);
  font-weight: bold;
  width: 300px;
}
.headline {
  width: 100%;
  text-align: center;
  margin: var(--space-medium) 0;
}
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
.videos.video-list .video-item {
  background: transparent !important;
}
.videos.video-list .video-item video {
  max-width: 100%;
}
.header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: var(--space-small) 0;
  flex-wrap: wrap;
}
.header .headline {
  width: auto;
  margin: 0 var(--space-small);
}
.header-videos {
  position: absolute;
  top: 0;
}
.header-videos .logo {
  height: 5vw;
  width: 5vw;
  min-width: 50px;
  min-height: 50px;
}
.logo {
  height: 20vw;
  width: 20vw;
  min-width: 150px;
  min-height: 150px;
  position: relative;
}
.logo .logo-aus {
  animation: logo 10s infinite ease;
}
.logo img {
  position: absolute;
  width: 100%;
  height: 100%;
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
.tooltip {
  position: absolute;
  font-size: 0.8em;
  background: var(--color-text);
  padding: 2px 4px;
  left: 50%;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.27);
  transform: translate(-50%, -100%);
}
.tooltip-enter,
.tooltip-leave-to {
  opacity: 0;
  transform: translate(-50%, 0%);
}

.tooltip-enter-active,
.tooltip-leave-active {
  will-change: opacity, transform;
  transition: opacity var(--transition-default),
    transform var(--transition-default);
}
@media screen and (max-width: 992px) {
  .header .headline {
    display: none;
  }
  .controls {
    width: 100vw;
  }
  .controls.open .button-control {
    transform: translate(-200%, 0);
  }
  .videos.video-list {
    grid-template-columns: repeat(auto-fit, 136px);
    grid-gap: var(--space-small);
  }
}
@keyframes logo {
  0% {
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  2% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  11% {
    opacity: 1;
  }
  12% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  31% {
    opacity: 1;
  }
  32% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
