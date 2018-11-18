<template>
  <InputSwitch
    v-bind:items = "langs"
    v-bind:current = "lang"
    v-model = "lang"
  />
</template>

<script>
import InputSwitch from './InputSwitch'
export default {
  name: 'TheHeaderMenuLangs',
  components: { InputSwitch },
  computed: {
    langs() {
      return this.$store.state.constants.langs
    },
    lang: {
      get() { return this.$store.state.lang },
      set(val) {
        this.$storage.setItem('lang', val)
        this.$store.commit('lang', val)
      }
    }
  }
}
</script>