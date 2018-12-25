<template>
  <ButtonsHolder position="bottom">
    <slot 
      slot="pagination" 
      name="pagination" />
    <LinkBase
      v-for = "item in actions"
      v-bind:key = "[item.name,item.label].join()"
      v-bind:to = "{name: item.name}"
      v-bind:icon = "item.icon"
      v-bind:label = "item.label"
      v-bind:button = "true"
    />
    <slot />
  </ButtonsHolder>
</template>

<script>
import ButtonsHolder from './ButtonsHolder'
export default {
  name: 'TheActions',
  components: { ButtonsHolder },
  computed: {
    actions() { return this.$store.state.navigation.actions }
  }
}
</script>
