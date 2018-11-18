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
  name: 'ContentEdit',
  components: { DataEditor, TheMutator },
  mixins: [ Routes ],
  props: {copy: {type: Boolean, default: false}},
  data () {
    return {
      loaded: false,
      fields: [],
      values: {},
      data: [],
      mutation: {what:'', options: {} }
    }
  },
  computed: {
    mutations () {
      return this.mutation.what ? [this.mutation] : []
    },
    primary () {
      var ret = this.fields.find(val => val.Key === 'PRI')
      return ret ? ret.Field : 'none'
    }
  },
  watch: {
    entity () {
      this.loadValues()
    }
  },
  mounted () {
    this.loadFields().then(() => this.loadValues())
  },
  methods: {
    mutate (what, data) {
      var options = {
        database: this.database,
        table: this.table,
        field: this.primary,
        value: this.entity,
        data: this.serializeUpdateFields(data)
      }
      this.mutation = { what , options }
    },
    complete (answer) {
      switch (answer.what) {
      case 'update':
        this.loadValues()
        break
      case 'insert':
        // this.entity = answer.data
        this.$router.push({name:'table-content-edit', params: {entity: answer.data}})
        break
      case 'del':
        this.$router.push({name:'table-content'})
        // this.action = 'show'
        break
      }
      this.mutation = { what: '', options: {} }
    },
    del (data) { this.mutate('del', data) },
    insert (data) { this.mutate('insert', data) },
    update (data) { this.mutate('update', data) },
    buildData () {
      this.loaded = true
      this.data = this.fields.map(fld => {
        var type = this.parseType(fld.Type)
        return {
          type,
          label: fld.Field,
          info: fld.Type,
          value: this.values[fld.Field] ? this.parseValue(this.values[fld.Field], type) : null,
          options: type === 'enum' ? this.parseEnum(fld.Type) : {},
          disabled: fld.Field === this.primary || fld.Default == 'CURRENT_TIMESTAMP',
          defval: fld.Default,
          isnull: fld.Null === 'YES'
        }
      })
    },
    loadFields () {
      return this.$connection.fetchFields(this.database, this.table).then(answer => this.fields = answer)
    },
    loadValues () {
      if (this.entity === null) {
        this.buildData()
        return false
      }
      var options = {
        database: this.database,
        table: this.table,
        field: this.primary,
        value: this.entity
      }
      return this.$connection.fetch('entry', options).then(answer => {
        if (this.copy) {
          answer[this.primary] = ''
        }
        this.values = answer
        this.buildData()
      })
    },
    parseType (type) {
      if (!type) return 'none'
      var str = type.toString().toLowerCase()
      // if (str === 'foreignKey') return 'select'
      if (str.substr(0, 4) === 'enum') return 'enum'
      if (str.substr(0, 3) === 'set') return 'enum'
      if (str.substr(0, 3) === 'int') return 'int'
      if (str.substr(0, 7) === 'tinyint') return 'int'
      if (str.substr(0, 9) === 'timestamp') return 'datetime'
      if (str.substr(0, 4) === 'text') return 'textarea'
      if (str.substr(0, 8) === 'longtext') return 'textarea'
      if (str.substr(0, 7) === 'varchar') {
        var len = Number(str.substr(0,str.length-1).split('(')[1])
        if (len >= 250) return 'textarea'
      }
      return str
    },
    parseEnum (type) {
      if (!type) return []
      var str = type.substr(5, type.length - 6)
      return this.$valset.parse(str)
    },
    parseValue (val, type) {
      switch (type) {
      case 'int': return Number(val)
      default: return val.toString()
      }
    },
    serializeUpdateFields (data) {
      var out = []
      data.forEach(fld => {
        var label = fld.label
        var value = fld.value
        switch (fld.type) {
        case 'set':
        case 'enum':
          if (value) {
            value = this.$valset.prepare(value)
          }
          value = `'${value}'`
          break;
        default:
          value = fld.function ? fld.value : this.$connection.escapeAndQuote(value, fld.isnull)
          break;
        }
        if (fld.changed) {
          out.push('`' + label + '` = ' + value)
        }
      })
      return out.join(', ')
    },
  }
}
</script>
