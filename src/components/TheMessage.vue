<template>
  <TheModalBase
    v-bind:header = "message.header"
    v-bind:body = "message.body"
    v-bind:footer = "message.footer"
    class = "modal-message"
    @close = "close()"
  />
</template>

<script>
import TheModalBase from './TheModalBase'
export default {
  name: 'TheMessage',
  components: { TheModalBase },
  computed: {
    message () { return this.$store.state.message }
  },
  methods: {
    close() {
      this.$store.commit('message', null)
    }
  }
}
</script>
