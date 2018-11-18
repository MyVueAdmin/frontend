<script>
export default {
  methods: {
    breakerGetClean (str) { // get string with substrings changed to «-»
      var arr = this.breakerMain(str)
      for (var j = 1; j < arr.length; j += 2) {
        arr[j] = this.spaces(arr[j].length)
      }
      return arr.join('')
    },
    breakerGetParts (str) {
      return this.breakerMain(str)
    },
    breakerMain (str) {
      var points = this.breakerPoints(str)
      var parts = []
      var start = 0
      points.forEach((finish, j) => {
        if (j % 2 === 0) {
          parts.push(str.substr(start, finish - start))
          start = finish
        } else {
          parts.push(str.substr(start, finish - start + 1))
          start = finish + 1
        }
      })
      parts.push(str.substr(start))
      return parts
    },
    removeQuotes (str) {
      var quotes = ['`', "'", '"']
      var tmp = quotes.map(q => '' + q + '')
      var quotesExp = new RegExp(tmp.join('|'), 'gi')
      return str.replace(quotesExp, '')
    },
    breakerPoints (str) {
      var quotes = ['`', "'", '"']
      var points = []
      var current = -1
      var check
      for (var i = 0; i < str.length; i++) {
        if (current === -1) { // searching start of the quted substring
          check = quotes.indexOf(str.substr(i, 1))
          if (check > -1) {
            points.push(i)
            current = quotes[check]
          }
        } else { // searching end of currently found quoted string
          var prev = i > 0 ? str.substr(i - 1, 1) : ''
          check = str.substr(i, 1)
          if (check === current && prev !== '\\') {
            points.push(i)
            current = -1
          }
        }
      }
      return points
    },
    spaces (n) {
      var out = ''
      for (var i = 0; i < n; i++) out += '-'
      return out
    }
  }
}
</script>
