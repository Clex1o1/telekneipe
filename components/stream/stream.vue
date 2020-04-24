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
      videoList: [],
      participants: []
    }
  },
  mounted() {
    /* INIT */
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
    /* ice server config */
    this.rtcmConnection.iceServers = []

    // second step, set STUN url
    this.rtcmConnection.iceServers.push({
      urls: 'stun:turn.classen.rocks:3478'
    })

    // last step, set TURN url (recommended)
    this.rtcmConnection.iceServers.push({
      urls: 'turn:turn.classen.rocks:5349',
      credential: 'crape-join-scherzo',
      username: 'alexander'
    })

    // Start handling for connections and events
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
      that.$emit('joinedRoom', stream.streamid)
    }
    this.rtcmConnection.onstreamended = function(stream) {
      const newList = []
      that.videoList.forEach(function(item) {
        if (item.id !== stream.streamid) {
          newList.push(item)
        }
      })
      that.videoList = newList
      that.$emit('leftRoom', stream.streamid)
    }
    this.rtcmConnection.onmessage = function(e) {
      that.$emit('onmessage', e)
    }

    /* Fix safari leave */
    this.rtcmConnection.onleave = function(participant) {
      that.rtcmConnection.getAllParticipants().forEach((participantId) => {
        if (participantId === participant.userid) {
          const user = that.rtcmConnection.peers[participantId]
          const newList = []
          user.peer.getRemoteStreams().forEach((streamItem) => {
            that.videoList.forEach(function(item) {
              if (item.id !== streamItem.streamid) {
                newList.push(item)
              }
            })
            that.$emit('leftRoom', streamItem.streamid)
          })
          that.videoList = newList
        }
      })
    }
    this.rtcmConnection.onclose = function(e) {
      that.$emit('close', e)
    }
    this.rtcmConnection.onerror = function(e) {
      that.$emit('error', e)
    }
    this.rtcmConnection.onMediaError = function(e) {
      that.$emit('error', e)
    }
    this.rtcmConnection.onNewParticipant = function(
      participantId,
      userPreferences
    ) {
      that.rtcmConnection.acceptParticipationRequest(
        participantId,
        userPreferences
      )
      that.$set(that.participants, participantId, { participantId })
    }
  },
  beforeDestroy() {
    /* ToDo which is the real total disconnect? */
    this.quit()
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
          that.$emit('openedRoom', roomid)
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
