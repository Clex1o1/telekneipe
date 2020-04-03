<template>
  <client-only placeholder="Loading...">
    <div class="video-list">
      <div
        v-for="item in videoList"
        :key="item.id"
        :video="item"
        class="video-item"
      >
        <video
          :id="item.id"
          ref="videos"
          controls
          autoplay
          playsinline
          :height="cameraHeight"
          :muted="item.muted"
        ></video>
      </div>
    </div>
  </client-only>
</template>

<script>
import * as io from 'socket.io-client'
import RTCMultiConnection from 'rtcmulticonnection'

if (process.client) {
  window.io = io
  require('adapterjs')
}

export default {
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
    }
  },
  data() {
    return {
      rtcmConnection: null,
      localVideo: null,
      videoList: [],
      canvas: null
    }
  },
  watch: {
    rtcmConnection(newVal, oldval) {
      console.log(oldval)
      console.log(newVal)
    }
  },
  mounted() {
    const that = this

    this.rtcmConnection = new RTCMultiConnection()
    this.rtcmConnection.socketURL = this.socketURL
    this.rtcmConnection.autoCreateMediaElement = false
    this.rtcmConnection.enableLogs = this.enableLogs
    this.rtcmConnection.session = {
      audio: this.enableAudio,
      video: this.enableVideo
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
          muted: stream.type === 'local'
        }

        that.videoList.push(video)

        if (stream.type === 'local') {
          that.localVideo = video
        }
      }

      setTimeout(function() {
        for (let i = 0, len = that.$refs.videos.length; i < len; i++) {
          if (that.$refs.videos[i].id === stream.streamid) {
            that.$refs.videos[i].srcObject = stream.stream
            break
          }
        }
      }, 1000)

      that.$emit('joined-room', stream.streamid)
    }
    this.rtcmConnection.onstreamended = function(stream) {
      const newList = []
      that.videoList.forEach(function(item) {
        if (item.id !== stream.streamid) {
          newList.push(item)
        }
      })
      that.videoList = newList
      that.$emit('left-room', stream.streamid)
    }
    console.log(this.rtcmConnection)
    this.rtcmConnection.onmessage = function(e) {
      console.log(e)
    }
  },
  methods: {
    join() {
      const that = this
      this.rtcmConnection.openOrJoin(this.roomId, function(
        isRoomExist,
        roomid
      ) {
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
    }
  }
}
</script>
<style scoped>
.video-list div {
  padding: 0px;
}
.video-item {
  display: inline-block;
}
</style>
