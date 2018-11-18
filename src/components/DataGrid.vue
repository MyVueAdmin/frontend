<template>
  <div class="data-grid" >
    <div v-if = "noTable" >{{ data }}</div>
    <div
      v-else-if = "data.length!=0 && fieldsOut.length == 0"
      class = "nothing-message"
      @click="searchClear()">{{ $dict.get().nocols }}</div>
    <div
      v-else-if = "data.length!=0 && dataOut.rows.length == 0"
      class = "nothing-message"
    >{{ $dict.get().norows }}</div>
    <table v-else >
      <DataGridHead
        v-bind:order = "order"
        v-bind:fields = "fieldsOut"
        v-bind:filters = "filters"
        v-bind:control = "control"
        v-bind:controls = "controls"
        v-bind:disable-filters = "disableFilters"
        @order = "changeOrder"
        @filters = "changeFilters"
      />
      <DataGridRow
        v-for = "(row, number) in dataOut.rows"
        v-bind:key = "number"
        v-bind:data = "row"
        v-bind:order = "order.field"
        v-bind:control = "dataOut.controls[number]"
        v-bind:controls = "controls"
        v-bind:class = "rowClass(number)"
        @click.native = "markRow(number)"
      />
    </table>
    <div
      v-if = "!loading && data.length==0"
      class = "nothing-message"
      @click="searchClear()">{{ $dict.get().nothingfound }}</div>
    <ActionsBlock>
      <DataGridPagination
        v-if = "total > limit"
        slot="pagination"
        v-bind:total = "total"
        v-bind:offset = "offset"
        v-bind:limit = "limit"
        @offset = "changeOffset"
      />
      <LinkBase
        v-bind:button = "true"
        icon = "sync"
        label = "reload"
        @click = "reload"
      />
      <LinkBase
        v-if = "needResetFilters()"
        v-bind:button = "true"
        icon = "undo"
        label = "reset_filters"
        @click="resetFilters()"
      />
      <slot name = "actions" />
    </ActionsBlock>
  </div>
</template>

<script>
import ActionsBlock from './ActionsBlock'
import DataGridPagination from './DataGridPagination'
import DataGridHead from './DataGridHead'
import DataGridRow from './DataGridRow'
import InputBase from './InputBase'

import Search from '../mixins/Search'
export default {
  name: 'DataGrid',
  components: { DataGridHead, DataGridRow, DataGridPagination, InputBase, ActionsBlock },
  mixins: [ Search ],
  props: {
    data: { type: [Object, Array, String, Number], default: '' },
    fields: { type: Array, default: () => [] },
    total: { type: Number, default: 0 },
    limit: { type: Number, default: 30 },
    offset: { type: Number, default: 0 },
    order: { type: Object, default: () => { return {order: '', desc: false} } },
    filters: { type: Object, default: () => { return {} } },
    controls: { type: Array, default: () => [] },
    control: { type: String, default: '' },
    disableFilters: { type: Boolean, default: false }
  },
  data () {
    return {
      marked: -1
    }
  },
  computed: {
    noTable () {
      return (typeof this.data != 'object')
    },
    loading () { return this.$store.state.loading },
    dataOut () {
      var rows = []
      var controls = []
      var indices = []
      if (!this.data) return {rows, controls}
      this.data.forEach((item, index) => {
        var row = {}
        var add = false
        this.fieldsOut.forEach(key => {
          var str = item[key]
          row[key] = str
        })
        controls.push(this.control ? item[this.control] : null)
        rows.push(row)
        indices.push(add ? item[this.control] : index)
      })
      return {rows, controls, indices}
    },
    fieldsAll () {
      return Object.keys(this.data[0])
    },
    fieldsOut () {
      var out = []
      if (!this.data && this.filters) return []
      if (!this.data.length && this.filters) {
        out = Object.keys(this.filters)
        return out
      }
      if (!this.data.length) return []
      var reg = this.searchRegExp(this.searchOnPage)
      var row = this.fieldsAll
      if (!reg) return row
      row.forEach(f => {
        if (reg && f.toString().search(reg) > -1) out.push(f)
      })
      return out
    }
  },
  methods: {
    needResetFilters () {
      for (var i in this.filters) {
        if (this.filters[i] && this.filters[i].collation) return true
      }
      return false
    },
    reload() {
      this.$emit('reload')
    },
    rowClass (number) {
      var index = this.dataOut.indices[number]
      return this.marked === index ? {marked: true} : {}
    },
    markRow (number) {
      var index = this.dataOut.indices[number]
      this.marked = this.marked !== index ? index : -1
    },
    resetFilters () {
      this.changeFilters({})
    },
    changeOrder (val) { this.$emit('order', val) },
    changeFilters (val) { this.$emit('filters', val) },
    changeOffset (val) { this.$emit('offset', val) }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

  .data-grid {
    box-sizing: border-box;
    padding-right:5px;
    min-width:100%;
    width:fit-content;
  }

  .data-grid-search > * {
    width:150px;
    float:left;
    margin-right:5px;
  }

  .data-grid-search > *:last-child {
    margin-right:0px;
  }

  /* TABLES */
table {
  border-collapse: collapse;
  border:solid $color-ui-3 1px;
  width:auto;
  min-width:100%;
}
table td {
  border: solid $color-ui-1 1px;
  padding: 5px;
  font-size: 9pt;
  white-space:nowrap;
  transition: all 0.5s ease;
  opacity:1;
}

table th {
  border: solid $color-ui-2 1px;
  line-height:18px;
  padding: 5px;
  background: $color-ui-2;
  color:$color-ui-0;
  font-weight:normal;
  font-size: 9pt;
  white-space:nowrap;
}
.order-mark {
  float: right;
  margin-right: -40px;
  cursor: pointer;
}
table th.control {
  min-width:70px;
  width:70px;
  padding:0;
}
table th.control .action {
  font-size:12pt;
  float: none;
  display:block;
  width:100%;
  margin:0px;
  height:27px;
  line-height:27px;
  padding:0;
}
table th.control .action:last-child {
  margin-right:0px;
}

td.ordered {background:$color-act-pale;}
.loading td.ordered {background:$color-ui-1;}

tr.marked td {
  background: $color-act-pale;
}
</style>
