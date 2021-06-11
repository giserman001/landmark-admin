<template>
  <div v-if="!item.hidden && isRoot(item)" class="head-item">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <item :icon="item.meta.icon||(item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <template v-else>
      <el-submenu :index="item.path" popper-append-to-body>
        <template slot="title">
          <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
        </template>
        <head-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
import Item from './Item'
import AppLink from './Link'
import { isExternal } from '@/utils/validate'
import path from 'path'
export default {
  name: 'HeadItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // 临时设置(将在只有一个显示子元素时使用)
          this.onlyOneChild = item
          return true
        }
      })
      // 当只有一个子路由器时，默认显示该子路由器
      if (showingChildren.length === 1) {
        return true
      }
      // 如果没有子路由器显示，则显示parent
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    isRoot(item) {
      if (item.children && !item.children.length && this.isHidden(item.children)) {
        return false
      }
      return true
    },
    isHidden(child) {
      console.log(child.some((item) => !!item.hidden), 'child.some((item) => !!item.hidden)')
      return child.some((item) => !!item.hidden)
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep{
  .el-submenu__title i{
    color: inherit;
  }
}
</style>
