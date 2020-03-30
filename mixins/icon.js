const icon = {
  methods: {
    blockHiding() {
      this.$emit('blockHiding')
    },
    hide() {
      this.$emit('hide')
    }
  }
}
export { icon }
