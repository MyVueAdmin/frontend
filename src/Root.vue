<template>
  <component v-bind:is = "view" />
</template>

<script>
import App from './views/App'
import Check from './views/Check'
import Login from './views/Login'
import Err404 from './views/Err404'
export default {
  name: 'Root',
  components: {App, Login, Check, Err404},
  computed: {
    view() {
      if (!this.$store.state.checked) return "Check"
      if (!this.$store.state.connected) return "Login"
      if (!this.$route.name) return "Err404"
      return "App"
    }
  }
}
</script>
