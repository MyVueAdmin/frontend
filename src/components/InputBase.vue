<template>
  <InputNumber
    v-if = "is(&quot;int&quot;)"
    v-model.number = "valueRaw"
    v-bind = "parameters" />
  <InputDatetime
    v-else-if = "is(&quot;datetime&quot;)"
    v-model = "valueRaw"
    v-bind = "parameters" />
  <InputDatetimeRange
    v-else-if = "is(&quot;datetimeRange&quot;)"
    v-model = "valueRaw"
    v-bind = "parameters" />
  <input
    v-else-if = "is(&quot;date&quot;)"
    v-model = "valueRaw"
    v-bind = "parameters"
    class="date"
    type="date" >
  <InputTextarea
    v-else-if = "is('textarea')"
    v-model = "valueRaw"
    v-bind = "parameters" />
  <InputSelect
    v-else-if = "is('enum')"
    v-model = "valueRaw"
    v-bind = "parameters" />
  <InputType
    v-else-if = "is('typeMysql')"
    v-model = "valueRaw"
    v-bind = "parameters" />
  <InputText
    v-else
    v-model = "valueRaw"
    v-bind = "parameters" />
</template>

<script>
import InputDatetimeRange from './InputDatetimeRange'
import InputDatetime from './InputDatetime'
import InputSelect from './InputSelect'
import InputNumber from './InputNumber'
import InputText from './InputText'
import InputType from './InputType'
import InputTextarea from './InputTextarea'
export default {
  name: 'InputBase',
  components: {InputTextarea, InputText, InputNumber, InputDatetime, InputDatetimeRange, InputSelect, InputType},
  props: {
    type: { type: String, default: 'text', required: false },
    value: { type: [ String, Number, Boolean, Object, Array ], default: '', required: false },
    disabled: { type: Boolean, default: false, required: false },
    options: { type: [Array, Object], default: () => [], required: false },
    placeholder: { type: String, default: '', required: false }
  },
  data: function () { return { valueRaw: this.value } },
  computed: {
    parameters () {
      return {
        class: ['input-base', 'input-' + this.type, {disabled: this.disabled}],
        ref: 'input',
        options: this.options,
        placeholder: this.placeholder,
        disabled: this.disabled
      }
    }
  },
  watch: {
    value: function () { this.valueRaw = this.value },
    valueRaw: function () { this.$emit('input', this.valueRaw) }
  },
  methods: {
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
    is (type) { return type === this.type }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

  .input-base,
  .input-base input,
  .input-base select,
  .input-base textarea
  {
    background: $color-ui-0;
    margin: 0;
    padding: 0;
    font-size: 10pt;
    min-height: 24px;
    height: 24px;
    line-height: 24px;
    text-indent: 5px;
    outline: none;
    outline-offset: 0;
    border: solid $color-act-light 1px;
    font-size: 12px;
  }

  .input-base:focus,
  .input-base input:focus,
  .input-base select:focus,
  .input-base textarea:focus
  {
    border-color:$color-act-mid;

  }

  .input-base select {
    height:26px;
    line-height:26px;
  }

  input:disabled, .input-base.disabled {
    background: $color-ui-pale;
    color: $color-ui-4;
    border-color:$color-ui-pale;
  }

  select option {
    display:block;
  }

  .input-base input.date,
  .input-base input.time {
    text-align: left;
    border: none;
    outline: none;
    float: left;
  }

  .input-base input.date {width:150px; border-right:solid 1px $color-ui-main;}
  .input-base input.time {width:100px; }
</style>
