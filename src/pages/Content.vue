<template>
  <div id="show-data">
    <!-- {{ processed.query }} -->
    <div
      v-if = "codeEditor"
      id="editor">
      <CodeEditor
        v-model = "queryRaw"
        v-bind:text = "queryRaw"
        v-bind:keywords = "keywords" />

    </div>
    <DataGrid
      v-if = "loaded || codeEditor"
      v-bind:data = "answer"
      v-bind:total = "total"
      v-bind:limit = "state.limit"
      v-bind:order = "state.order"
      v-bind:offset = "state.offset"
      v-bind:filters = "state.filters"
      v-bind:control = "control"
      v-bind:controls = "controls"
      @order = "changeOrder"
      @offset = "changeOffset"
      @filters = "changeFilters"
      @reload = "reload"
    >
      <LinkBase
        v-if = "codeEditor"
        slot="actions"
        v-bind:button = "true"
        icon="play"
        label="send"
        @click="sendAgain()"
      />
    </DataGrid>
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
  name: 'ContentShow',
  components: { DataGrid, CodeEditor, QueryParser },
  mixins: [ Routes ],
  props: {
    codeEditor: { type: Boolean, default: false }
  },
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
        limit: 3,
        filters: {},
        order: {
          field: '',
          desc: false
        }
      }
    }
  },
  computed: {
    onpage () { return this.$store.state.onpage*1 },
    localStorageStateKey () {
      return ['state', this.database, this.table].join('-')
    },
    keywords () { return this.$store.state.parser.mysql.keywords },
    control () {
      if (!this.answer || !this.answer[0]) return ''
      var fieldsIn = Object.keys(this.answer[0])
      var fieldsAll = this.fields
      var out = ''
      fieldsAll.forEach((fld) => {
        if (fld['Key'] === 'PRI' && fieldsIn.indexOf(fld['Field']) > -1) {
          out = fld['Field']
        }
      })
      return out
    },
    controls () {
      return this.control ? ['edit', 'copy'] : []
    }
  },
  watch: {
    '$route' (valNew, valOld) {
      if(valNew.name !== valOld.name) {
        this.updateTable()
        this.$forceUpdate()
      }
    },
    table () {
      this.updateTable()
    },
    database () { this.updateTable() },
    action () { this.updateTable() },
    onpage () {
      this.state.offset = 0
      this.localStorageSaveState()
      this.initialLoad()
    }
  },
  mounted () {
    this.updateTable()
  },
  methods: {
    sendAgain () {
      this.state.offset = 0
      this.$nextTick(() => this.send())
    },
    reload () {
      this.send()
    },
    localStorageLoadState() {
      if (this.codeEditor) return false
      var key = this.localStorageStateKey
      if (!this.$storage.hasItem(key)) return false
      this.state = JSON.parse(this.$storage.getItem(key))
    },
    localStorageSaveState() {
      if (this.codeEditor) return false
      var key = this.localStorageStateKey
      this.$storage.setItem(key, JSON.stringify(this.state))
    },
    localStorageClearState() {
      if (this.codeEditor) return false
      var key = this.localStorageStateKey
      this.$storage.removeItem(key)
    },
    getDefaultOrder() {
      var out = {desc: true}
      var ret = this.fields.find( fld => fld['Key'] === 'PRI' )
      if (ret) out.field = ret.Field
      return out
    },
    send () {
      this.state.limit = this.onpage
      this.pagination = this.processed.pagination
      this.$connection.fetch('raw', {query: this.processed.query }).then(answer => {
        if (typeof answer === 'object') {
          this.answer = answer.data
          this.total = Number(answer.total)
        } else {
          this.answer = answer
          this.total = 0
          this.pagination = false
          this.processed.table = ''
        }
        this.loaded = true
      })

      if (this.processed.table) {
        this.$connection.fetchFields(this.database, this.processed.table).then(answer => {
          this.fields = answer
        })
      }
    },
    updateTable () {
      this.$connection.fetchFields(this.database, this.table).then(answer => {
        this.fields = answer
        this.initialLoad()
      })
    },
    initialLoad () {
      this.loaded = false
      if (this.codeEditor) {
        this.state.offset = 0
        this.state.filters = {}
        this.state.order = {field:"", desc: false}
        this.total = 0
        this.queryRaw = ''
        this.answer = ''
        this.state.limit = this.onpage
        return false
      }

      this.state.offset = 0
      this.state.order = this.getDefaultOrder()
      this.state.filters = {}
      this.localStorageLoadState()
      this.state.limit = this.onpage

      if (this.database != '' && this.table != '') {
        this.queryRaw = this.$connection.prepare('all', {database: this.database, table: this.table}).query
        this.$nextTick(() => { this.send() })
      } else {
        this.queryRaw = ''
        this.answer = ''
      }
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
      this.localStorageSaveState()
      this.$nextTick(() => { this.send() })
    }
  }
}
</script>

<style scoped>
  #editor {
    width: calc(100vw - 60px);
    margin-bottom: 5px;
    overflow: hidden;
  }

  #editor>div {
    margin-bottom:5px;
  }

  #editor .action {
    margin-left: 0px;
    width: 75px;
    text-align:center;
    padding:0px;
    height: 45px;
    line-height:45px;
  }
</style>
