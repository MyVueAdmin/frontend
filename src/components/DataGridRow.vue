<template>
  <tr>
    <th
      v-for="(button, index) in buttons"
      v-bind:key = "index"
      v-bind:title = "control"
      class="control" >
      <LinkBase
        v-bind:to = "button.to"
        v-bind:button = "true"
        v-bind:icon = "button.icon"
      />
    </th>
    <DataGridCol
      v-for = "(value, number) in data"
      v-bind:key = "number"
      v-bind:value = "value"
      v-bind:class = "{ordered: number === order}"
    />
  </tr>
</template>

<script>
import DataGridCol from './DataGridCol'
import Routes from '../mixins/Routes'
export default {
  name: 'DataGridRow',
  components: { DataGridCol },
  mixins: [ Routes ],
  props: {
    controls: { type: Array, default: () => [] },
    control: { type: [ String, Number ], default: '' },
    order: { type: String, default: '' },
    data: { type: [ Object, Array ], required: true }
  },
  computed: {
    buttons() {
      if (!this.control || !this.controls.length) return []
      return this.controls.map(mode => this.goTo(mode))
    }
  },
  methods: {
    goTo(mode) {
      switch (mode) {
      /* case 'database': return {name: 'host-content'} */
      case 'database': return {to: {name: 'database-content', params:{database: this.control}}, icon: mode}
      case 'table': return {to: {name: 'table-content', params:{table: this.control}}, icon: 'folder'}
      case 'edit': return {to: {name: this.$route.name + '-edit', params: {entity: this.control} }, icon: 'pen'}
      case 'copy': return {to: {name: this.$route.name + '-copy', params: {entity: this.control} }, icon: 'clone'}
      }
      return ''
    }
  }
}
</script>
