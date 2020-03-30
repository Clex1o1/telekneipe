export const state = () => ({
  videoLink: null,
  invitation: false,
  roomId: null,
  joinded: false
})
export const mutations = {
  setInvitation(state) {
    state.invitation = true
  },
  resetInvitation(state) {
    state.invitation = false
  },
  setJoined(state) {
    state.invitation = true
  },
  resetJoined(state) {
    state.invitation = false
  },
  setRoomId(state, payload) {
    state.roomId = payload
  },
  setVideoLink(state, payload) {
    state.videoLink = payload
  }
}
export const getters = {
  getInvitation(state) {
    return state.invitation
  },
  getRoomId(state) {
    return state.roomId
  },
  getVideoLink(state) {
    return state.videoLink
  },
  getJoined(state) {
    return state.joined
  }
}
