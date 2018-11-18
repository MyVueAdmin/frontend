<template>
  <div>
    <InputNumber
      ref = "input"
      v-bind:disabled = "disabled"
      v-model = "lengthModel"
      placeholder="Size"
      class = "part part-1" />
    <InputSelect
      v-bind:options = "unsigneds"
      v-bind:disabled = "disabled"
      v-model = "attributeModel"
      class = "part part-2" />
  </div>
</template>

<script>
import InputSelect from './InputSelect'
import InputNumber from './InputNumber'
export default {
  name: 'InputType',
  components: { InputSelect, InputNumber },
  props: {
    length: { type: [Number, String], required: false, default: null },
    attribute: { type: String, required: false, default: null },
    disabled: { type: Boolean, required: false, default: false }
  },
  computed: {
    unsigneds: () => ['', 'unsigned', 'unsigned zerofill'],
    lengthModel: {
      get () { return this.length },
      set (val) { this.$emit('length', val) }
    },
    attributeModel: {
      get () { return this.attribute },
      set (val) { this.$emit('attribute', val) }
    },
    typeEnum: {
      get () { return this.parts.length },
      set (val) { this.changeValue(val, 'length') }
    }
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
  }
}
</script>
