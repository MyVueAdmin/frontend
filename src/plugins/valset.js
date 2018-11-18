export default {
  install (Vue) {
    Vue.prototype.$valset = {
      parse (str) {
        str = str.substr(1, str.length - 2)
        str = str.replace(/''/g,"/'");
        var arr = str.split("','")
        return arr.map(item => item.replace(/\/'/g,"'"))
      },
      prepare: value => value.replace(/'/g,"''"),
      doquotes: value => value.replace(/'/g,"''")
}}}
