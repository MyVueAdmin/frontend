<template>
  <div
    id="modal-fog"
    @click.stop = "click" >
    <div id="modal-container">
      <div
        v-if="header"
        id = "modal-header">{{ header }}</div>
      <div
        v-if="body"
        id = "modal-body">{{ body }}</div>
      <slot name = "body" />
      <div
        v-if="footerOut.length>0"
        id = "modal-footer">
        <p
          v-for = "(txt, index) in footerOut"
          v-bind:key ="index">{{ txt }}
        </p>
        <slot name = "footer" />
      </div>
      <div
        v-if="!$slots.actions"
        id = "modal-postscriptum">
        {{ $dict.get().clickerror }}
      </div>
      <div
        v-else
        id = "modal-actions">
        <slot name = "actions" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheModalBase',
  props: {
    header: {type: String, default: ''},
    body: {type: String, default: ''},
    footer: {type: [String, Array], default: ''}
  },
  computed: {
    footerOut() {
      if (!this.footer) return []
      return typeof this.footer === 'string' ? [this.footer] : this.footer
    }
  },
  mounted () {
    window.addEventListener('keydown', this.checkKeydown)
    this.$store.commit('modal', +1)
    this.$store.commit('navBlock', +1)
  },
  destroyed () {
    window.removeEventListener('keydown', this.checkKeydown)
    this.$store.commit('modal', -1)
    this.$store.commit('navBlock', -1)
  },
  methods: {
    checkKeydown (event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopImmediatePropagation()
        this.close()
      }
    },
    click (event){
      if (this.$slots.actions) return false
      if (event.ctrlKey || event.shiftKey) this.copy()
      this.close()
      return true
    },
    copy () {
      var temp = document.createElement("input")
      var body = document.getElementsByTagName("body")[0]
      body.appendChild(temp)
      temp.value = this.body
      temp.select()
      document.execCommand("copy")
      body.removeChild(temp)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";
  #modal-fog {
    text-align:center;
    width:100%;
    height:100%;
    display:block;
    position: fixed;
    background: transparent;
    z-index:251;
    left:0;
    top:0;
  }

  #modal-container {
    width:50%;
    max-width:600px;
    min-width:200px;
    height:auto;
    display:block;
    margin:0 auto;
    padding:20px;
    position: relative;
    top:20%;
    font-size: $font-normal;
    background: $color-modal;
    color: #fff;
    z-index:252;
    border: solid 3px $color-act-dark;
    border-radius:0px 0px 0px 0;
    box-shadow: $shadow;
    text-align:left;
  }

  #modal-header {
    padding:0px 0px 5px 0px;
    font-size: $font-header;
    font-weight:bold;
    color: $color-ui-3;
  }

  #modal-body {
    padding:0;
    margin:0;
    widows: 2;
    orphans: 2;
    word-wrap: break-word;
  }

  #modal-footer {
    margin: 0;
    padding-top:6px;
    margin-top:6px;
    border:solid 1px $color-ui-4;
    border-width:1px 0 0 0;
  }

  #modal-footer p {
    margin:0;
    padding:0;
    widows: 2;
    orphans: 2;
    word-wrap: break-word;
  }


  #modal-postscriptum {
    position:fixed;
    bottom:10px;
    right:10px;
    padding:0px 0px 0px 0px;
    font-size:$font-small;
    line-height:$font-small;
    color:$color-ui-1;
    text-align:center;
    word-wrap: break-word;
  }

  #modal-actions {
    padding:20px 0px 0px 0px;
    overflow: hidden;
  }

  #modal-actions .action {
    padding:10px 0;
    float:left;
  }

  .modal-error #modal-container { border-color: $color-error;  }
  .modal-error #modal-header { color: $color-error;  }

  .modal-mutator #modal-container { border-color: $color-act-mid;  }
  .modal-mutator #modal-header { color: $color-act-mid;  }

  .modal-message #modal-container { border-color: $color-ui-2;  }
  .modal-message #modal-header { color: $color-ui-2;  }
</style>
