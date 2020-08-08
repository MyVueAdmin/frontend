<template>
  <div>
    <DataEditor
      v-if="loaded"
      v-bind:data = "data"
      v-bind:insert = "table === null"
      @update = "update"
      @insert = "insert"
      @del = "del"
      @change = "change"
    >
      <LinkBase
        v-if="table !== null"
        v-bind:button = "true"
        icon="copy"
        label="copy_struct"
        @click="copyStruct()" />
      <LinkBase
        v-if="table !== null"
        v-bind:button = "true"
        icon="copy"
        label="copy"
        @click="copy()" />
      <LinkBase
        v-if="table !== null"
        v-bind:button = "true"
        icon="eraser"
        label="truncate"
        @click="truncate()" />
    </DataEditor>
    <transition name="modal">
      <TheMutator
        v-if="mutations.length"
        v-bind:mutations = "mutations"
        @complete = "complete"
      />
    </transition>
  </div>
</template>

<script>
/* Highly MySQL-specfifc file */
import DataEditor from '../components/DataEditor'
import TheMutator from '../components/TheMutator'
import Routes from '../mixins/Routes'
export default {
  name: 'TablesEdit',
  components: { DataEditor, TheMutator },
  mixins: [ Routes ],
  data () {
    return {
      values: {},
      valuesChanged: {},
      collations: [],
      engines: [],
      engine: '',
      name: '',
      data: [],
      mutations: []
    }
  },
  computed: {
    loaded () { return (this.collations.length > 0 && this.engines.length > 0 && this.values.length !== {}) },
    fields () { return Object.assign([], this.$store.state.parser.mysql.tableParams) },
    rowFormat () { return Object.assign([], this.$store.state.parser.mysql.rowFormat) }
  },
  watch: {
    table() {
      this.load()
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    complete(answer) {
      switch (answer.what) {
      case 'alter':
        this.load()
        break;
      case 'delTable':
        this.$router.push({name:'database-content'})
        break
      case 'copyTable':
      case 'copyTableStruct':
      case 'renameTable':
        if (answer.data === true) {
          // this.table = this.name
          this.$router.push({name:'table-parameters', params:{table: this.name}})
        } else {
          this.load()
        }
        break
      }
      this.mutations = []
    },
    del() {
      this.mutations = [{what: 'delTable', options: {table: this.table}}]
    },
    truncate () {
      this.mutations = [{what: 'truncateTable', options: {table: this.table}}]
    },
    copy() {
      this.mutations = []
      this.name = this.valuesChanged['table_name']
      var options = {
        database: this.database,
        table: this.table,
        name: this.name
      }
      this.mutations = [{what: 'copyTableStruct', options}, {what: 'copyTable', options}]
    },
    copyStruct () {
      this.name = this.valuesChanged['table_name']
      if (!this.name) this.name = this.table
      var options = {
        database: this.database,
        table: this.table,
        name: this.name
      }
      this.mutations = [{what: 'copyTableStruct', options}]
    },
    insert () {
      console.log(this.valuesChanged)
      var options = {
        database: this.database,
        table: this.valuesChanged['table_name'],
        engine: this.valuesChanged['engine'],
      }
      this.mutations = [{what: 'createTable', options}]
    },
    update (data) {
      this.mutations = []
      this.name = this.newName(data)
      var newParams = this.actionsList(data)
      var fields = this.serializeAlterTable(newParams)
      if (fields) this.saveFields(fields)
      if (this.name) this.saveName(this.name)
    },
    serializeAlterTable (data) {
      var out = []
      data.forEach(fld => {
        var label = fld.field ? fld.field : fld.label
        var value = fld.function ? fld.value : this.$connection.escapeAndQuote(fld.value, false)
        if (fld.changed) {
          if (label === 'collate') {
            out.push(label + ' ' + value)
          } else {
            out.push(label + ' = ' + value)
          }
        }
      })
      return out.join(' ')
    },
    saveFields(data) {
      var options = { database: this.database, table: this.table, data }
      this.mutations.push({what: 'alter', options})
    },
    saveName (name) {
      var options = {
        database: this.database,
        table: this.table,
        name
      }
      this.mutations.push({what: 'renameTable', options})
    },
    newName(data) {
      if (!data) return ''
      var ret = data.find((val, index) =>
        val.label === 'table_name' && !val.disabled && val.value !== this.data[index].value
      )
      return ret ? ret.value : ''
    },
    actionsList(data) {
      var out = []
      // changing table name should separate action
      data.forEach((val, index) => {
        if (val.label != 'table_name' && !val.disabled && val.value !== this.data[index].value) {
          out.push(val)
        }
      })
      return out
    },
    rebuildData() {
      this.fields.forEach((row, i) => {
        this.data[i].disabled = row.engine && row.engine !== this.engine
      })
    },
    buildData () {
      if (!this.loaded) return false
      this.data = []
      this.fields.forEach(row => {
        var label = row.label
        var type = row.type ? row.type : 'text'
        var value = this.getValue(label)
        var options = this.getOptions(row)
        var disabled = row.disabled ? true : false
        var func = row.function ? true : false
        if (!disabled) {
          this.data.push({ label, type, value, options, disabled, function: func })
        }
      })
      this.rebuildData()
    },
    getValue (name) {
      var values = this.values
      switch (name) {
      case 'row_format':
        return values[name] ? values[name].toString().toUpperCase() : ''
      case 'pack_keys':
      case 'checksum':
      case 'delay_key_write':
        if (values['create_options']) {
          return values['create_options'][name] ? values['create_options'][name] : null
        } else {
          return null
        }
      default: return values[name] ? values[name] : null
      }
    },
    parseCreateOptions (val) {
      if (val == '' || !val) return {}
      var out = {}
      var arr = val.toString().split(' ')
      arr.forEach(val => {
        var opt = val.split('=')
        if (opt.length > 1) {
          out[opt[0]] = opt[1]
        }
      })
      return out
    },
    getOptions (row) {
      switch (row.label) {
      case 'collate': return this.collations
      case 'engine': return this.engines
      case 'row_format': return this.rowFormat
      default: return row.options ? row.options : null
      }
    },
    loadCollations () {
      return this.$connection.fetch('collations').then(data => {
        this.collations = data.map (val =>
          ({
            value: val.Collation,
            block: val.Charset
          })
        )
        return data
      })
    },
    loadEngines () {
      return this.$connection.fetch('engines').then(data => {
        this.engines = data.map(val => val.Engine)
        return data
      })
    },
    loadValues () {
      var options = {database: this.database, table: this.table}
      return this.$connection.fetch('tableSchema', options).then(answer => {
        this.values = {}
        for (var key in answer) {
          this.values[key.toString().toLowerCase()] = answer[key]
        }
        this.engine = this.values['engine']
        this.values['create_options'] = this.parseCreateOptions(this.values['create_options'])
        this.values['collate'] = this.values['table_collation']
        this.values['comment'] = this.values['table_comment']
        this.valuesChanged = Object.assign({},this.values)
      })
    },
    load () {
      if (this.table !== null ) this.loadValues().then(() => this.buildData())
      this.loadEngines().then(() => this.buildData())
      this.loadCollations().then(() => this.buildData())
    },
    change(data) {
      // console.log(' --- change')

      if (!this.loaded || this.data.length === 0) return false
      // console.log('ok')
      data.forEach(val => {
        this.valuesChanged[val.label] = val.value
        if (val.label === 'engine') {
          this.engine = val.value
        }
      })
      this.rebuildData()
    }
  }
}
</script>
