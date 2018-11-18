<template>
  <div id="the_navigation">
    <nav
      id = "nav"
      ref="nav">
      <transition name="navigation">
        <div
          v-show = "active"
          id = "nav-body">
          <div id = "nav-body-inner">
            <TheNavigationDatabases v-if = "database" />
            <TheNavigationTables
              ref = "tables"
              v-bind:limit = "limit"
            />
          </div>
        </div>
      </transition>
      <div id="nav-caller"><div id="nav-gradient">{{ menuSymbol }}</div></div>
      <div
        id="nav-border"
        class="margin-background" />
    </nav>
    <TheNavigationModes />
  </div>
</template>

<script>
import TheNavigationDatabases from './TheNavigationDatabases'
import TheNavigationTables from './TheNavigationTables'
import TheNavigationModes from './TheNavigationModes'
import Routes from '../mixins/Routes'
export default {
  name: 'TheNavigation',
  components: { TheNavigationTables, TheNavigationDatabases, TheNavigationModes },
  mixins: [Routes],
  data () {
    return {
      active: false,
      timeout: 5000, // ms
      heightFull: 0, // px
      escapePressed: false
    }
  },
  computed: {
    menuSymbol () {
      return this.active ? '☷' : '☰'
    },
    limit () {
      return Math.max(3, Math.floor((this.heightFull - 78) / 30) - 2)
    }
  },
  watch: {
    table () { this.disactivate() }
    /* database () { this.disactivate() } */
  },
  mounted () {
    this.$refs['nav'].addEventListener('mouseenter', this.activateDelayed)
    this.$refs['nav'].addEventListener('mouseleave', this.disactivateDelayed)
    window.addEventListener('resize', this.resize)
    window.addEventListener('keyup', this.keyup)
    window.addEventListener('keydown', this.keydown)
    this.resize()
  },
  methods: {
    disactivateDelayed () {
      window.addEventListener('click', this.disactivate)
      window.removeEventListener('click', this.activate)
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => { this.disactivate() }, this.timeout)
    },
    activateDelayed () {
      window.addEventListener('click', this.activate)
      window.removeEventListener('click', this.disactivate)
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => { this.activate() }, this.timeout)
    },
    activate () {
      if (this.active) return true
      clearTimeout(this.timer)
      this.active = true
      this.$nextTick(function () {
        if (this.$refs['tables']) {
          this.$refs['tables'].focus()
        }
      })
    },
    disactivate () {
      clearTimeout(this.timer)
      this.active = false
    },
    resize () {
      if (this.$refs['nav']) {
        this.heightFull = Math.round(this.$refs['nav'].offsetHeight)
      }
    },
    toggle() {
      this.active ? this.disactivate() : this.activate()
    },
    keyup (event) {
      if (this.$store.state.navBlock) return false
      if (!event) return false
      if (event.key === 'Escape') {
        this.escapePressed = false
      }
    },
    keydown (event) {
      if (this.$store.state.navBlock) return false
      if (!event) return false
      if (event.defaultPrevented) return false
      if (event.key === 'Escape' && !this.escapePressed) {
        this.toggle()
        this.escapePressed = true
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

  #nav, #nav-body {
    left:0;
    display:block;
    position:fixed;
    top:0px;
    height:100%;
    z-index:230;
    background: $color-ui-main;
    box-shadow: 150px 15px 200px 0px #fff;
  }

  #nav-body-inner {
    margin-top:33px;
  }

  #nav-caller {
    display:block;
    position:fixed;
    top:0px;
    height:100%;
    width:30px;
    background: $color-ui-main;
    opacity:1;
    z-index:228;
    padding-top:35px;
    transition:all 2s ease;
    cursor:pointer;
    font-size:16pt;
    font-weight: bold;
    text-align:center;
  }

  #nav-caller:hover #nav-gradient{
    background: linear-gradient(45deg, $color-ui-2, $color-ui-main);
    text-align: center;
    color: $color-act-mid;
  }

  #nav-gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, $color-ui-1, $color-ui-main);
    text-indent: 0;
    color: $color-ui-2;
    font-size: 16pt;
  }

  #nav-border {
    left:30px;
    display: block;
    position: fixed;
    top: 0px;
    height: 100%;
    width: 5px;
    z-index: 200;
  }

  .navigation-enter-active { transition: all 0.5s ease; }
  .navigation-leave-active { transition: all 1.0s ease; }
  .navigation-enter { transform: translateX(-500px); opacity: 1; }
  .navigation-leave-to{ transform: translateX(-500px); opacity: 1; }

</style>
