<template>
  <select
    ref = "input"
    v-model = "valueRaw"
    v-bind:value = "getValue(value)"
    v-bind:disabled = "disabled" >
    <option
      v-for ="(item, index) in options"
      v-bind:key = "index"
      v-bind:value = "getValue(item)"
      v-html = "getLabel(item)" />
  </select>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    value: { type: [Object, String, Number], default: null },
    options: { type: [Object, Array], default: () => ({}) },
    disabled: { type: Boolean, default: false }
  },
  data: function () { return { valueRaw: this.value } },
  computed: {},
  watch: {
    value: function () { this.valueRaw = this.getValue(this.value) },
    valueRaw: function () { this.$emit('input', this.valueRaw) }
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
    getValue (item) {
      if (!item) return null
      if (typeof item === 'object' && item.value) return item.value
      return item
    },
    getLabel (item) {
      if (typeof item === 'object' && item.label) return item.label
      if (typeof item === 'object' && item.value) return item.value
      return item
    }
  }
}
</script>
