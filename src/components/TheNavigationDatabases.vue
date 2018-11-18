<template>
  <InputBase
    v-model = "database"
    v-bind:options = "databases"
    class = "select"
    type = "enum"
    value = "database"
  />
</template>

<script>
import InputBase from './InputBase'
export default {
  name: 'TheNavigationDatabases',
  components: { InputBase },
  computed: {
    database: {
      get() { return this.$route.params.database },
      set(val) { this.$router.push({name:'database-content', params: {database: val}}) }
    },
    databases () {
      return this.$store.state.databases
    }
  }
}
</script>

<style scoped>
  .select {
    width: 100%;
    margin: 0px 0 -2px 0;
    padding:0;
  }
</style>
