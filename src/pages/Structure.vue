<template>
  <div>
    <DataGrid
      v-if = "loaded"
      v-bind:data = "fieldsOut()"
      v-bind:total = "fields.length"
      v-bind:limit = "fields.length"
      v-bind:order = "order"
      v-bind:disable-filters = "true"
      v-bind:controls = "controls"
      control = "Field"
      @order = "changeOrder"
      @reload = "reload"
    />
  </div>
</template>

<script>
import DataGrid from '../components/DataGrid'
import Routes from '../mixins/Routes'
export default {
  name: 'ColumnsShow',
  components: {DataGrid },
  mixins: [ Routes],
  data () {
    return {
      loaded: false,
      fields: [],
      order: {
        field: '#',
        desc: false
      }
    }
  },
  computed: {
    controls: () => ['edit', 'copy']
  },
  watch: {
    table () { this.load() },
    database () { this.load() },
    action () { this.load() }
  },
  mounted () {
    this.load()
  },
  methods: {
    reload () {
      this.$connection.fetchFields(this.database, this.table, true).then(answer => {
        this.fields = answer
        this.loaded = true
      })
    },
    fieldsOut () {
      if (!this.fields) return ''
      var out = this.fields.map((val,i) => Object.assign({'#': i + 1}, val))
      out.sort(this.orderer)
      return out
    },
    orderer (a, b) {
      var field = this.order.field
      var desc = this.order.desc
      var out = a[field] === b[field] ? 0 : (a[field] > b[field] ? 1 : -1)
      if (a[field] === '0' && b[field] === null) out = 1
      if (a[field] === null && b[field] === '0') out = -1
      if (a[field] === '' && b[field] === null) out = 1
      if (a[field] === null && b[field] === '') out = -1
      if (desc) out = -out
      return out
    },
    changeOrder (val) {
      this.order = val
      this.$forceUpdate()
    },
    load () {
      this.$connection.fetchFields(this.database, this.table).then(answer => {
        this.fields = answer
        this.loaded = true
      })
    }
  }
}
</script>
