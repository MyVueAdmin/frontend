<template>
  <InputSwitch
    v-bind:items = "onpages"
    v-bind:current = "onpage"
    v-model = "onpage"
  />
</template>

<script>
import InputSwitch from './InputSwitch'
export default {
  name: 'TheHeaderMenuPages',
  components: { InputSwitch },
  computed: {
    onpages() {
      return this.$store.state.constants.onpages
    },
    onpage: {
      get() { return this.$store.state.onpage },
      set(val) {
        this.$storage.setItem('onpage', val)
        this.$store.commit('onpage', val)
      }
    }
  }
}
</script>