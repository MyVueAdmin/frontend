<template><div>Loading...</div></template>

<script>
export default {
  name: 'Check',
  mounted () {
    if (this.$storage.hasItem('server')) {
      this.$store.commit('server', this.$storage.getItem('server'))
    }
    this.$connection.check()
  }
}
</script>

<style scoped>
div {
  position: fixed;
  top: 10%;
  font-size: 24pt;
  color: #e5e5e5;
  font-style: italic;
  width: 100%;
  text-align: center;
}
</style>
