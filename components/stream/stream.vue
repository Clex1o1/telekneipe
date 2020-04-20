<template>
  <client-only placeholder="Loading...">
    <div class="video-list">
      <videoItem
        v-for="item in videoList"
        :id="item.id"
        :key="item.id"
        ref="videos"
        :is-local-video="item.id === localVideo.id"
        :camera-height="cameraHeight"
        :muted="item.muted"
        :stream="item.stream"
        :controls="controls"
        @sendAction="sendAction"
      />
    </div>
  </client-only>
</template>

<script>
import * as io from 'socket.io-client'
import RTCMultiConnection from 'rtcmulticonnection'
import videoItem from './videoItem'

if (process.client) {
  window.io = io
  require('adapterjs')
}

export default {
  components: { videoItem },
  props: {
    roomId: {
      type: String,
      default: 'public-room'
    },
    socketURL: {
      type: String,
      default: 'https://telekneipe-server.classen.rocks/'
    },
    cameraHeight: {
      type: [Number, String],
      default: 160
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    enableAudio: {
      type: Boolean,
      default: true
    },
    enableVideo: {
      type: Boolean,
      default: true
    },
    enableLogs: {
      type: Boolean,
      default: false
    },
    enableData: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rtcmConnection: null,
      localVideo: null,
      videoList: []
    }
  },
  watch: {},
  mounted() {
    window.addEventListener('beforeunload', this.quit)
    window.addEventListener('pagehide', this.quit)
    const that = this

    this.rtcmConnection = new RTCMultiConnection()
    this.rtcmConnection.socketURL = this.socketURL
    this.rtcmConnection.autoCreateMediaElement = false
    this.rtcmConnection.enableLogs = this.enableLogs
    this.rtcmConnection.session = {
      audio: this.enableAudio,
      video: this.enableVideo,
      data: this.enableData
    }
    this.rtcmConnection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: this.enableAudio,
      OfferToReceiveVideo: this.enableVideo
    }
    this.rtcmConnection.onstream = function(stream) {
      const found = that.videoList.find((video) => {
        return video.id === stream.streamid
      })
      if (found === undefined) {
        const video = {
          id: stream.streamid,
          muted: stream.type === 'local',
          stream: stream.stream
        }

        that.videoList.push(video)

        if (stream.type === 'local') {
          that.localVideo = video
        }
      }
      // console.log(that.rtcmConnection.getRemoteStreams())
      that.$emit('joined-room', stream.streamid)
    }
    this.rtcmConnection.onstreamended = function(stream) {
      // console.log(stream)
      const newList = []
      that.videoList.forEach(function(item) {
        if (item.id !== stream.streamid) {
          newList.push(item)
        }
      })
      that.videoList = newList
      that.$emit('left-room', stream.streamid)
    }
    this.rtcmConnection.onmessage = function(e) {
      that.$emit('onmessage', e)
    }
    this.rtcmConnection.onerror = function(e) {
      that.$emit('error', e)
    }
    this.rtcmConnection.onMediaError = function(e) {
      that.$emit('erro', e)
    }
  },
  beforeDestroy() {
    /* ToDo which is the real total disconnect? */
    this.quit()
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.quit)
    window.removeEventListener('pagehide', this.quit)
  },
  methods: {
    join() {
      const that = this
      this.rtcmConnection.openOrJoin(this.roomId, function(
        isRoomExist,
        roomid,
        error
      ) {
        if (error) {
          that.$emit('error', error)
        }
        if (isRoomExist === true && that.rtcmConnection.isInitiator === true) {
          that.$emit('opened-room', roomid)
        }
      })
    },
    leave() {
      this.rtcmConnection.attachStreams.forEach(function(localStream) {
        localStream.stop()
      })
      this.videoList = []
    },
    sendAction(event) {
      this.$emit('sendAction', event)
    },
    quit() {
      this.rtcmConnection.attachStreams.forEach(function(localStream) {
        localStream.stop()
      })
      this.videoList = []
      if (this.rtcmConnection) {
        this.rtcmConnection.disconnect()
        this.rtcmConnection.close()
        this.rtcmConnection.closeSocket()
      }
    }
  }
}
</script>
<style scoped>
.video-list {
  perspective: 100px;
}
.video-list div {
  padding: 0px;
}
.video-item {
  display: inline-block;
}
</style>
