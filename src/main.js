import Vue from 'vue'
import Vuex from 'vuex'
import connection from './plugins/connection.js'
import dict from './plugins/dict.js'
import cookies from './plugins/cookies.js'
import storage from './plugins/storage.js'
import valset from './plugins/valset.js'
import router from './router.js'
import store from './store'
import Root from './Root'
import LinkBase from './components/LinkBase'

// FontAwsome
import faIcon from './icons.js'

Vue.component('faIcon', faIcon)
Vue.component('LinkBase', LinkBase)

Vue.use(Vuex)
Vue.use(connection, {store: store, router: router})
Vue.use(dict, {store: store, router: router})
Vue.use(cookies)
Vue.use(storage)
Vue.use(valset)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ el: '#app',
          store,
          router,
          cookies,
          storage,
          connection,
          dict,
          valset,
          render: h => h(Root) })
