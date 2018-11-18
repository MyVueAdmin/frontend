<template>
  <div>
    <LinkBase
      v-for = "(item, index) in items"
      v-bind:key="index"
      v-bind:active="getActive(item.value)"
      class = "switch-item"
      @click = "setCurrent(item.value)"
      v-html = "item.label"
    />
  </div>
</template>

<script>
export default {
  name: 'InputSwitch',
  props: {
    items: {type: Array, required: true},
    current: {type: String, required: true},
  },
  methods: {
    setCurrent (value) { this.$emit('input', value) },
    getActive (value) { return this.current === value }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/vars.scss";
div {
  overflow:hidden;
}
div a {
  display:block;
  float:left;
  margin-right:1px;
  padding:0 5px;
}

</style>


