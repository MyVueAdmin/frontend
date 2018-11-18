<template>
  <div
    ref="pagination-outer"
    class="pagination-outer">
    <div
      v-show="showInfo"
      ref="pagination-info"
      class = "pagination-info"> {{ offset + 1 }} — {{ fin }} / {{ total }} </div>
    <div
      v-if="pages.length>1"
      ref="pagination-pages"
      class="pagination-pages"
    >
      <LinkBase
        v-for = "(p, index) in pages"
        v-bind:key = "index"
        v-bind:active = "p.index===page "
        v-bind:class = "{dots: p.name === '...'}"
        @click = "goto(p.index)"
      >{{ p.name }}</LinkBase>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataGridPagination',
  props: {
    limit: { type: Number, required: true },
    offset: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  data: function () {
    return {
      corner: 7, center: 5 ,
      prevWidth:0,
      showInfo:true,
      maximum: {corner: 7, center: 5} ,
    }
  },
  computed: {
    fin () {
      var out = this.offset*1 + this.limit*1
      return out < this.total ? out : this.total
    },
    totalPages () {
      return !this.limit ? 1 : Math.ceil(this.total / this.limit)
    },
    page: {
      get: function () {
        return !this.limit ? 1 : Math.round(this.offset / this.limit) + 1
      }
    },
    pages () {
      var pages = []
      var dots = false
      for (var i = 0; i < this.totalPages; i++) {
        if (this.inBlocks(i)) {
          dots = false
          pages.push({ index: i + 1, name: i + 1 })
        } else if (!dots) {
          dots = true
          var j = this.dotsPage(i)
          var name = this.dotsName(j)
          pages.push({ index: j + 1, name: name })
        }
      }
      return pages
    }
  },
  updated() {
    this.resize(true)
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resizeEvent)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeEvent)
  },
  methods: {
    resizeEvent() {
      this.resize()
    },
    resize(onlyReduce) {
      if (!this.$refs['pagination-outer'] || !this.$refs['pagination-pages'] || !this.$refs['pagination-info']) return false
      var wFull = this.$refs['pagination-outer'].offsetWidth
      var wPages = this.$refs['pagination-pages'].offsetWidth
      var wInfo = this.$refs['pagination-info'].offsetWidth
      var wGap = wFull - wPages - wInfo
      if (wGap < wInfo/3) {
        if (this.center == 1 && this.corner == 1) {
          this.showInfo = false
        }
        if (this.corner > 1) {
          this.corner = Math.max (this.corner - 1, 1)
        } else {
          this.center = Math.max (this.center - 1, 1)
        }

      } else {
        if (!onlyReduce) {
          this.showInfo = true
          if (this.corner < this.maximum.corner) {
            this.corner = Math.min (this.corner + 1, this.maximum.corner)
          } else {
            this.center = Math.min (this.center + 1, this.maximum.center)
          }
        }
      }
      /*
      if (this.$refs['pagination']) {
        var bReducing = this.prevWidth ==0 || this.prevWidth > this.$refs['pagination'].offsetWidth
        this.prevWidth = this.$refs['pagination'].offsetWidth
        var hAll = this.$refs['pagination'].offsetHeight
        var hOne = this.$refs['pagination-info'].offsetHeight
        if (hAll > hOne*1.5 && bReducing) {
          this.corner = Math.max (this.corner - 1, 1)
          this.center = Math.max (this.center - 1, 1)
        }

        if (hAll < hOne*1.5 && !bReducing) {
          if (this.corner < this.maximum.corner) {
            this.corner = Math.min (this.corner + 1, this.maximum.corner)
          }
        }

      }*/
    },
    goto (page) {
      this.$emit('offset', (page - 1) * this.limit)
    },
    inBlocks (i) {
      if (i < this.corner) return true
      if (i >= this.totalPages - this.corner) return true
      if (Math.abs(i - this.page + 1) <= this.center) return true
      return false
    },
    dotsPage (i) {
      if (i < this.page) return Math.floor((this.corner + this.page - this.center - 1) / 2)
      if (i > this.page) return Math.floor((this.totalPages - this.corner + this.page + this.center) / 2)
      return i
    },
    dotsName (j) {
      if (this.page - this.center - 1 - this.corner === 1) return j + 1
      if (this.totalPages - this.corner - this.page - this.center === 1) return j + 1
      return '...'
    }
  }
}
</script>

<style>
  .pagination-outer {
      overflow: hidden;
  }

.pagination-pages
{
  margin: 0px 5px 5px 5px;
  overflow: hidden;
  float:left;
}
.pagination-pages .link
{
  width:auto;
  min-width: 30px;
  height:30px;
  line-height:30px;
  float: left;
  font-size:12px;
  margin: 0 0px 0 0;
  padding: 0 10px;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;
}

.pagination-info {
  padding-right:45px;
  color:#999;
  font-size:12px;
  line-height:30px;
  float: right;
}

.pagination .link.dots {

}
</style>
