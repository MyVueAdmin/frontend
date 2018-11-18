<template>
  <div>
    <DataGrid
      v-if = "loaded"
      v-bind:data = "answer"
      v-bind:total = "total"
      v-bind:limit = "state.limit"
      v-bind:order = "state.order"
      v-bind:offset = "state.offset"
      v-bind:filters = "state.filters"
      v-bind:control = "control"
      v-bind:controls = "controls"
      v-bind:disable-filters = "true"
      @order = "changeOrder"
      @offset = "changeOffset"
      @filters = "changeFilters"
      @reload = "reload"
    />
    <QueryParser
      v-bind:query = "queryRaw"
      v-bind:state = "state"
      v-model = "processed" />
  </div>
</template>

<script>
import DataGrid from '../components/DataGrid'
import CodeEditor from '../components/CodeEditor'
import QueryParser from '../components/QueryParser'
import Routes from '../mixins/Routes'
export default {
  name: 'TablesShow',
  components: {DataGrid, CodeEditor, QueryParser},
  mixins: [ Routes ],
  data () {
    return {
      loaded: false,
      total: 0,
      queryRaw: '',
      pagination: false,
      processed: {
        query: '',
        type: '',
        pagination: false
      },
      answer: [],
      fields: [],
      state: {
        updated: 0,
        offset: 0,
        limit: 10,
        filters: {},
        order: {
          field: 'table_schema',
          desc: false
        }
      }
    }
  },
  computed: {
    controls () {
      return this.database ? ["table"] : ["database"]
    },
    onpage () { return this.$store.state.onpage*1 },
    showDatabases () {
      return !this.database
    },
    keywords () { return this.$store.state.parser.mysql.keywords },
    control () { return this.showDatabases ? 'table_schema' : 'table_name' }
  },
  watch: {
    table () { this.updateTable() },
    database () { this.updateTable() },
    action () { this.updateTable() },
    onpage () {
      this.state.offset = 0
      this.updateTable()
    }
  },
  mounted () {
    this.updateTable()
  },
  methods: {
    processBytes (bytes) {
      var sizes = this.$store.state.constants.sizeunits
      for (var order = 0; order <= 3; order ++) {
        if (bytes < sizes[order + 1].bytes) {
          return (Math.round(bytes/sizes[order].bytes * 100) / 100) + ' ' + sizes[order].label
        }
      }
      return '> 1TB'
    },
    processValue (field, value) {
      switch (field) {
      case 'data_length':
      case 'index_length':
      case 'data_size':
      case 'index_size':
        return this.processBytes(Number(value))
      default: return value
      }
    },
    processRow (obj) {
      var out = {}
      for (var i in obj) {
        out[i] = this.processValue(i, obj[i])
      }
      return out
    },
    process (data) {
      return data.map(val => this.processRow(val))
    },
    send () {
      this.state.limit = this.onpage
      this.pagination = this.processed.pagination
      this.$connection.fetch('raw', {database:this.database, query: this.processed.query}).then(answer => {
        this.loaded = true
        if (typeof answer === 'string') {
          this.answer = answer
          this.total = 0
          this.pagination = false
          this.processed.table = ''
        } else {
          this.answer = this.process(answer.data)
          this.total = Number(answer.total)
        }
      })
    },
    updateTable () {
      this.state.offset = 0
      this.state.limit = this.onpage
      this.state.order.field = this.showDatabases ? 'table_schema' : 'table_name'
      this.state.filters = {}
      this.state.order.desc = false
      var mode = this.showDatabases ? 'databasesSchema' : 'tablesSchema'
      if (this.database != '' && this.table != '') {
        this.queryRaw = this.$connection.prepare(mode, {database: this.database}).query
        this.$nextTick(() => { this.send() })
      } else {
        this.queryRaw = ''
        this.answer = ''
      }
    },
    reload () {
      this.send()
    },
    changeOrder (val) { this.changeState('order', val) },
    changeOffset (val) { this.changeState('offset', val) },
    changeFilters (val) {
      this.state.offset = 0
      this.changeState('filters', val)
    },
    changeState (key, val) {
      this.state[key] = val
      this.state.updated++
      this.$nextTick(() => { this.send() })
    }
  }
}
</script>