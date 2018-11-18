<template>
  <div id="the_header">
    <header>
      <div id="user">
        <InputText
          v-model="searchOnPage"
          v-bind:placeholder = "$dict.get().searchpage"
          class="seacrh-on-page"
          type = "search" />
        <LinkBase
          v-bind:class="menuClasses"
          v-bind:button = "true"
          @click="toggleMenu(!menu)"
        ><div class="dots">...</div>
        </LinkBase>
        <transition name="headermenu">
          <TheHeaderMenu
            v-if="menu"
            @close = "toggleMenu(false)"
          />
        </transition>
      </div>
      <TheLogo />
      <span class = "breadcrumbs">
        <div>/<LinkBase v-bind:to = "{name: 'host-content'}" >localhost</LinkBase></div>
        <div v-if = "database" >/<LinkBase v-bind:to = "{name: 'database-content'}" >{{ database }}</LinkBase> </div>
        <div v-if = "table">/<LinkBase v-bind:to = "{action: 'show'}" >{{ table }}</LinkBase> </div>
      </span>
    </header>
  </div>
</template>

<script>
import InputText from './InputText'
import InputBase from './InputBase'
import TheHeaderMenu from './TheHeaderMenu'
import TheLogo from './TheLogo'
import Routes from '../mixins/Routes'
import Search from '../mixins/Search'
export default {
  name: 'TheHeader',
  components: { InputText, InputBase, TheHeaderMenu, TheLogo },
  mixins: [ Routes, Search ],
  data() {
    return {
      menu: false
    }
  },
  computed: {
    menuClasses () {
      return {
        menu: true,
        active: this.menu
      }
    }
  },
  watch: {
    database () { this.searchOnPage = '' },
    table () { this.searchOnPage = '' },
    action () { this.searchOnPage = '' },
    entry () { this.searchOnPage = '' }
  },
  methods: {
    toggleMenu (val) {
      this.menu = val
    }
  },
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

#the_header {
  height:34px;
}

header {
  background: $color-ui-main;
  overflow:hidden;
  position:fixed;
  width:100%;
  left:0;
  top:0px;
  z-index:240;
  padding: 5px 0;
  height: 24px;
}

header input {
  height: 24px;
  line-height: 24px;
  font-style: italic;
}

header input::placeholder { color:$color-ui-2; }
header input:focus::placeholder { color:$color-ui-1; }

.breadcrumbs>div, #logo {
  font-style: italic;
  display:block;
  float:left;
  line-height: 24px;
}

.breadcrumbs {
  font-weight: normal;
  color: $color-ui-1;
  font-size:11pt;
}
.breadcrumbs .link {
  display: inline;
  background: transparent;
  color: $color-ui-3;
  padding:0 10px;
  display:inline !important;
}
.breadcrumbs .link:hover {
  background: transparent;
  color: $color-act-dark;
  text-decoration: underline;

}

#user {
  float:right;
  display:block;
  margin:0;
  margin-right:5px;
  padding:0;
}

.seacrh-on-page {
  float: left;
  border:none;
  outline:none;
  text-indent:5px;
  padding: 0;
  margin: 0;
}

.langer {
    width:50px;
}

.menu{
  float:right;
  display:block;
  width:24px;
  height:24px;
  padding:0px 0px;
  margin:0 0 0 5px;
  border:none;
  background: $color-ui-1;
  color: $color-ui-3;
  cursor: pointer;
  font-family:Sans Serif;
  font-weight: bold;
  background:$color-act-mid;
  color:$color-ui-0;
}

.menu.active .dots {
  transform: rotate(270deg);
}

.menu.active:hover {
  background:$color-act-mid;
}

.menu .dots {
  font-size: 28px;
  transform: rotate(90deg);
  line-height: 10px;
  background: transparent;
  text-align:center;
  width:24px;
  height:24px;
  transition:all 0.5s;
}


  .headermenu-enter-active { transition: all 0.5s ease; }
  .headermenu-leave-active { transition: all 0.5s ease; }
  .headermenu-enter { transform: translateX(300px); opacity: 1; }
  .headermenu-leave-to{ transform: translateX(300px); opacity: 1; }

</style>
