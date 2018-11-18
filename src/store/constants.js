export default {
  namespaced: true,
  state: {
    langs: [
      {value: 'en', label: 'En'},
      {value: 'ru', label: 'Ru'},
    ],
    onpages: [
      {value: '30', label: '30'},
      {value: '50', label: '50'},
      {value: '75', label: '75'},
      {value: '100', label: '100'},
    ],
    sizeunits: [
      {
        bytes: 1,
        label: 'B'
      }, {
        bytes: 1024,
        label: 'KB'
      }, {
        bytes: 1024*1024,
        label: 'MB'
      }, {
        bytes: 1024*1024*1024,
        label: 'GB'
      }, {
        bytes: 1024*1024*1024*1024,
        label: 'TB'
      }
    ]
  }
}