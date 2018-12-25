import parser from './parser.js'
import styles from './styles.js'
import constants from './constants.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: { parser, styles, constants },
  state: {
    server: '',
    lang: 'en',
    onpage: 0,
    loading: false,
    error: null,
    message: null,
    modal: 0,
    threads: 0,
    checked: false,
    connected: false,
    navBlock: false,
    search: '',
    searchSkip: 0,
    searchMax: 0,
    searchFound: '',
    databases:[],
    tables:[],
    fields:{},
    navigation: {
      links: [],
      actions: [],
    }
  },
  mutations: {
    databases (state, input) { state.databases = input },
    tables (state, input) { state.tables = input },
    fields (state, input) { state.fields[input.table] = input.fields },
    search (state, val) { state.search = val },
    searchSkip (state, val) { state.searchSkip = val },
    searchMax (state, val) { state.searchMax = val },
    searchFound (state, val) { state.searchFound = val },
    navBlock (state, val) { state.navBlock = Math.max(0, state.navBlock+val) },
    modal (state, val) { state.modal = Math.max(0, state.modal+val) },
    error (me, val) { me.error = val },
    message (me, val) { me.message = val },
    checked (me, val) { me.checked = val },
    loading (me, val) { me.loading = val },
    threadsPlus (me) { me.threads++ },
    threadsMinus (me) { me.threads = Math.max(0, me.threads - 1) },
    connected (me, val) { me.connected = val },
    database (me, val) { me.database = val },
    lang (me, val) { me.lang = val },
    onpage (me, val) { me.onpage = val },
    navigation (me, val) { me.navigation = val },
    server (me, val) { me.server = val }
  },
  actions: {
    startLoading (me) {
      me.commit('threadsPlus')
      me.commit('loading', true)
    },
    endLoading (me) {
      me.commit('threadsMinus')
      me.commit('loading', me.state.threads > 0)
    }
  }
})
