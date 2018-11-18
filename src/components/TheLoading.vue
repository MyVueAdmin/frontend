<template>
  <transition name="loading">
    <div
      v-if="loading"
      id="loading">
      MyVueAdmin
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheLoading',
  data () {
    return {}
  },
  computed: {
    loading () { return this.$store.state.loading }
  },
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";
#loading {
  position: fixed;
  display:block;
  box-sizing:content-box;
  left:0%;
  top:35%;
  width:100%;
  text-align: center;
  background: transparent;
  /*background: red;*/
  z-index:240;
  font-size:5vmin;
  font-style: italic;
  color:$color-ui-4;
  opacity:0.2;
  line-height:60px;
  height:60px;
  font-weight: bold;
}

.loading-enter-active { transition: all 3.0s ease; }
.loading-enter { opacity:0 !important; }
.loading-leave-active {transition: all 0.2s ease; }
.loading-leave-to{ opacity:0 !important;}
</style>
