<script>
export default {
  computed: {
    loading () { return this.$store.state.loading },
    database() { return this.$route.params.database },
    action() { return this.$route.params.action ? this.$route.params.action : null },
    entity() {return this.$route.params.entity ? this.$route.params.entity : null },
    table () { return this.$route.params.table ? this.$route.params.table : null },
    //table () { return this.$route.params.table},
  }
}
</script>
