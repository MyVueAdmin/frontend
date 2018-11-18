<template>
  <div
    id="navigation-tables"
    @keydown = "key">
    <div id="navigation-tables-filter" >
      <InputBase
        ref = "filter"
        v-model = "search"
        v-bind:placeholder = "$dict.get().filteraside"
      />
    </div>
    <LinkBase
      v-for = "(item,index) in tablesFiltered"
      v-bind:key = "item.number"
      v-bind:active = "item.name === table"
      v-bind:class = "{ hover: hover === index, nohover: true}"
      v-bind:to = "item.link"
      @mouseenter.native = "hover = index"
    >
      <div>
        {{ item.name }} <span class="number">#{{ item.number }}</span>
      </div>
    </LinkBase>
    <span
      v-if="tablesFiltered.length===0"
      class="nothing">{{ $dict.get().nothingfound }}</span>
    <LinkBase
      v-if="search"
      v-bind:class = "{reset: true}"
      v-bind:button ="true"
      label = "reset_search"
      @click="searchReset()" />
    <div
      v-if="!search && pagesTotal>0"
      class="controls" >
      <LinkBase
        v-bind:button ="true"
        v-bind:class="{ disabled: !canGoMinus }"
        class="go-minus"
        icon = "arrow-left"
        @click="goMinus()" />
      <span class="page-info">{{ pageCurrent }} / {{ pagesTotal }}</span>
      <LinkBase
        v-bind:button ="true"
        v-bind:class="{ disabled: !canGoPlus }"
        class="go-plus"
        icon = "arrow-right"
        @click="goPlus()" />
    </div>
  </div>
</template>

<script>
import Routes from '../mixins/Routes'
import Search from '../mixins/Search'
import InputBase from './InputBase'
export default {
  name: 'TheNavigationTables',
  components: { InputBase },
  mixins: [Routes, Search],
  props: {
    limit: {type: Number, reqired: false, default: 25},
    height: {type: Number, reqired: false, default: 30}
  },
  data () {
    return {
      hover: 0,
      start: 0,
      search: ''
    }
  },
  computed: {
    tables () {
      if (this.database) {
        return this.$store.state.tables
      } else {
        return this.$store.state.databases
      }
    },
    tablesFiltered () {
      var out = []
      this.tables.forEach((table,index)=> {
        if (this.checkItem(table,index, out.length)) {
          out.push({
            name: table,
            number: Number(index) + 1,
            link: this.link(table)
          })
        }
      })
      return out
    },
    total () { return this.tables ? this.tables.length : 0 },
    canGoPlus () { return this.total > this.start + this.limit },
    canGoMinus () { return this.start > 0 },
    pageCurrent () { return this.start / this.limit + 1 },
    pagesTotal () { return Math.ceil(this.total / this.limit) }
  },
  watch: {
    database () { this.start = this.findCurrentPage() },
    limit () { this.start = this.findCurrentPage() },
    total () {
      this.start = this.findCurrentPage()
    },
  },
  mounted () {
    this.start = this.findCurrentPage()
  },
  methods: {
    checkItem(table, index, length){
      return (index >= this.start && index < this.start + this.limit && !this.search) || (this.search && this.searchIt(table) && length < this.limit)
    },
    key (event) {
      switch (event.key) {
      case 'ArrowRight':
        if (!this.search && this.canGoPlus) this.goPlus()
        break
      case 'ArrowLeft':
        if (!this.search && this.canGoMinus) this.goMinus()
        break
      case 'ArrowDown':
        this.hover++
        if (this.hover >= this.tablesFiltered.length) this.hover = 0
        break
      case 'ArrowUp':
        this.hover--
        if (this.hover < 0) this.hover = this.tablesFiltered.length - 1
        break
      case 'Enter':
        if (this.tablesFiltered[this.hover]) {
          this.activate(this.tablesFiltered[this.hover].name)
        }
        break
      }
    },
    focus () {
      this.$refs['filter'].focus()
    },
    activate (item) {
      this.$router.push(this.link(item))
    },
    link (item) {
      if (this.table && !this.entity) {
        return {name: this.$route.name, params: {table: item} }
      } else if (this.database) {
        return {name: 'table-content', params: {table: item} }
      } else {
        return {name: 'database-content', params: {database: item}}
      }
    },
    goPlus () {
      this.search = ''
      if (this.canGoPlus) {
        this.start += this.limit
      }
    },
    goMinus () { this.search = ''; if (this.canGoMinus) this.start -= this.limit },
    searchNow () { if (this.search !== '') this.start = 0 },
    searchReset () {
      this.start = this.findCurrentPage()
      this.search = ''
    },
    searchIt (table) { return this.searchExecute(this.search, table) },
    findCurrentPage () {
      if (!this.tables) return 0
      var i = this.tables.indexOf(this.table)
      var page = 0
      for (var p = 0; p < this.pagesTotal; p++) {
        if (p * this.limit <= i && (p + 1) * this.limit > i) {
          page = p
          continue
        }
      }
      return page * this.limit
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/vars.scss";

div#navigation-tables {
  margin: 0;
  padding: 1px 0 0 0;
  width:250px;
}

div#navigation-tables .link {
  height: 30px;
  line-height:30px;
  font-size: 10pt;
  text-align: left;
  word-break: break-all;
  display: block;
  text-decoration: none;
  padding: 0px 10px;
  margin: 0 0 0 0;
  overflow:hidden;
}

div#navigation-tables .action.reset {
  width: 100%;
  padding:5px 0;
  display:block;
}

div#navigation-tables .link div {  color: inherit; }
div#navigation-tables .link.active div {  color:inherit ; }

.number {
  display:block;
  float:right;
  opacity:0.3;
  font-size:8pt;
}

.go-plus { float: right; }
.go-minus { float: left; }

.controls {
  width:100%;
  height:auto;
  text-align:center;
  padding:0;
  margin: 0;
  background: $color-ui-1;
  overflow:hidden;
  position: absolute;
  bottom: 0px;
  left:0px;
}

.controls .action
{
  text-align:center;
  width:30%;
  padding:0px 0;
  line-height:44px;
  height:44px;
  margin:0;
  font-size:16pt;
  cursor:pointer;
}

.controls .action.disabled
{
  color: $color-ui-0;
  background: transparent;
  opacity: 0.5;
  cursor: default;
}

.page-info
{
  display: inline;
  background:transparent;
  margin:0;
  color: $color-ui-0;
  font-size: 10pt;
  line-height:44px;
  cursor:default;
}

#navigation-tables-filter { padding:0 2px 0 0; }
#navigation-tables-filter input { width: 100%; }

.nothing
{
  display:block;
  padding:10px 5px;
  background: transparent;
  text-align:center;
  cursor:default;
  color: $color-ui-3;
  font-style: italic;
}

</style>
