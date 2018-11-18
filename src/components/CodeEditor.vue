<template>
  <div
    id="code-editor"
    ref="container"
    @click = "update">
    <div
      id="code-editor-styled"
      ref="styled"
      v-html = "textStyled" />
    <textarea
      id="code-editor-raw"
      ref="raw"
      v-model="textRaw"
      @input = "update" />
  </div>
</template>

<script>
import Breaker from '../mixins/Breaker'
export default {
  name: 'CodeEditor',
  mixins: [Breaker],
  props: {
    keywords: { type: [Object, Array], required: true },
    text: { type: String, default: '' }
  },
  data () {
    return {
      textInput: '',
      textRaw: ''
    }
  },
  computed: {
    keywordsRegExp () {
      var tmp = this.keywords.map(val => '\\b' + val + '\\b')
      return new RegExp(tmp.join('|'), 'gi')
    },
    textStyled () {
      var str = this.textRaw.replace(/\n/g, '<br>')
      var parts = this.breakerGetParts(str)
      for (var j = 0; j < parts.length; j += 2) {
        parts[j] = parts[j].replace(this.keywordsRegExp, this.replacer)
      }
      return parts.join('')
    }
  },
  watch: {
    text (val) {
      if (val !== this.textRaw) {
        this.textRaw = this.text
      }
    }
  },
  mounted () {
    this.textRaw = this.text
  },
  methods: {
    replacer (match) {
      return '<span class="keyword">' + match + '</span>'
    },
    update () {
      var containerH = this.$refs.container.offsetHeight
      this.$refs.raw.style.height = '1px'
      var contentH = this.$refs.raw.scrollHeight + 25
      if (contentH > containerH) {
        this.$refs.raw.style.height = contentH + 'px'
      } else {
        this.$refs.raw.style.height = '100%'
      }
      this.$emit('input', this.textRaw)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

  #code-editor {
    border-radius: 0px 0 0 0px;
    border: solid 2px $color-ui-main;
    background: $color-ui-0;
    padding: 5px;
    margin: 0px;
    height: 72px;
    min-width: 400px;
    min-height: 18px;
    display:block;
    resize: both;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #code-editor-styled, #code-editor-raw {
    font-family: "Courier New", Courier, monospace !important;
    word-break: break-word !important;
    word-wrap: normal;
    font-size: 13pt !important;
    line-height: 13pt !important;
    text-align: left;
    text-indent: 0;
    padding:0px !important;
    background: transparent !important;
    font-weight: normal !important;
    margin:0 !important;
    width:100%;
    resize: none;
    outline:none;
    border:none;
    white-space: pre-wrap;
    /* overflow-x: hidden; */
    scroll:none;
  }

  #code-editor-raw {
    z-index:101;
    height:100%;
    background: transparent !important;
    color: transparent !important;
    caret-color: black !important;
    overflow:hidden;
    /* outline:solid 2px red !important; */
  }

  #code-editor-styled {
    height: 0px;
    z-index:100;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    color: black !important;
  }

  #code-editor-styled span { color: green !important; text-transform: uppercase;}

</style>
