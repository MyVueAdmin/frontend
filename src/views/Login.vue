<template>
  <div id="login">
    <div id="login-bg"/>
    <div id="login-holder">
      <div
        id="login-header"
        class="logo">My<span>Vue</span>Admin</div>
      <div id="login-form">
        <div id="inputs">
          <input
            ref="username"
            v-model="username"
            v-bind:disabled = "connecting"
            placeholder="Username"
            @keyup="checkKeyup" ><br >
          <input
            ref="password"
            v-model="password"
            v-bind:disabled = "connecting"
            type="password"
            placeholder="Password"
            @keyup="checkKeyup" >
          <input
            v-if="serverShow || server"
            ref="server"
            v-model="server"
            v-bind:disabled = "connecting"
            placeholder="Backend address"
            >
        </div>
        <transition-group>
          <LinkBase
            v-if="showButton"
            id="submit"
            key="submit"
            ref="submit"
            v-bind:button="true"
            class="button"
            icon="sign-in-alt"
            @click="connect()" />
          <div
            v-if="!connecting"
            id="answer"
            key="answer">{{ answer | databaseAnswer }}</div>
        </transition-group>
      </div>
    <div id="server">
      <LinkBase
        v-bind:button="true"
        icon="server"
        @click="serverToggle()" />
    </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  filters: {
    databaseAnswer: function (str) {
      if (typeof str !== 'string') return ''
      if (str.substr(0, 22) === 'Access denied for user') return str.split('@')[0]
      return str
    }
  },
  data: () => ({ username: '', password: '', answer: '', connecting: false, serverShow: false }),
  computed: {
    server: {
      set(val) {
        this.$storage.setItem('server',val)
        this.$store.commit('server',val)
      },
      get() {
        return this.$store.state.server
      },
    },
    showButton() {
      return !this.connecting && this.username && this.password
    },
    whatIsNeeded () {
      if (!this.username) return 'username'
      if (!this.password) return 'password'
      return 'submit'
    }
  },
  mounted: function () {
    if (!this.$storage.available()) {
      alert('No local storage: some features will be unavailable')
    }
    if (this.$storage.hasItem('last_login')) {
      this.username = this.$storage.getItem('last_login')
    }
    this.focus(true)
  },
  methods: {
    serverToggle() {
      if (this.serverShow || this.server) {
        this.serverShow = false
        this.server = ''
      } else {
        this.serverShow = true
      }
    },
    checkKeyup (event) {
      this.answer = ''
      if (event.key === 'Enter' && !this.focus()) this.connect()
    },
    focus (anyway) {
      var need = this.whatIsNeeded
      if (anyway && need === 'submit') need = 'username'
      if (need !== 'submit') {
        if (this.$refs[need]) this.$refs[need].focus()
        return true
      } else {
        return false
      }
    },
    credentials (login, pass) {
      return btoa(JSON.stringify([encodeURI(login), encodeURI(pass)]))
    },
    connect () {
      this.answer = 'Loading'
      var me = this
      var credentials = this.credentials(this.username, this.password)
      this.$storage.setItem('last_login', this.username)
      this.connecting = true
      this.$connection.establish(credentials, true).then(answer => {
        me.answer = answer
        me.connecting = false
        me.$nextTick(() => me.focus(true))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/vars.scss";
    #login-header {
      font-size:calc(12pt + 2vmin);
      color: $color-ui-2;
      padding-bottom: 7px;
      margin: 0px auto;
      font-style: italic;
      z-index: 251;
    }
    #login-bg     {
      position: fixed;
      width: 100%;
      height: 100%;
      background: $color-ui-main;
      opacity: 0.9; left:0; top: 0; z-index: 250;
    }
    #login-holder { text-align:center; position: fixed; width: 100%; margin-top: 15%; left: 0; top: 0; z-index: 10; text-align: center;z-index: 251;}
    #login-form {
      max-width: 300px;
      margin: 0 auto;
      padding: 0px 5px;;
      text-align:center;
    }
    #submit {
      width:100%;
      text-align:center;
      float: none;
      display:block;
      padding:12px 0;
      outline: none;
      border: solid $color-act-mid 0px;
      margin:2px auto;
      font-size:24px;
      line-height:10px;
    }
    #inputs { padding:0 2px 0 0; margin:0;}
    input {
      width:100%;
      text-align:center;
      padding: 7px 0px;
      margin: 2px auto;
      border: solid $color-act-mid 1px;
      outline: none;
      float: none;
      transition: all .5s ease;
    }
    input:disabled {border-color:$color-ui-1; color:#ccc}
    #answer       {
      width: auto;
      margin:2px auto;
      padding: 3px 5px 0 5px;
      font-size: 10pt;
      color:$color-ui-4;
      font-style: italic;
    }


    #server {
      position:fixed;
      width:100%;
      left:0;
      top:0;
      line-height:30px;
      height:30px;
      text-align:left;
      color:RGBA(0,0,0,0.2);
      font-size:13px;
    }

    #server a {
      display:block;
      float:left;
      width:30px;
      height:30px;
      font-size:22px;
      background: transparent;
      color:RGBA(0,0,0,0.2);
      margin-right:0px;
    }

    #server a:hover {
      color:RGBA(0,0,0,0.5);
    }

    .v-enter-active { opacity: 1; transition: all .5s ease; }
    .v-leave-active { opacity: 0; transition: all .5s ease; }
    .v-enter, .v-leave-to { transform: translateY(20px); opacity: 0; }
</style>
