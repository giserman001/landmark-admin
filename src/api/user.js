import request from '@/utils/request'

// 账号密码登录
export function login(params) {
  return request({ url: 'user/login', method: 'get', params })
}
