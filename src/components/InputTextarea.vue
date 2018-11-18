<template>
  <textarea
    ref = "input"
    v-bind:disabled = "disabled"
    v-model = "valueRaw"
    type = "text"
  />
</template>

<script>
export default {
  name: 'InputTextarea',
  props: {
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false }
  },
  data: function () { return { valueRaw: this.value } },
  computed: {},
  watch: {
    value: function () { this.valueRaw = this.value },
    valueRaw: function () {
      this.$emit('input', this.valueRaw)
    }
  },
  mounted () {
    if (this.$refs['input']) {
      var offset = this.$refs.input.offsetHeight
      var scroll = this.$refs.input.scrollHeight
      var line = 18
      if (offset > 0) {
        var k = scroll / line
        var margin = Math.abs(scroll - Math.round(k) * line)
        k = Math.min(k, 5)
        if (k > 1) {
          this.$refs.input.style.height = (line*k + margin) + "px"
        }
      }
    }
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) }
  },
}
</script>

<style scoped>
  textarea {
    min-width:200px;
    min-height:20px;
    height: 25px;
    text-indent:0;
    padding:2px 3px;
    line-height:18px;
    box-sizing:border-box;
  }
</style>