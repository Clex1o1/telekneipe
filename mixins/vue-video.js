const vueVideo = {
  methods: {
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
      if (this.loadedAudio === true) this.$refs.soundBeer.play()
    },
    leftRoom(video) {
      if (this.loadedAudio === true) this.$refs.soundDoor.play()
    }
  }
}
export { vueVideo }
