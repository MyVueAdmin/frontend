<template>
  <div>
    <DataEditor
      v-if="loaded"
      v-bind:data = "data"
      v-bind:insert = "entity === null || copy"
      @update = "update"
      @insert = "insert"
      @del = "del"
    />
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
import DataEditor from '../components/DataEditor'
import TheMutator from '../components/TheMutator'
import Routes from '../mixins/Routes'
export default {
  name: 'ColumnsEdit',
  components: { DataEditor, TheMutator },
  mixins: [ Routes ],
  props: {copy: {type: Boolean, default: false}},
  data () {
    return {
      newName: '',
      // loaded: false,
      values: {},
      positions: [],
      collations: [],
      data: [],
      mutation: {what:'', options: {}}
    }
  },
  computed: {
    loaded () { return this.collations.length > 0 && this.positions.length>0 },
    mutations () {
      return this.mutation.what ? [this.mutation] : []
    },
    primary () { return 'Field' },
    fields () { return Object.assign([], this.$store.state.parser.mysql.fields) }
  },
  mounted () {
    this.load()
  },
  methods: {
    mutate (what, data) {
      var values = this.extractValues(data)
      var options = {
        table: this.table,
        nameOld: this.values['Field'],
        nameNew: values['Field'],
        type: values['Type'],
        isnull: values['Null'] === 'YES' ? 'NULL' : 'NOT NULL',
        defval: values['Default'] === null ? '' : 'DEFAULT ' + this.$connection.escapeAndQuote(values['Default']),
        extra: values['Extra'] === null ? '' : values['Extra'],
        comment: this.$connection.escapeAndQuote(values['Comment']),
        position: values['Position'] === 'FIRST' ? 'FIRST' : 'AFTER ' + values['Position']
      }
      this.mutation = { what , options }
    },
    complete (answer) {
      switch (answer.what) {
      case 'addColumn':
      case 'changeColumn':
        this.$router.push({name:'table-structure-edit', params: {entity: this.mutation.options.nameNew}})
        this.load()
        break
      case 'delColumn':
        this.$connection.fetchFields(this.database, this.table, true).then(() => {
          this.$router.push({name:'table-structure'})
        })
        break
      }
      this.mutation = { what: '', options: {} }
    },
    del (data) { this.mutate('delColumn', data) },
    insert (data) { this.mutate('addColumn', data) },
    update (data) { this.mutate('changeColumn', data) },
    extractValues (data) {
      var values = {}
      data.forEach(val => {
        values[val.label] = val.value
      })
      return values
    },
    buildData () {
      if (!this.loaded) return []
      this.data = this.fields.map(val => {
        var out = Object.assign({}, val)
        out.value = this.getValue(out)
        out.options = this.getOptions(out)
        return out
      })
    },
    getValue (row) {
      switch (row.label) {
      default: return this.values[row.label] ? this.values[row.label] : null
      }
    },
    getOptions (row) {
      switch (row.label) {
      case 'Position': return this.positions
      case 'Collation': return this.collations
      default: return row.options ? row.options : null
      }
    },
    loadCollations () {
      return this.$connection.fetch('collations').then(data => {
        this.collations = data.map(item => ({
          label: item.Collation,
          value: item.Collation,
          block: item.Charset
        }))
      })
    },
    loadData () {
      return this.$connection.fetchFields(this.database, this.table, true).then(answer => {
        var labelFirst = this.$dict.get().first
        this.values = {}
        this.positions = []
        this.positions.push({label: labelFirst, value: 'FIRST'})
        answer.forEach((val, idx) => {
          var label = val.Field
          if (label === this.entity) {
            this.values = Object.assign({'Position': this.positions[idx].value}, answer[idx])
          } else {
            this.positions.push({label, value: label})
          }
        }, this)

      })
    },
    load () {
      this.loadCollations().then(() => this.buildData())
      this.loadData().then(() => this.buildData())
    }
  }
}
</script>
