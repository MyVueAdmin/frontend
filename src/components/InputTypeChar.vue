<template>
  <div>
    <InputNumber
      ref = "input"
      v-bind:disabled = "disabled"
      v-model = "lengthModel"
      placeholder="Size"
      class = "part part-1" />
  </div>
</template>

<script>
import InputNumber from './InputNumber'
export default {
  name: 'InputType',
  components: { InputNumber },
  props: {
    length: { type: [Number, String], required: false, default: null },
    disabled: { type: Boolean, required: false, default: false }
  },
  computed: {
    lengthModel: {
      get () { return this.length },
      set (val) { this.$emit('length', val) }
    },
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
  }
}
</script>
