<template>
  <div />
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$router.replace(this.$store.state.permission.addRoutes[0].path)
  }
}
</script>

<style>

</style>
