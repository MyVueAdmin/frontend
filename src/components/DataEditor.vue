<template>
  <div class="editor">
    <div
      v-if = "dataOut.length === 0"
      class="nothing-message">
      {{ $dict.get().norows }}
    </div>
    <div
      v-for = "item in dataOut"
      v-bind:key = "item.index"
      class="field">
      <div class="label">
        {{ item.label }}
        <div
          v-if = "item.info"
          class="info"
          v-html = "item.info" />
      </div>
      <div class="value">
        <InputBase
          v-model = "values[item.index]"
          v-bind:type = "item.type"
          v-bind:options = "item.options"
          v-bind:disabled = "item.disabled"
          v-bind:class = "classes(item)"
        />
      </div>
    </div>
    <ActionsBlock>
      <LinkBase
        v-if = "!insert"
        v-bind:disabled = "changed === 0"
        v-bind:button = "true"
        icon = "check"
        label = "save"
        @click="update()" />
      <LinkBase
        v-if = "!insert"
        v-bind:disabled = "changed === 0"
        v-bind:button = "true"
        icon="undo"
        label="reset"
        @click="reset()" />
      <LinkBase
        v-if = "!insert"
        v-bind:button = "true"
        icon="copy"
        label="copy"
        @click="copy()" />
      <LinkBase
        v-if = "insert"
        v-bind:button = "true"
        icon="check"
        label="add"
        @click="copy()" />
      <slot />
      <LinkBase
        v-if = "!insert"
        v-bind:button = "true"
        icon="trash"
        label="del"
        @click="del()" />
    </ActionsBlock>
  </div>
</template>

<script>
import InputBase from './InputBase'
import ActionsBlock from './ActionsBlock'
import Search from '../mixins/Search'
export default {
  name: 'DataEditor',
  components: { InputBase, ActionsBlock },
  mixins: [ Search ],
  props: {
    data: {type: Array, required: true}, // { label, type, value, info, options }
    insert: {type: Boolean, required: false, default: false}
  },
  data () {
    return {
      values: this.extractValues(),
      dataUpdated: false
    }
  },
  computed: {
    dataOut () {
      var out = []
      if (!this.data) return []
      if (!this.data.length) return []
      var reg = this.searchRegExp(false)
      this.data.forEach((val, idx) => {
        if (!reg || (reg && val.label.toString().search(reg) > -1)) {
          var item = Object.assign({}, val)
          item.index = idx
          item.ref = 'input-' + idx
          out.push(item)
        }
      })

      this.setUpdated()
      return out
    },
    changed () {
      var out = 0
      this.data.forEach((val, idx) => {
        out += (this.values[idx] != val.value)
      })
      this.change()
      return out
    }
  },
  watch: {
    data () {
      this.values = this.extractValues()
    },
    dataUpdated (val) {
      if (!val) return false
      this.$el.querySelector('.value-input-active').focus()
    }
  },
  mounted () {

  },
  methods: {
    classes (item) {
      return {
        'value-input':true,
        'value-input-active': !item.disabled,
      }
    },
    setUpdated() {
      this.dataUpdated = true
    },
    collectData (all) {
      var data = this.data.map((val, idx) => {
        var out = Object.assign({}, val)
        if (!out.disabled && (this.values[idx] != out.value || all)) {
          out.value = this.values[idx]
          out.changed = true
        } else {
          out.changed = false
        }
        return out
      }, this)
      return data
    },
    extractValues () {
      return this.data.map(val => val.value)
    },
    del () { this.$emit('del', this.collectData(true)) },
    change () { this.$emit('change', this.collectData(true)) },
    copy () { this.$emit('insert', this.collectData(true)) },
    update () { this.$emit('update', this.collectData()) },
    reset () { this.values = this.extractValues() }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/vars.scss";

  .field {
    overflow: hidden;
    float: none;
    margin: 0px;
    padding: 3px;
  }
  .field:hover {
    background: $color-act-pale;
  }
  .label, .value {
    overflow:hidden;
    float:left;
  }
  .label {width:200px; color: #333}
  .value {min-width:300px;}
  .info { font-size: 8pt; color: #999}
  .value-input {
      width:300px;
  }
  .value select {width:302px;}
  .actions {
      overflow:hidden;
  }
</style>
