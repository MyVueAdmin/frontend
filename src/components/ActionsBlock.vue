<template>
  <div
    id="actions-holder"
    ref ="actions-holder">
    <div
      id="actions"
      ref ="actions"
      class="margin-background buttons-holder" >
      <slot name="pagination" />
      <div
        v-for = "item in actions"
        v-bind:key = "[item.name,item.label].join()"
      >
        <LinkBase
          v-bind:to = "{name: item.name}"
          v-bind:icon = "item.icon"
          v-bind:label = "item.label"
          v-bind:button = "true"
        />
      </div>
      <slot />

    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionsBlock',
  computed: {
    actions() { return this.$store.state.navigation.actions }
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      if (this.$refs['actions']) {
        var h = this.$refs['actions'].offsetHeight
        this.$refs['actions-holder'].style.height = h + 5 + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";

#actions-holder {
  display:block;
  height:100px;
}

#actions {
  bottom: 0;
  border:solid 0px $color-ui-main;
  border-width:3px 0 0 0;
}
</style>
