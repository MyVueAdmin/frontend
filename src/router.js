import Vue from 'vue'
import Router from 'vue-router'

import Tables from './pages/Tables'
import ParametersEdit from './pages/ParametersEdit'
import Content from './pages/Content'
import ContentEdit from './pages/ContentEdit'
import Structure from './pages/Structure'
import StructureEdit from './pages/StructureEdit'
import Subroute from './components/Subroute'

var routes =
  [
    {
      group: 'host',
      name: 'host-content',
      path: '/',
      component: Tables,
      icon: 'server',
    }, {
      group: 'database',
      path: '/:database',
      component: Subroute,
      children: [
        { name: 'database-content', path: '', component: Tables, icon: 'database' },
        { name: 'database-content-add', path: 'add', component: ParametersEdit, icon:'folder-plus' },
      ]
    }, {
      path: '/:database/:table/structure',
      component: Subroute,
      children: [
        { name: 'table-structure', path: '', component: Structure, icon:'sitemap' },
        { name: 'table-structure-add', path: 'add', component: StructureEdit, icon: 'plus' },
        { name: 'table-structure-edit', path: 'edit/:entity', component: StructureEdit },
        { name: 'table-structure-copy', path: 'copy/:entity', component: StructureEdit, props: { copy: true } },
      ]
    }, {
      path: '/:database/:table/content',
      component: Subroute,
      children: [
        { name: 'table-content', path: '', component: Content, icon: 'folder' },
        { name: 'table-content-add', path: 'add', component: ContentEdit, icon:'plus' },
        { name: 'table-content-edit', path: 'edit/:entity', component: ContentEdit },
        { name: 'table-content-copy', path: 'copy/:entity', component: ContentEdit, props: { copy: true } },
        { name: 'table-query-edit', path: 'edit/:entity', component: ContentEdit },
      ]
    }, {
      name: 'table-query',
      path: '/:database/:table/query',
      component: Content,
      props: { codeEditor: true },
      icon: 'terminal'
    }, {
      name: 'table-parameters',
      path: '/:database/:table/parameters',
      component: ParametersEdit,
      icon: 'wrench'
    }
  ]

routes.forEach(base => {
  if (!base.group) {
    base.group = 'table'
  }
})

Vue.use(Router)
export default new Router({routes})