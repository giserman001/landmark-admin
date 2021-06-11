<template>
  <div />
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log(this.$store.state.permission.addRoutes[0].path, 'this.$store.state.permission.addRoutes[0].path')
    this.$router.replace(this.$store.state.permission.addRoutes[0].path)
  }
}
</script>

<style>

</style>
