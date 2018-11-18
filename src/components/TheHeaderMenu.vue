<template>
  <menu
    @mouseenter = "eventOver()"
    @mouseleave = "eventOut()"
  >
    <div class = "menu-item menu-group">
      <label v-html = "$dict.get().language"/>
      <TheHeaderMenuLangs class="switcher"/>
    </div>
    <div class = "menu-item menu-group">
      <label v-html = "$dict.get().onpage"/>
      <TheHeaderMenuPages class="switcher"/>
    </div>
    <LinkBase
      class="menu-item"
      v-html = "$dict.get().about" />
    <LinkBase
      class="menu-item"
      @click="disconnect"
      v-html = "$dict.get().logoff" />
  </menu>
</template>

<script>
import TheHeaderMenuLangs from './TheHeaderMenuLangs'
import TheHeaderMenuPages from './TheHeaderMenuPages'
export default {
  name: 'TheHeaderMenu',
  components: { TheHeaderMenuLangs, TheHeaderMenuPages},
  mounted() {
    this.eventOut()
  },
  methods: {
    disconnect: function () { this.$connection.close() },
    close() { this.$emit("close") },
    eventOver () { window.removeEventListener('click', this.close) },
    eventOut () { window.addEventListener('click', this.close) },
  },
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";
menu {
  position: fixed;
  width:187px;
  padding:5px;
  border: solid 2px $color-act-mid;
  background:$color-ui-0;
  color:$color-ui-4;
  text-align:left;
  right:5px;
  font-size:12px;
  margin-top:24px;
  box-shadow: $shadow;
}

menu .menu-item {
  padding:0px 0;
  color: $color-ui-4;
  overflow:hidden;
  line-height:24px;
  margin-bottom:1px;
}

menu a:hover {
  background: $color-act-pale;
  color:$color-ui-9;
}

menu label {
  display:block;
  font-size:0.9em;
  line-height:1.0em;
  padding-bottom:2px;
}

menu .switcher a {
  width:46px;
  padding:0;
  overflow:hidden;
  margin-top:1px;
}

menu .menu-group {
  border:solid 1px $color-ui-main;
  border-width:0 0 1px 0;
  padding-bottom:5px;
  margin-bottom:5px;
  margin-top:0px;
  padding-top:0px;
  margin-right:-1px;
}


</style>
