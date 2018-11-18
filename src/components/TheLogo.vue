<template>
  <div id = "logo">
    <div v-if="!loading">
      <span>My</span>
      <span class="dark">Vue</span>
      <span>Admin</span>
    </div>
    <div
      v-else
      class="logo-loading">
      <span>My</span>
      <span class="dark">Vue</span>
      <span>Admin</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheLogo',
  computed: {
    loading () { return this.$store.state.loading },
  }
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";
#logo {
  font-weight: bold;
  margin:0 9px 0 7px;
  font-size:12pt;
  color: $color-ui-3;
}

#logo span.dark {color:$color-ui-4;}

.logo-loading span {
  animation: loading 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.logo-loading span.dark {
  animation: loading-dark 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.logo-loading span:nth-child(1) { animation-delay: 0.0s;}
.logo-loading span:nth-child(2) { animation-delay: 0.0s;}
.logo-loading span:nth-child(3) { animation-delay: 0.0s;}

@keyframes loading {
  0% { color: $color-ui-3; }
  50% { color: $color-act-mid; }
  100% { color: $color-ui-3; }

}

@keyframes loading-dark {
  0% { color: $color-ui-4; }
  50% { color:$color-act-mid; }
  100% { color: $color-ui-4; }

}

</style>
