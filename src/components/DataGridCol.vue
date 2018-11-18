<template>
  <td v-if = "noEmpty"> {{ value | notTooLong }} </td>
  <td
    v-else
    class="no-value"> — </td>
</template>

<script>
export default {
  name: 'DataGridCol',
  filters: {
    notTooLong (strIn) {
      var max = 32
      if (strIn && strIn.length > max) {
        return strIn.substr(0, max) + '...'
      }
      return strIn
    }
  },
  props: {
    value: { type: [String, Number, Array, Object, Boolean], required: false, default: '' }
  },
  computed: {
    noEmpty () {
      return !(this.value === '' || this.value === null)
    }
  },
}
</script>

<style scoped>
  .no-value {
    text-align:center;
    color:#bbb;
  }
</style>
