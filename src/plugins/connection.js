import queries from './connectionQueries.js'
import store from '../store';

export default {
  install (Vue, options) {
    Vue.prototype.$connection = {
      settings() {
        if (typeof g_config == 'undefined') {
          return {server: '/'}
        } else {
          /*eslint no-undef: "off"*/
          return g_config
        }
      },
      server() {
        if (store.state.server && store.state.server !='') return store.state.server
        return this.settings().server
      },
      /* base methods */
      prepare(what, variables) {
        var query = queries.get(what)
        var template = query.template
        if (variables) {
          for (var v in variables) {
            template = template.replace(`$${v}$`, variables[v])
          }
        }
        query.query = template
        query.database = this.database()
        return query
      },
      clearLocalStorage(){
        var safe = ['lang', 'last_login', 'server']
        var keys = Vue.prototype.$storage.keys()
        keys.forEach(key => {
          if (safe.indexOf(key) < 0) Vue.prototype.$storage.removeItem(key)
        })
      },
      stripTags(html) {
        return !html ? '' : html.toString().replace(/<\/?[^>]+>/gi, '');
      },
      connectionError(response) {
        var txt = this.stripTags(response);
        return `Can't connect to «${this.server()}»\n${txt}`
      },
      fetchOptions() {
        var out = {
          method: 'put',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken(),
            'Connection': 'Keep-Alive',
            'Keep-Alive': 'timeout=60',
          }
        }
        return out
      },

      fetch (what, params) {
        var options = this.fetchOptions()
        var query = null
        switch (what) {
        case 'auth':
          options.headers['Authorization'] = params
          break;
        case 'check':
          break;
        case 'close':
          options.headers['Authorization'] = 'Close ' + this.getToken();
          break;
        default:
          query = this.prepare(what, params)
          options.body = JSON.stringify(query)
          break;
        }

        this.setLoading(true)
        return fetch(this.server(), options).then(response => response.text(), reponse =>{
          return this.connectionError(reponse)
        }).then(
          response => {
            this.setLoading(false)
            return this.processResponse(what, query, response)
          }
        )
      },
      processResponse (what, query, response) {
        // console.log(response)
        var answer = {}
        try {
          answer = JSON.parse(response)
        } catch (e) {
          answer.status = 'error'
          answer.data = this.connectionError(response)

        }
        if (answer.status === 'error') {
          this.setError(answer.data, query)
        }
        if (answer.status === 'fail' && what !='check' && what !='auth') {
          return this.check()
        }

        // if (answer.test) 0(answer.test)
        switch (what) {
        case 'raw':
        case 'check':
        case 'auth':
        case 'close':
          return answer
        default:
          return answer.data
        }
      },
      escapeAndQuote (val, isnull) {
        if (val === null) return isnull ? 'NULL' : "''"
        val = val.toString().trim()
        val = val.replace(/\\/g, '\\\\')
        val = val.replace(/'/g, "\\'")
        return `'${val}'`
      },
      /* methods for authorization and authentication */
      establish (credentials, clear) {
        clear = false
        if (clear) { // clearing is optional for future (case of «inline» log-in)
          this.clearLocalStorage()
        }
        var auth = 'Basic ' + credentials
        return this.fetch('auth', auth).then(data => {
          if (data.status === 'success') {
            this.setToken(data.token, data.expire)
            this.setStatus(true, true)
            return true
          }
          return data.data
        })
      },
      check () {
        return this.fetch('check').then(data => {
          this.setStatus(data.status === 'success', true)
          return (data.status === 'success')
        })
      },
      close () {
        this.fetch('close')
        this.clearLocalStorage()
        this.clearToken()
        this.setStatus (false, false)
      },
      /* data-specific fetches */
      fetchFields (database, table, reload) {
        var state = options.store.state
        if (!reload && state.fields[table] && state.fields[table].length > 0) {
          var saved = Object.assign([], state.fields[table])
          return new Promise(resolve => { resolve(saved) })
        }
        return this.fetch('fields', {database, table}).then(fields => {
          return this.setFields( table, fields)
        })
      },
      /* methods for external communication */
      commit (what, data) { options.store.commit(what, data) },
      dispatch (what, data) { options.store.dispatch(what, data) },
      route () { return options.router.app._route ? options.router.app._route : null },
      database() { return this.route().params.database ? this.route().params.database : null },
      /* token */
      getToken() {
        return Vue.prototype.$cookies.getItem('token')
      },
      setToken(token, expireSeconds) {
        var expire = (new Date(expireSeconds * 1e3 + Date.now())).toUTCString();
        Vue.prototype.$cookies.setItem('token', token, expire)
      },
      clearToken() {
        Vue.prototype.$cookies.removeItem('token')
      },
      /* commits and dispatches to Vuex */
      setError (message, query) {
        this.commit('error', {message, query})
      },
      setStatus (connected, checked) {
        this.commit('connected', connected)
        this.commit('checked', checked)
      },
      setLoading (loading) {
        if (loading) {
          this.dispatch('startLoading')
        } else {
          this.dispatch('endLoading')
        }
      },
      setFields(table, fields) {
        this.commit('fields', { table, fields })
        return fields
      }
    }
}}