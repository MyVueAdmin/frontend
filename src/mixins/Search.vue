<script>
export default {
  computed: {
    searchOnPage: {
      get () { return this.$store.state.search },
      set (val) { this.$store.commit('search', val) }
    }
  },
  methods: {
    searchClear(){
      this.searchOnPage = null
    },
    searchExecute (search, where) {
      var arr = search.split(',')
      if (arr.length > 1) {
        return arr.some(val=>{return this.searchString(val.trim(), where)})
      } else {
        return this.searchString(search, where)
      }
    },
    searchString (search, where) {
      if (search === '') return true
      if (where === '' || where === null) return false
      var s = search.toLowerCase()
      var arr = typeof where !== 'object' ? [where] : where
      return arr.some(val => val.toString().toLowerCase().indexOf(s) > -1)
    },
    searchRegExp (str) {
      if (str === false) str = this.searchOnPage
      if (!str) return false
      var arr = str.toString().split(',')
      var tmp = []
      arr.forEach(val => {
        var s = val.toString().trim()
        if (s !== '') {
          tmp.push(s)
        }
      })
      if (!tmp.length) return false
      return new RegExp(tmp.join('|'), 'gi')
    }
  }
}
</script>
