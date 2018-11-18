<template>
  <content>
    <transition name="pages">
      <router-view/>
    </transition>
  </content>
</template>

<script>
export default {
  name: 'TheContent',
  components: {},
  computed: {}
}
</script>

<style>
  .pages-leave { display:none; }
  .pages-leave-active { display:none; }
  .pages-leave-to{ display:none;  }

  .pages-enter { opacity: 0.5;}
  .pages-enter-active { transition: all 0.5s ease; }
  .pages-enter-to { opacity: 1; }
</style>
