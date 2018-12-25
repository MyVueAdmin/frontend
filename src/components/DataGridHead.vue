<template>
  <tr>
    <th
      v-if = "control"
      v-bind:colspan="controls.length"
      class="th-action" >
      <faIcon icon="edit" />
    </th>
    <th
      v-for = "(field, index) in fields"
      v-bind:id = "'th-' + field"
      ref = "th"
      v-bind:key = "index"
      v-bind:class="{active: field === filter}" >
      <LinkBase
        v-if = "!disableFilters"
        v-bind:class="filterCallerClasses(field)"
        icon = "filter"
        @click = "showFilter(field)"
      />
      <div
        class="name"
        @click = "applyOrder(field)">
        <span class="order">{{ orderMark(field) }}</span>
        {{ foundOut(field, 0) }}<span
          v-if="field == found"
          class="found">{{ foundOut(field, 1) }}</span>{{ foundOut(field, 2) }}
      </div>
      <div
        v-if = "field === filter && !disableFilters"
        v-bind:class="filterHolderClasses(index)">
        <DataGridFilter
          v-if = "field === filter && !disableFilters"
          v-bind:width ="filterWidth(index)"
          v-bind:value ="getFilterValue(field)"
          v-bind:collation ="getFilterCollation(field)"
          v-bind:right ="filterRight(index)"
          class = "filter"
          type = "text"
          @close = "closeFilters"
          @apply = "applyFilter"
          @clear = "clearFilter"
        />
      </div>
    </th>
  </tr>
</template>

<script>
import DataGridFilter from './DataGridFilter'
import Search from '../mixins/Search'
export default {
  name: 'DataGridHead',
  components: {DataGridFilter},
  mixins: [Search],
  props: {
    order: { type: [Object, Boolean], default: false, required: false },
    filters: { type: [Object, Boolean], default: false, required: false },
    fields: { type: Array, required: true },
    controls: { type: Array, default: () => [] },
    control: { type: String, default: '' },
    copy: { type: Boolean, default: false },
    disableFilters: { type: Boolean, default: false }
  },
  data () {
    return {
      filter: ''
    }
  },
  methods: {
    filterRight(index) {
      switch (this.fields.length) {
      case 1: return true
      case 2: return index === 2
      case 3: return index > 1
      default: return index >= this.fields.length - 2
      }
    },
    filterHolderClasses(index) {
      return ['filter-holder',{'filter-holder-right': this.filterRight(index) }]
    },
    filterCallerClasses(field) {
      return ['filter-caller',{active: this.getFilterExists(field) }]
    },
    getFilterExists (field) { return !((!this.filters || !this.filters[field])) },
    getFilterValue (field) { return (!this.filters || !this.filters[field]) ? null : this.filters[field].value },
    getFilterCollation (field) { return (!this.filters || !this.filters[field]) ? '=' : this.filters[field].collation },
    closeFilters () { this.filter = '' },
    applyFilter (val) {
      var filters = !this.filters ? {} : this.filters
      filters[this.filter] = val
      this.$emit('filters', filters)
      this.closeFilters()
    },
    clearFilter () {
      var filters = !this.filters ? {} : this.filters
      if (filters[this.filter]) delete filters[this.filter]
      this.$emit('filters', filters)
      this.closeFilters()
    },
    orderMark (field) { return !this.order || field !== this.order.field ? '' : this.order.desc ? '▼' : '▲' },
    applyOrder (field) {
      var order = !this.order ? {field: '', desc: false} : this.order
      var desc = order.field === field ? !order.desc : false
      this.$emit('order', {field, desc})
    },
    filterWidth(index) {
      return this.$refs['th'][index].offsetWidth
    },
    showFilter (field) {
      this.filter = field
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/vars.scss";

.filter-holder{

}

.filter {
  background: $color-ui-0;
  padding:5px;
  width: auto;
  min-width: 195px;
  border:solid 2px $color-act-mid;
  color:$color-ui-9;
  margin-left:-5px;
  margin-top:4px;
  position: absolute;
  box-shadow: $shadow;
  box-sizing: border-box;
}

.filter-holder-right{
   float:right;
   margin-right:-6px;
 }

 .filter-caller {
  background:transparent;
  float: right;
  margin-left: 0px;
  margin-top:0px;
  height:15px;
  width: auto;
  text-align:right;
  overflow:hidden;
  opacity:0.4;
  color: $color-ui-0;
}

.filter-caller.active, .filter-caller.active:hover{
  background:transparent !important;
  box-shadow: none;
}

.filter-caller:hover {
  color: $color-ui-0;
  background:transparent;
  opacity:0.7;
  box-shadow: none;
  cursor: pointer;
}

th.active  {
  background: $color-act-mid;
  border-color: $color-act-mid;
}

.filter-caller.active, .filter-caller.active:hover, .order {
  opacity:1;
  color: $color-ui-0;
}

.name {
  margin-right: 14px;
  padding-right: 5px;
  margin-left:-5px;
  padding-left:5px;
}

.name:hover {
  cursor: pointer;
  border: dashed 1px $color-ui-0;
  border-width:0 0 1px 0;
  margin-bottom:-1px;
}

.th-action {
  text-align:center;
}

</style>
