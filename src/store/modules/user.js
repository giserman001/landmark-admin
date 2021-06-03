import { login, smslogin, getPhone, updatePass, smsupdatePass, versmscode } from '@/api/user'
import { get, set, remove } from '@/utils/storage'
import { resetRouter } from '@/router'
const tokenKey = process.env.VUE_APP_STORAGE_TOKEN // token
const userinfoKey = process.env.VUE_APP_STORAGE_USERINFO // userinfo

const getDefaultState = () => {
  return {
    token: get(tokenKey) || '',
    userinfo: JSON.parse(get(userinfoKey)) || {},
    userPhone: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_USERPHONE: (state, data) => {
    state.userPhone = data
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  }
}

const actions = {
  // 验证码登陆
  smslogin({ commit }, userInfo) {
    const { account, code } = userInfo
    return new Promise((resolve, reject) => {
      smslogin({ account: account.trim(), code }).then(response => {
        const { data: { info: { info: userinfo, token }}} = response
        commit('SET_TOKEN', token)
        commit('SET_USERINFO', userinfo)
        set(tokenKey, token)
        set(userinfoKey, JSON.stringify(userinfo))
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 账号密码登陆
  loginFn({ commit }, userInfo) {
    const { account, pass } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), pass }).then(response => {
        const { data: { info: { info: userinfo, token }}} = response
        commit('SET_TOKEN', token)
        commit('SET_USERINFO', userinfo)
        set(tokenKey, token)
        set(userinfoKey, JSON.stringify(userinfo))
        resolve(response)
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
  },
  // 修改密码
  updatePassFn(_, params = {}) {
    return new Promise(async(resolve, reject) => {
      const res = await updatePass(params)
      if (res.code === 200) {
        res && resolve(res)
      }
    })
  },
  // 获取用户手机号
  getPhoneFn({ commit }) {
    return new Promise(async(resolve, reject) => {
      const { code, data } = await getPhone()
      if (code === 200) {
        commit('SET_USERPHONE', data.phone)
        resolve()
      }
    })
  },
  // 忘记密码修改密码
  smsupdatePassFn(_, params = {}) {
    return new Promise(async(resolve, reject) => {
      const res = await smsupdatePass(params)
      if (res.code === 200) {
        res && resolve(res)
      }
    })
  },
  // 忘记密码-校验验证码
  versmscodeFn(_, params = {}) {
    return new Promise(async(resolve, reject) => {
      const res = await versmscode(params)
      if (res.code === 200) {
        res && resolve(res)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

