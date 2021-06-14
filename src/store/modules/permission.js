import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(auth, route) {
  if (route.meta && route.meta.code) {
    return auth.some(au => route.meta.code === au)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, auth) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(auth, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, auth)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SAVE: (state, payload) => {
    Object.keys(payload).forEach(e => {
      if (Object.prototype.toString.call(state[e]) === '[object Object]') {
        state[e] = {
          ...state[e],
          ...payload[e]
        }
      } else {
        state[e] = payload[e]
      }
    })
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, auth = []) {
    return new Promise(resolve => {
      if (!auth.length) return
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, auth)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
