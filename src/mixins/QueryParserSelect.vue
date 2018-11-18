<script>
/* Highly MySQL-specfifc file */
export default {
  methods: {
    processSelect (blocks) {
      // SELECT
      blocks.select = 'SQL_CALC_FOUND_ROWS' + blocks.select
      // ORDER
      if (this.state.order && this.state.order.field) {
        var orderby = ''
        orderby = '`' + this.state.order.field + '`'
        if (this.state.order.desc) {
          orderby += ' DESC'
        }
        if (blocks['order by']) {
          blocks['order by'] = orderby + ', ' + blocks['order by']
        } else {
          blocks['order by'] = orderby
        }
      }

      // WHERE
      if (this.state.filters) {
        var filters = []
        for (var fld in this.state.filters) {
          var val = this.state.filters[fld].value.toString()
          var collation = this.state.filters[fld].collation
          var push = true
          switch (collation) {
          case 'LIKE':
            val = val.replace(/'/g, "\\'")
            val = `LOWER('%${val}%')`
            filters.push(`LOWER(${fld}) ${collation} ${val}`)
            push = false
            break
          case 'BETWEEN':
            val = val.replace(/'/g, "\\'")
            break
          case 'IN':
            var vals = val.split(',')
            var join = vals.map(val => "'" + val.toString().trim().replace(/'/g, "\\'") + "'" )
            val = '(' + join.join(', ') + ')'
            break
          default:
            val = val.replace(/'/g, "\\'")
            val = `'${val}'`
            break
          }
          if (push) {
            filters.push(`\`${fld}\` ${collation} ${val}`)
          }
        }
        if (filters.length > 0) {
          var f = filters.join(' AND ')
          blocks['where'] = blocks['where'] ? '(' + blocks['where'] + ') AND ' + f : f
        }
      }

      // LIMIT
      var limit = 30
      var offset = 0
      if (!blocks.limit) {
        if (this.state.limit && this.state.limit > -1) limit = this.state.limit
        if (this.state.offset && this.state.offset > -1) offset = this.state.offset
        this.pagination = true
      } else {
        this.pagination = false
        var limitArr = []
        var limitStr = blocks.limit.toString().toLowerCase()
        limitStr = limitStr.replace(/ /g, '')
        if (limitStr.indexOf('offset') > 0) {
          limitArr = limitStr.split('offset')
          limit = limitArr[0]
          offset = limitArr[1]
        } else {
          limitArr = limitStr.split(',')
          if (limitArr.length === 1) {
            limit = limitArr[0]
            offset = 0
          } else {
            limit = limitArr[1]
            offset = limitArr[0]
          }
        }
        if (isNaN(limit)) limit = 30
        if (isNaN(offset)) offset = 0
        limit = Math.min(limit, 100)
      }
      blocks.limit = `${offset}, ${limit}`
      return blocks
    }
  }
}
</script>
