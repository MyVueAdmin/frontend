export default {
  install (Vue) {
    Vue.prototype.$storage = {
      available() {
        try {
          localStorage.setItem('probe', 1)
          return true
        } catch(e) {
          return false
        }
      },
      getItem (key) {
        return localStorage.getItem(key)
      },
      setItem (key, value) {
        localStorage.setItem(key, value)
      },
      removeItem (key) {
        localStorage.removeItem(key)
      },
      hasItem (key) {
        return localStorage.getItem(key) !== null
      },
      clear () {
        localStorage.clear()
      },
      keys() {
        var keys = []
        var methods = ["getItem", "setItem", "removeItem", "clear", "length"]
        for (var i in localStorage) {
          if (methods.indexOf(i) < 0) {
            keys.push(i)
          }
        }
        return keys
      }
}}}
