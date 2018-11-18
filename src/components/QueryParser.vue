<template>
  <div>
    <!-- MySQL query parser component -->
  </div>
</template>

<script>
import Breaker from '../mixins/Breaker'
import QueryParserSelect from '../mixins/QueryParserSelect'
export default {
  name: 'QueryParser',
  mixins: [Breaker, QueryParserSelect],
  props: {
    query: {type: [String, Array], default: ''},
    state: {type: Object, default: () => { return {} } }
  },
  data () {
    return {
      pagination: false
    }
  },
  computed: {
    keywords () { return this.$store.state.parser.mysql.keywords },
    queries () { return this.$store.state.parser.mysql.queries },
    types () { return Object.keys(this.queries) },
    type () {
      var min = -1
      var out
      this.types.forEach(type => {
        var regexp = new RegExp('\\b' + type + '\\b', 'i')
        var result = regexp.exec(this.queryClean)
        if (result && (result.index < min || min === -1)) {
          min = result.index
          out = type
        }
      })
      return out
    },
    queryClean () { return this.breakerGetClean(this.query) },
    table () {
      var table = ''
      switch (this.type) {
      case 'select': table = this.blocks['from']
      }
      if (!table) return ''
      table = table.toString().trim()
      table = table.split(' ')[0]
      var arr = table.split('.')
      table = arr[arr.length - 1]
      table = this.removeQuotes(table)
      return table
    },
    blocks () {
      this.state.updated
      if (!this.query) return false
      return this.processBlocks(this.getBlocks())
    },
    processed () {
      var out = []
      for (var block in this.blocks) {
        var content = this.blocks[block].toString().trim()
        out.push(block.toUpperCase())
        out.push(content)
      }
      return out.join(' ')
    }
  },
  watch: {
    processed () {
      this.emitProcessed()
    }
  },
  mounted () {
    this.emitProcessed()
  },
  methods: {
    processBlocks (blocks) {
      switch (this.type) {
      case 'select':
        blocks = this.processSelect(blocks)
        break
      }
      return this.reorderBlocks(blocks)
    },
    getBlocks () {
      var blocksList = this.queries[this.type]
      // get blocks positions
      var start = -1
      var blocks = {}
      var blockPrev = ''
      for (var i in blocksList) {
        var block = blocksList[i]
        var regexp = new RegExp('\\b' + block + '\\b', 'i')
        regexp.lastIndex = start
        var result = regexp.exec(this.queryClean)
        if (result) {
          start = result.index + block.length
          blocks[block] = { start: start, end: this.queryClean.length }
          if (blockPrev !== '') {
            blocks[blockPrev].end = result.index
          }
          blockPrev = block
        }
      }
      var out = {}
      // get blocks contents
      for (var b in blocks) {
        var content = this.query.substr(blocks[b].start, blocks[b].end - blocks[b].start)
        content = content.replace(new RegExp('^[;]+|[;]+$', 'g'), '')
        out[b] = content
      }
      return out
    },
    reorderBlocks (blocksIn) {
      var blocks = {}
      var blocksList = this.queries[this.type]
      for (var i in blocksList) {
        var key = blocksList[i]
        if (blocksIn[key]) {
          blocks[key] = blocksIn[key]
        }
      }
      return blocks
    },
    emitProcessed () {
      this.$emit('input', {
        query: this.processed,
        type: this.type,
        table: this.table,
        pagination: this.pagination
      })
    }
  }
}
</script>
