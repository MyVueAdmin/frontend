<template>
  <transition name="informer">
    <div
      v-if="active && loading"
      id="informer">
      {{ $dict.get().waiting }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheInformer',
  data () {
    return {
      active: false,
      timer: null
    }
  },
  computed: {
    loading () { return this.$store.state.loading }
  },
  watch: {
    loading (val) {
      if (val) {
        clearTimeout(this.timer)
        this.active = false
        this.timer = setTimeout(() => { this.active = true }, 500)
      } else {
        clearTimeout(this.timer)
        this.active = false
        this.timer = null
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";
#informer {
  position: fixed;
  display:block;
  box-sizing:content-box;
  right:0;
  bottom:0;
  width:50%;
  padding-right:20px;
  text-align:right;
  z-index:251;
  font-size:18px;
  font-style: italic;
  color:$color-ui-4;
  color:$color-act-mid;
  opacity:0.9;
  line-height:55px;
}

.informer-enter-active { transition: all 0.5s ease; }
.informer-enter { opacity:0 !important; }
.informer-leave-active {transition: all 0.2s ease; }
.informer-leave-to{ opacity:0 !important;}
</style>
