<template>
  <div
    v-bind:title="valueRaw"
    v-bind:value="value"
    class="datetime-range"
    @input="$emit('input', valueRaw)" >
    <InputDatetime
      ref="input"
      v-bind:disabled="disabled"
      v-model="valueRaw1" />
    <InputDatetime
      v-bind:disabled="disabled"
      v-model="valueRaw2" />
  </div>
</template>

<script>
import InputDatetime from './InputDatetime'
export default {
  name: 'InputDatetimeRange',
  components: {InputDatetime},
  props: {
    value: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  data: function () { return { valueRaw: this.value } },
  computed: {
    valueRaw1: {
      get: function () {
        if (!this.valueRaw) return ''
        var arr = this.valueRaw.toString().split(';')
        return arr[0]
      },
      set: function (val) { this.valueRaw = this.valueRawBuild(val, this.valueRaw2) }
    },
    valueRaw2: {
      get: function () {
        if (!this.valueRaw) return ''
        var arr = this.valueRaw.toString().split(';')
        return arr[1]
      },
      set: function (val) { this.valueRaw = this.valueRawBuild(this.valueRaw1, val) }
    }
  },
  watch: {
    value: function () { this.valueRaw = this.value }
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
    valueRawBuild (value1, value2) {
      if (!value1 && value2) {
        value1 = value2
      } else if (value1 && value2) {
        var t1 = this.$tools.mysql2date(value1).getTime()
        var t2 = this.$tools.mysql2date(value2).getTime()
        if (t1 > t2) return [value2, value1].join(';')
      }

      return [value1, value2].join(';')
    }
  }
}
</script>

<style scoped>
  input.date {width: 200px; float:left; padding-right:0}
  input.time {width: 100px; float:left; border-left-width:0px; padding-right:0}
</style>
