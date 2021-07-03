import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/transfer',
    component: () => import('@/views/transfer'),
    hidden: true
  },
  {
    path: '/',
    hidden: true,
    redirect: '/login'
  },
  {
    path: '/projectInformation',
    component: Layout,
    redirect: '/projectInformation/list',
    meta: { title: '项目管理', icon: 'el-icon-document' },
    children: [{
      path: 'list',
      name: 'ProjectInformationList',
      component: () => import('@/views/projectInformation/index'),
      meta: { title: '项目信息', affix: true }
    }, {
      path: 'project-detail',
      name: 'ProjectDetail',
      hidden: true,
      component: () => import('@/views/projectInformation/projectDetail'),
      meta: { title: '项目详细信息', activeMenu: '/projectInformation/list' }
    }, {
      path: 'single-info',
      name: 'SingleInfo',
      hidden: true,
      component: () => import('@/views/projectInformation/singleInfo'),
      meta: { title: '单体建筑信息', activeMenu: '/projectInformation/list' }
    }, {
      path: 'single-detail',
      name: 'SingleDetail',
      hidden: true,
      component: () => import('@/views/projectInformation/singleDetail'),
      meta: { title: '单体子项详情信息', activeMenu: '/projectInformation/list' }
    }, {
      path: 'staff',
      name: 'Staff',
      hidden: true,
      component: () => import('@/views/projectInformation/staff'),
      meta: { title: '职工信息', activeMenu: '/projectInformation/list' }
    }]
  }
  // 404 page must be placed at the end !!!

]
export const asyncRoutes = [
  {
    path: '/workReport',
    component: Layout,
    name: 'WorkReport',
    redirect: '/workReport/day',
    alwaysShow: true,
    meta: { title: '工作汇报', icon: 'el-icon-edit-outline' },
    children: [{
      path: 'day',
      name: 'Day',
      component: () => import('@/views/workReport/day'),
      meta: { title: '日报', code: '0201' }
    }, {
      path: 'week',
      name: 'Week',
      component: () => import('@/views/workReport/week'),
      meta: { title: '周报', code: '0202' }
    }, {
      path: 'addWeek',
      name: 'AddWeek',
      hidden: true,
      component: () => import('@/views/workReport/addWeek'),
      meta: { title: '新增周报', activeMenu: '/workReport/week' }
    }, {
      path: 'mouth',
      name: 'Mouth',
      component: () => import('@/views/workReport/mouth'),
      meta: { title: '月报', code: '0203' }
    }, {
      path: 'quarter',
      name: 'Quarter',
      component: () => import('@/views/workReport/quarter'),
      meta: { title: '季报', code: '0204' }
    }, {
      path: 'year',
      name: 'Year',
      component: () => import('@/views/workReport/year'),
      meta: { title: '年报', code: '0205' }
    }]
  },
  {
    path: '/account',
    component: Layout,
    name: 'Account',
    redirect: '/account/user',
    alwaysShow: true,
    meta: { title: '管理员', icon: 'el-icon-s-custom' },
    children: [{
      path: 'user',
      name: 'User',
      component: () => import('@/views/account/user'),
      meta: { title: '用户', code: '0302' }
    }, {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/account/role'),
      meta: { title: '角色', code: '0301' }
    }]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
