<template>
  <div
    v-bind:title="valueRaw"
    v-bind:value="value"
    class="datetime"
    @input="$emit(&quot;input&quot;, valueRaw)" >
    <input
      ref="input"
      v-bind:disabled="disabled"
      v-model="valueDate"
      class="date"
      type="date" >
    <input
      v-bind:disabled="disabled"
      v-model="valueTime"
      class="time"
      type="time" >
  </div>
</template>

<script>
export default {
  name: 'InputDatetime',
  props: {
    value: { type: String, required: false, default: null },
    disabled: { type: Boolean, required: false, default: false }
  },
  data: function () { return { valueRaw: this.value } },
  computed: {
    valueDate: {
      get: function () {
        if (!this.valueRaw) return ''
        var arr = this.valueRaw.toString().split(' ')
        if (arr[0] === '0000-00-00') arr[0] = ''
        return arr[0]
      },
      set: function (val) {
        this.valueRaw = this.valueRawBuild(val, this.valueTime)
      }
    },
    valueTime: {
      get: function () {
        if (!this.valueRaw) return ''
        var arr = this.valueRaw.toString().split(' ')
        return (arr.length > 1) ? arr[1] : ''
      },
      set: function (val) {
        this.valueRaw = this.valueRawBuild(this.valueDate, val)
      }
    }
  },
  watch: {
    value: function () { this.valueRaw = this.value }
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
    valueRawBuild (valueDate, valueTime) {
      var arr = []
      if (valueDate !== '') {
        arr.push(valueDate)
        if (valueTime !== '') arr.push(valueTime)
      }
      var ret = arr.join(' ')
      if (ret === '') ret = '0000-00-00 00:00:00'
      return ret
    }
  }
}
</script>
