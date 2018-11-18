<template>
  <div id="navigation-modes-holder">
    <div
      id="navigation-modes"
      class="margin-background buttons-holder">
      <transition-group name="modes">
        <div
          v-for = "item in modesOut"
          v-bind:key = "[item.to,item.label].join()"
        >
          <LinkBase
            v-bind:active = "item.active || item.activeIndirect"
            v-bind:to = "{name: item.name}"
            v-bind:icon = "item.icon"
            v-bind:label = "item.label"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavigationModes',
  computed: {
    modesOut() {
      return this.$store.state.navigation.links
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

#navigation-modes-holder {
  display:block;
  height:62px;
  width:100%;
}

#navigation-modes {
  height:45px;
  border:solid 0px $color-ui-main;
  border-width:0 0 3px 0;
}

.buttons-holder {
  margin: 0 0 0 -5px;
  padding: 5px 0;
  overflow:hidden;
  position:fixed;
  width:100%;
  z-index:220;
}

.buttons-holder a {
  display:block;
  float:left;
  margin: 0px 0 0px 5px;
  width:75px;
  height:45px;
  line-height:45px;
}

.modes-enter-active { transition: all 0.5s ease; }
.modes-leave-active { transition: all 0.5s ease; position:absolute;}
.modes-enter { transform: translateY(-60px); }
.modes-leave-to{ transform: translateY(60px); position:absolute;}

</style>
