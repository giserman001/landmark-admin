import { login } from '@/api/user'
import { get, set, remove } from '@/utils/storage'
import { resetRouter } from '@/router'
const tokenKey = process.env.VUE_APP_STORAGE_TOKEN // token
const userinfoKey = process.env.VUE_APP_STORAGE_USERINFO // userinfo
const authKey = process.env.VUE_APP_STORAGE_AUTH // auth 权限

const getDefaultState = () => {
  return {
    token: get(tokenKey) || '',
    userinfo: JSON.parse(get(userinfoKey)) || {},
    auth: JSON.parse(get(authKey)) || []
  }
}

const state = getDefaultState()

const mutations = {
  SET_AUTH: (state, data) => {
    state.auth = data
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  }
}

const actions = {
  // 账号密码登陆
  loginFn({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        commit('SET_TOKEN', res.date.token)
        commit('SET_USERINFO', res.date.user)
        commit('SET_AUTH', res.date.codes)
        set(tokenKey, res.date.token)
        set(userinfoKey, JSON.stringify(res.date.user))
        set(authKey, JSON.stringify(res.date.codes))
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出登录
  logout({ _, state }) {
    return new Promise((resolve, reject) => {
      remove(tokenKey) // must remove  token  first
      remove(userinfoKey)
      resetRouter()
      resolve()
    })
  },
  // 重置token
  resetToken() {
    return new Promise(resolve => {
      remove(tokenKey) // must remove  token  first
      remove(userinfoKey)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

