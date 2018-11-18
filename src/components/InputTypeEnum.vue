<template>
  <div class="enum-editor">
    <div
      v-if="!editorActive"
      class = "enum-editor-simple"
    >
      <InputText
        ref = "input"
        v-bind:disabled = "disabled"
        v-model = "lengthModel"
        placeholder="Set of values"
        class = "part part-1" />
      <LinkBase
        v-bind:button="true"
        icon="pen"
        @click="editorActivate()" />
    </div>
    <div
      v-if="editorActive"
      class = "enum-editor-list"
    >
      <div
        v-for = "(item, index) in values"
        v-bind:key ="index"
        class="enum-editor-list-item"
      >
        <InputText
          v-bind:disabled = "disabled"
          v-model = "values[index]"
          placeholder="Set of values"
        />
        <LinkBase
          v-bind:button="true"
          icon="trash"
          @click="remove(index)" />
      </div>
    </div>
    <div
      v-if="editorActive"
      class="enum-editor-list-actions">
      <LinkBase 
        v-bind:button="true" 
        icon="plus" 
        @click="add()"/>
      <LinkBase 
        v-bind:button="true" 
        icon="check" 
        @click="editorApply()" />
      <LinkBase 
        v-bind:button="true" 
        icon="times" 
        @click="cancel()"/>

    </div>

  </div>
</template>

<script>
import InputText from './InputText'
export default {
  name: 'InputTypeEnum',
  components: { InputText },
  props: {
    length: { type: String, required: false, default: null },
    disabled: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      editorActive: false,
      values: this.$valset.parse(this.length)
    }
  },
  computed: {
    lengthModel: {
      get () { return this.length },
      set (val) { this.$emit('length', val) }
    },
  },
  watch: {
    length() {
      this.values = this.$valset.parse(this.length)
    }
  },
  methods: {
    remove (index) {
      this.values.splice(index,1)
    },
    cancel () {
      this.values = this.$valset.parse(this.length)
      this.editorDisactivate()
    },
    editorApply() {
      var send = this.values.map(val => "'" + this.$valset.doquotes(val) + "'")
      this.lengthModel = send.join(',')
      this.editorDisactivate()
    },
    editorActivate() { this.editorActive = true},
    editorDisactivate() { this.editorActive = false },
    add () { this.values.push('')},
    editor () {},
    focus () { this.$nextTick(() => { this.$refs['input'].focus() }) },
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";
  .enum-editor {
  }

  .enum-editor input {
    width:258px;
    float:left;
  }

  .enum-editor .action {
    width:40px;
    float:left;
    height:26px;
    line-height:26px;
    margin-left:0px;
    margin-right:1px;
  }

  .enum-editor .action:last-child {
    margin-right: 0;
  }

  .enum-editor-list {
    float:left;
    overflow-x:hidden;
    overflow-y:scroll;
    max-height:201px;
  }

  .enum-editor-list-item {
    overflow:hidden;
    margin-bottom:-1px;
  }

  .enum-editor-list-item input {
    width:241px;
  }

  .enum-editor-list-actions {
    width:100%;
    overflow:hidden;
    float:none;
    padding-top:1px;
    margin-left:0px;
  }

  /*
  .sets-type-editor * {
    overflow:hidden;
  }
  .sets-type-input .action{
    width: 25px;
    float:left;
    margin-right:1px;
    margin-top:1px;
  }

  .sets-type-editor input {
    width:250px;
    display:inline-block;
    float:left;
  }
  .sets-type-editor-item:first-child input {

  }
  */
</style>