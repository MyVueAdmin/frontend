<template>
  <TheModalBase
    v-bind:header = "$dict.get().servererror"
    v-bind:body = "error.message"
    v-bind:footer = "error.query.query"
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
    error () { return this.$store.state.error }
  },
  methods: {
    close() {
      this.$store.commit('error', null)
    }
  }
}
</script>
