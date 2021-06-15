<template>
  <div :class="classObj" class="app-wrapper">
    <div class="head">
      <div class="head-item head-left">
        <img src="@/assets/logo1.png" alt="">
        <span>
          <router-link to="/projectInformation/list">文物建筑预防性保护项目检查评估工作平台</router-link>
        </span>
      </div>
      <div class="head-item head-middle">
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          background-color="#3a8ee6"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="head-menu"
        >
          <head-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path" />
        </el-menu>
      </div>
      <div class="head-item head-right">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <span class="user-name">{{ userinfo.username || '游客' }}</span>
            <i class="el-icon-arrow-down" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="tag-view-show">
      <tags-view />
    </div>
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, HeadItem, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    AppMain,
    HeadItem,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    userinfo() {
      return this.$store.state.user.userinfo
    },
    routes() {
      return this.$store.state.permission.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    logout() {
      window.localStorage.clear()
      // 清空导动态添加的路由数据
      this.$store.commit('permission/SAVE', {
        routes: [],
        addRoutes: []
      })
      // 清空导航栏数据
      this.$store.commit('tagsView/SAVE', {
        visitedViews: [],
        cachedViews: []
      })
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  // 自定义样式
  .head{
    display: flex;
    height: 65px;
    background-color: #3a8ee6;
    .head-left{
      flex: 1.5;
      padding-left: 40px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      img{
        display: inline-block;
        vertical-align: middle;
        width: 34px;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        margin-left: 10px;
        color: #fff;
        cursor: pointer;
      }
    }
    .head-middle{
      flex: 1.5;
      display: flex;
      justify-content: flex-end;
    }
    .head-right{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .avatar-container {
        margin-right: 40px;
        display: flex;
        align-items: center;
        .avatar-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #fff;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            font-size: 16px;
          }
          .user-name{
            margin: 0 8px;
          }
        }
      }
    }
  }
  .head-menu{
    display: flex;
  }
  .tag-view-show{
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
  ::v-deep{
    .el-menu--horizontal>.el-menu-item{
      height: 65px;
      line-height: 65px;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title{
      height: 65px;
      line-height: 65px;
    }
    .el-menu-item, .el-submenu__title{
      height: 65px;
      line-height: 65px;
    }
    .el-submenu__icon-arrow{
      position: static;
      color: #fff;
      margin-left: 2px;
      margin-top: 1px;
    }
  }
</style>
