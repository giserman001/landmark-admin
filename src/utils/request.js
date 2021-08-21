import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { get } from '@/utils/storage'

const tokenKey = process.env.VUE_APP_STORAGE_TOKEN
// 不需要加密的接口
// const specialApi = []

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 接口地址前缀
  timeout: 10000 // 请求超时
})
let loading // 全局loading实例
// 请求拦截
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers[tokenKey] = get(tokenKey)
  }
  loading = Loading.service({
    lock: true,
    text: '数据加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.2)'
  })
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
  const { status, statusText } = response
  if (status === 200) {
    if (response.data.code === 1000) {
      loading.close()
      MessageBox.confirm('您已经登出，您可以取消以继续停留在此页面，或重新登录', '确认注销', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        location.href = '/'// 登录页
      })
    } else if (response.data.code !== 0) {
      loading.close()
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 3 * 1000
      })
    }
    loading.close()
    return response.data
  }
  loading.close()
  Message({
    message: statusText,
    type: 'error',
    duration: 3 * 1000
  })
  const err = `requestURL: ${response.request.responseURL}  status: ${status}  msg: ${statusText}`
  return Promise.reject(err)
}, error => {
  loading.close()
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
})
export default service
