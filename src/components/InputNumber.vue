<template>
  <input
    ref = "input"
    v-bind:disabled = "disabled"
    v-model.number = "valueRaw"
    type = "number"
  >
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false }
  },
  data: function () { return { valueRaw: this.value } },
  computed: {},
  watch: {
    value: function () { this.valueRaw = this.value },
    valueRaw: function () { this.$emit('input', this.valueRaw) }
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) }
  }
}
</script>
