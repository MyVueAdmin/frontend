<template>
  <div
    ref = "container"
    v-bind:style = "style"
    @keyup.stop="checkKeyup"
    @keydown.stop="checkKeydown"
    @mouseenter = "eventOver()"
    @mouseleave = "eventOut()" >
    <div class = "filter-block">
      <InputBase
        v-bind:value = "collation"
        v-model = "collationRaw"
        v-bind:options = "collations"
        class = "collation"
        type = "enum"
      />
      <div class="value-holder">
        <InputBase
          ref="filter"
          v-model = "valueRaw"
          v-bind:type = "type"
          class = "value"
        />
      </div>
    </div>
    <div class = "filter-block">
      <LinkBase
        v-bind:button = "true"
        icon ="check"
        @click = "apply()" />
      <LinkBase
        v-bind:disabled = "!showClear"
        v-bind:button = "true"
        icon="undo"
        @click = "clear()" />
      <LinkBase
        v-bind:button = "true"
        icon="times"
        @click = "close()" />
    </div>
  </div>
</template>

<script>
import InputBase from './InputBase'
export default {
  name: 'DataGridFilter',
  components: {InputBase},
  props: {
    right: { type: Boolean, default: false, },
    type: { type: String, default: 'text' },
    value: { type: [String, Number, Boolean], default: '' },
    collation: { type: String, default: '' },
    width: { type: Number, default: 0 }
  },
  data: function () {
    return {
      valueRaw: this.value,
      collationRaw: this.collation
    }
  },
  computed: {
    style() {
      return {
        width: this.width + 'px'
      }
    },
    collations () {
      return [
        '=',
        {value: '!=', label: '≠  (!=)'},
        '<',
        '>',
        {value: '<=', label: '≤  (<=)'},
        {value: '>=', label: '≥ (<=)'},
        {value: 'IN', label: '⊂  (IN)'},
        {value: 'LIKE', label: '≈  (LIKE)'},
        {value: 'BETWEEN', label: '∈  (BETWEEN)'}
      ]
    },
    showClear () {
      return this.value !== null
    }
  },
  watch: {
    value: function () { this.valueRaw = this.value }
  },
  destroyed() {
    window.removeEventListener('click', this.close)
  },
  mounted () {
    if (this.$refs.container && this.right) {
      var width = this.$refs.container.offsetWidth
      this.$refs.container.style.marginLeft = (-width) + 'px'
    }

    if (this.$refs.filter) {
      this.$refs.filter.focus()
    }
  },
  methods: {
    eventOver () { window.removeEventListener('click', this.close) },
    eventOut () { window.addEventListener('click', this.close) },
    checkKeyup (event) {
      if (event.key === 'Enter') {
        event.shiftKey ? this.clear() : this.apply()
      }
    },
    checkKeydown (event) { if (event.key === 'Escape') this.close() },
    apply () {
      if (!this.valueRaw) this.valueRaw = ''
      this.$emit('apply', { value: this.valueRaw, collation: this.collationRaw })
    },
    clear () {
      this.valueRaw = ''
      this.collationRaw = '='
      this.$emit('clear')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/vars.scss";

  .collation {
    width:45px !important;
    float:left;
    height:26px;
    margin-right:-50px;
  }

  .value-holder {
    width:100%;
    float:left;
    box-sizing: border-box;
    padding:0px;
    margin-left:51px;
    padding-right:53px;
    background:red;
  }

  .value {
    display:block;
    width:100%;

  }

  .filter-block {
    width:100%;
    display:block;
    margin-bottom:5px;
    float:none;
    overflow:hidden;
  }
  .filter-block:last-child {
    margin-bottom:0px;
  }
  .action {
    width:33.3333%;
    box-sizing: border-box;
    line-height:27px;
    border:solid 0px #fff;
    margin-right:0px;
    float:left;
    border-width:0 2px 0 2px;
  }

  .action:first-child { border-width:0 3px 0 0px; }
  .action:last-child { border-width:0 0px 0 3px; }
</style>
