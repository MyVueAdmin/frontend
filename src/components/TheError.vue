<template>
  <TheModalBase
    v-bind:header = "$dict.get().servererror"
    v-bind:body = "message"
    v-bind:footer = "query"
    class = "modal-error"
    @close = "close()"
  />
</template>

<script>
import TheModalBase from './TheModalBase'
export default {
  name: 'TheError',
  components: { TheModalBase },
  computed: {
    message () {
      if (!this.error) return null
      return this.error.message
    },
    query () {
      if (!this.error) return null
      return this.error.query ? this.error.query.query : ''
    },
    error () { return this.$store.state.error }
  },
  methods: {
    close() {
      this.$store.commit('error', null)
    }
  }
}
</script>
