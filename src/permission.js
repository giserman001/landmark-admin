import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { get } from '@/utils/storage' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
const tokenKey = process.env.VUE_APP_STORAGE_TOKEN // token
const authKey = process.env.VUE_APP_STORAGE_AUTH // auth

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/findpass'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // 设置页面title
  document.title = getPageTitle(to.meta.title)
  // 在路由全局钩子beforeEach中，根据keepAlive属性，统一设置页面的缓存性
  if (to.meta.keepAlive) {
    store.commit('keepAlive/addkeepAlive', to.name)
  } else {
    store.commit('keepAlive/removeKeepAlive', to.name)
  }
  // 确定用户是否已经登录
  const hasToken = get(tokenKey)
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/projectInformation/list' })
      NProgress.done()
    } else {
      const authStr = get(authKey)
      let auth = []
      if (authStr) {
        auth = JSON.parse(authStr)
      }
      if (store.state.permission.addRoutes.length) {
        next()
      } else {
        try {
          const accessRoutes = await store.dispatch('permission/generateRoutes', auth)
          // console.log(accessRoutes, 'accessRoutes')
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 这里最佳优化：可以再次请求一个用户信息接口 请求成功留在当前页，请求失败跳登录页
          await store.dispatch('user/resetToken')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接登录
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
