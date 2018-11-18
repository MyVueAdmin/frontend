<script>
export default {
  computed: {
    loading () { return this.$store.state.loading },
    database() { return this.$route.params.database },
    table () { return this.$route.params.table },
    action() { return this.$route.params.action ? this.$route.params.action : null },
    entity() {return this.$route.params.entity ? this.$route.params.entity : null },
  }
}
</script>
