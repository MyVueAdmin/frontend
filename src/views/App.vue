<template>
  <div id = "app">
    <TheInformer />
    <TheLoading />
    <transition name="modal-bg"><div
      v-if="modal"
      id="modal-bg" /></transition>
    <transition name="modal"><TheError v-if= "error" /></transition>
    <transition name="modal"><TheMessage v-if= "message" /></transition>
    <TheHeader v-if="loaded.databases" />
    <TheNavigation v-if="loaded.databases" />
    <TheContent
      v-if="loaded.databases"
      v-bind:class="{loading}" />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader'
import TheInformer from '../components/TheInformer'
import TheLoading from '../components/TheLoading'
import TheError from '../components/TheError'
import TheMessage from '../components/TheMessage'
import TheNavigation from '../components/TheNavigation'
import TheContent from '../components/TheContent'
import Routes from '../mixins/Routes'
export default {
  name: 'App',
  components: { TheNavigation, TheHeader, TheInformer,TheLoading, TheContent, TheError, TheMessage },
  mixins: [ Routes ],
  data () {
    return {
      loaded: { tables: false, databases: false },
      ready: false
    }
  },
  computed: {
    modal () { return this.$store.state.modal },
    loading () { return this.$store.state.loading },
    error () { return this.$store.state.error !== '' && this.$store.state.error !== null },
    message () { return this.$store.state.message !== '' && this.$store.state.message !== null },
    navigationBase() {
      return this.$router.options.routes.find(route => {
        if (route.children) {
          return route.children.some(child => child.name === this.$route.name)
        } else {
          return route.name === this.$route.name
        }
      })
    },
    navigation () {
      var out = {links: [], actions:[]}
      this.$router.options.routes.forEach(route => {
        if (route.group === this.navigationBase.group) {
          var link = this.navigationItem(route.children ? route.children[0] : route, route.children)
          out.links.push(link)
          if (route.children && link.active) {
            var action = {}
            if (link.name ===  this.$route.name) { // if default route is active
              action = this.navigationItem(route.children.find(child => child.path === 'add'))
            } else { // if default one of sub-routes is active
              action = Object.assign(Object.assign({},link), {icon:'arrow-left', label: 'back'})
            }
            if (action) out.actions.push(action)
          }
        }
      })
      return out
    }
  },
  watch: {
    ready (val) {
      if (val) this.loadDatabases().then(() => this.loadTables())
    },
    database (val) {
      if (val) this.loadTables()
    },
    '$route' () {
      this.commitNavigation()
    }
  },
  mounted () {
    this.loadFromLocalStorage()
    this.commitNavigation()
    this.ready = true
  },
  destroyed () {},
  methods: {
    commitNavigation() {
      this.$store.commit('navigation', this.navigation)
    },
    loadFromLocalStorage () {
      if (this.$storage.hasItem('lang')) {
        this.$store.commit('lang', this.$storage.getItem('lang'))
      } else {
        var lang = this.$store.state.constants.langs[0].value
        this.$store.commit('lang', lang)
      }

      if (this.$storage.hasItem('onpage')) {
        this.$store.commit('onpage', this.$storage.getItem('onpage'))
      } else {
        var onpage = this.$store.state.constants.onpages[0].value
        this.$store.commit('onpage', onpage)
      }
    },
    loadDatabases () {
      return this.$connection.fetch('databases', {database: 'no'}).then(data => {
        this.$store.commit('databases', data)
        this.loaded.databases = true
        return data
      })
    },
    loadTables () {
      if (!this.database) return null
      return this.$connection.fetch('tables', {database: this.database}).then(data => {
        this.$store.commit('tables', data)
        this.loaded.tables = true
        return data
      })
    },
    navigationItem(route, children) {
      if (!route) return {}
      var name = route.name
      var active = name === this.$route.name
      if (!active && children) active = children.some(child => child.name === this.$route.name)
      var label = route.label ? route.label : route.name
      var icon = route.icon ? route.icon : name.toString().split('-').pop()
      return { name, active, label, icon }
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/vars.scss";

html, body {
  min-width: 100%;
  width: 100%;
  margin:0;
  padding:0;
}

html {
  min-width: 580px;
  overflow: scroll;
  position: absolute;
  font-family: NoToSans, Open Sans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}

#app {
  padding-left:35px;
}

.logo { font-weight: bold; color: #aaa; font-style: italic; }
.logo span {color:$color-act-mid;}

content.loading {
  opacity:0.5 !important;
  transition: all 0.5s;
}

content {
  /* background: RGBA(0,0,0,0.3); */
  display: block;
  padding: 0;
  margin: 0;
  transition: all 0.3s;
  box-sizing:border-box;
}

.margin-background {
  background: RGBA(255,255,255,0.9);
}


  .nothing-message {
    color:#ccc;
    padding:0 0 5px 0;
    font-size:16pt;
    font-style: italic;
  }


h1 {font-size: 14pt; color:#999;}
h1 span {color:#555;}

#checking {
    position:fixed;
    top:10%;
    font-size:24pt;
    color:$color-ui-main;
    font-style: italic;
    width:100%;
    text-align: center;
}

/* COMMON */
.float-right {float:right}

/* INPUTS */
  textarea {
    text-indent: 0px;
    height: 60px;
    line-height: 15px;
  }

  select option { display:block; }

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

  .buttons-group
  {
     padding:3px 0;
  }

  .buttons-group .float-right {
    margin:0 0 0 2px;
  }

  hr {
    border: solid $color-ui-main 1px;
    border-width: 1px 0 0 0;

  }

.modal-enter-active { transition: all 0.5s ease;}
.modal-enter {transform: translateY(10%);  opacity:0 !important; }
.modal-leave-active {transition: all 0.5s ease;}
.modal-leave-to{  transform: translateY(-50%);opacity:0 !important;}

.modal-bg-enter-active { transition: all 0.3s ease;}
.modal-bg-enter { opacity:0 !important; }
.modal-bg-leave-active { transition: all 0.3s ease;}
.modal-bg-leave-to{ opacity:0 !important;}

#modal-bg {
  text-align:center;
  width:100%;
  height:100%;
  display:block;
  position: fixed;
  background: $color-act-darker;
  z-index:250;
  opacity:0.8;
  left:0;
  top:0;
}
</style>
