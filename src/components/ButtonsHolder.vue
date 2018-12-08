<template>
  <div ref="button-holder-static" class="buttons-holder-static" >
    <div ref ="button-holder" v-bind:class="classes" >
      <slot name = "pagination" />
      <transition-group v-if="transition" name="buttons-holder">
        <slot />
      </transition-group>
      <slot v-else />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheActions',
  props: {
    position: {type: String, default: 'top'},
    transition: {type: Boolean, default: false},
  },
  computed: {
    classes() {
      return {
        'margin-background':true,
        'buttons-holder':true,
        'buttons-holder-top': this.position==='top',
        'buttons-holder-bottom': this.position==='bottom',
      }
    }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      if (this.$refs['button-holder']) {
        var h = this.$refs['button-holder'].offsetHeight
        this.$refs['button-holder-static'].style.height = (h + 5) + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

.buttons-holder-static {
  display:block;
  height:40px;
}

.buttons-holder {
  margin: 0 0 0 -5px;
  padding: 5px 0 0 0;
  box-sizing: content-box;
  overflow:hidden;
  position:fixed;
  width:100%;
  z-index:220;
}

.buttons-holder a {
  display:block;
  float:left;
  margin: 0 0 5px 5px;
  width:80px;
  height:45px;
  line-height:45px;

  width:130px;
  height:50px;
}

.buttons-holder.buttons-holder-top  {
  height:auto;
  border:solid 0px $color-ui-main;
  border-width:0 0 3px 0;
}

.buttons-holder.buttons-holder-bottom {
  bottom: 0;
  border:solid 0px $color-ui-main;
  border-width:3px 0 0 0;
}

.buttons-holder-enter-active { transition: all 0.5s ease; transition-delay: 0.3s;}
.buttons-holder-leave-active { transition: all 0.3s ease; }
.buttons-holder-enter { transform: translateY(-60px);}
.buttons-holder-leave-to{ transform: translateY(0px); opacity:0;}


</style>
