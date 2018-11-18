<template>
  <TheModalBase
    v-bind:header="$dict.get().confirm_action"
    v-bind:footer="queriesShow"
    v-bind:actions = "true"
    class = "modal-mutator"
    @close = "close"
  >
    <template
      v-if="!done"
      slot="actions">
      <LinkBase
        v-bind:button="true"
        @click="doYes">{{ $dict.get().mutator_yes }}<br>(Ctrl + Enter)</LinkBase>
      <LinkBase
        v-bind:button="true"
        @click="close">{{ $dict.get().mutator_no }}<br>(Escape)</LinkBase>
    </template>
  </TheModalBase>
</template>

<script>
import TheModalBase from './TheModalBase'
export default {
  name: 'TheMutator',
  components: { TheModalBase },
  props: {
    mutations: {type:Array, required: false, default: () => []}, // [{what, options }]
  },
  data() { return {
    done: false,
    status: 'reject',
    result: null,
  }},
  computed: {
    show () {
      return this.mutations.length > 0
    },
    queriesShow () {
      if (!this.show) return []
      return this.mutations.map((item, index) => {
        var query = this.$connection.prepare(item.what, item.options)
        var txt = query.query.toString()
        if (txt.length > 200) txt = txt.substr(0,199) + '...'
        return (index+1) + '. ' + txt
      })
    },
  },
  mounted () {
    window.addEventListener('keydown', this.checkKey)
    this.blurAll()
  },
  destroyed () {
    window.removeEventListener('keydown', this.checkKey)
  },
  methods: {
    checkKey (event) {
      if (!this.show) return false
      if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault()
        event.stopImmediatePropagation()
        this.doYes()
      }
    },
    complete (what, data) {
      this.done = true
      if (this.$store.state.error) {
        this.status = 'reject'
        this.result = null
        this.close()
      } else {
        this.status = what
        this.result = data
        this.close()
        this.$store.commit('message',{
          header: this.$dict.get().mutator_done,
          body: this.$dict.get().server_answer + ': ' + data,
          footer: this.queriesShow,
        })
      }
    },
    close (){
      window.removeEventListener('keydown', this.checkKey)
      this.$emit('complete', {what: this.status, data: this.result})
    },
    doYes(i) {
      window.removeEventListener('keydown', this.checkKey)
      if (!i) i = 0
      if (i >= this.mutations.length) return false
      return new Promise(() => {
        var item = this.mutations[i]
        return this.$connection.fetch(item.what, item.options).then(answer => {
          if ( i === this.mutations.length - 1 || this.$store.state.error) {
            return this.complete(item.what, answer)
          } else {
            return this.doYes(i + 1)
          }
        })
      })
    },
    blurAll() {
      var temp = document.createElement("input")
      var body = document.getElementsByTagName("body")[0]
      body.appendChild(temp)
      temp.focus()
      body.removeChild(temp)
    }
  },
}
</script>

<style scoped lang="scss">
@import "../assets/css/vars.scss";
  .action {width:50%;
  box-sizing:border-box;
  }

  .action:first-child {
    border:solid 0px $color-modal;
    border-width:0 10px 0 0;
  }
  .action:last-child {
    float:right;
    border:solid 0px $color-modal;
    border-width:0 0 0 10px;
  }

</style>