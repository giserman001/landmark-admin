<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="keepAliveComponents">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapState('keepAlive', ['keepAliveComponents']),
    key() {
      return this.$route.path
    }
  },
  mounted() {
    if (process.env.VUE_APP_ENV !== 'production') {
      this.$notify({
        duration: 0,
        customClass: 'env-notify',
        position: 'bottom-right',
        dangerouslyUseHTMLString: true,
        message: `
        <p>当前环境： <span>${process.env.VUE_APP_ENV}</span><p>
        <p>接口地址： <span>${process.env.VUE_APP_BASE_API}</span><p>
      `
      })
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding: 70px 20px 20px 20px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
