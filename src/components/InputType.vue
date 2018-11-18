<template>
  <!-- <div v-bind:title='valueRaw' v-bind:value='value' v-on:input='$emit("input", valueRaw)' >-->
  <div>
    <InputSelect
      v-bind:options = "types"
      v-bind:disabled = "disabled"
      v-bind:value = "parts.name"
      class = "part part-0"
      @input = "updateName" />
    <div
      v-if="editor"
      class="type-more">
      <component
        v-if = "editor"
        v-bind:is = "editor"
        v-bind:length = "parts.length"
        v-bind:attribute = "parts.attribute"
        @length = "updateLength"
        @attribute = "updateAttribute"
      />
    </div>
</div></template>

<script>
import InputSelect from './InputSelect'
import InputTypeNumeric from './InputTypeNumeric'
import InputTypeChar from './InputTypeChar'
import InputTypeEnum from './InputTypeEnum'
export default {
  name: 'InputType',
  components: { InputSelect, InputTypeChar, InputTypeNumeric, InputTypeEnum },
  props: {
    value: { type: String, required: false, default: null },
    disabled: { type: Boolean, required: false, default: false }
  },
  computed: {
    types () { return Object.assign([], this.$store.state.parser.mysql.types) },
    editor () {
      var type = this.types.find(val => val.value === this.parts.name)
      if (!type) return null
      switch (type.block) {
      case 'numeric':
      case 'decimal':
        return 'InputTypeNumeric'
      case 'char':
        return 'InputTypeChar'
      case 'sets':
        return 'InputTypeEnum'
      default:
        return null
      }
    },
    parts() {
      var out = { name: null, length: null, attribute: null }
      var val = !this.value ? '' : this.value.toString()
      var arr = val.split('(', 2)
      var name = arr[0]
      var params = !arr[1] ? '' : arr[1]
      out.name = name
      var type = this.types.find(val => val.value === name)
      if (!type) return out
      switch (type.block) {
      case 'numeric':
      case 'decimal':
      case 'char':
        var arr2 = params.split(')',2)
        out.length = arr2[0]
        out.attribute = arr2[1] ? arr2[1].substr(1) : null
        break;
      case 'sets':
        out.length = params.substr(0,params.length-1)
        break;
      }
      return out
    }
  },
  methods: {
    updateName(val) { this.changeValue(val, 'name') },
    updateAttribute(val) { this.changeValue(val, 'attribute') },
    updateLength(val) { this.changeValue(val, 'length') },
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
    changeValue (val, what) {
      var parts = Object.assign({}, this.parts)
      var arr = []
      parts[what] = val
      arr.push(parts.name)
      if (parts.length !== null && parts.length != 0) {
        arr.push(`(${parts.length})`)
      }
      if (parts.attribute !== null) {
        arr.push(` ${parts.attribute}`)
      }
      this.$emit('input', arr.join(''))
    }
  }
}
</script>

<style scoped>
  .input-typeMysql {
    height:auto !important;
    text-indent: 0;
    border:none;
  }
  .part {
    /* float:left !important; */
  }
  .part-0 {width:100%;}
  .part-1 {
    /* width:40px; */
  }

  .part-values {
   /* width:130px;*/
  }

  .type-more {
    margin-top:1px;
    float:none;
    overflow:hidden;
  }
</style>
