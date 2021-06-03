import request from '@/utils/request'

// 发送验证码
export const sendsmsCode = data => {
  return request.post('/agentapi/agent/sendsmsCode', data)
}

// 账号密码登录
export const login = data => {
  return request.post('/agentapi/agent/login', data)
}

// 验证码登录 /agentapi/agent/getPhone
export const smslogin = data => {
  return request.post('/agentapi/agent/smslogin', data)
}

// 获取当前用户手机号
export const getPhone = () => {
  return request.get('/agentapi/agent/getPhone')
}

// 登录态下更改密码
export const updatePass = (data) => {
  return request.post('/agentapi/agent/updatePass', data)
}

// 忘记密码修改密码
export const smsupdatePass = (data) => {
  return request.post('/agentapi/agent/smsupdatePass', data)
}

// 忘记密码-校验验证码
export const versmscode = (data) => {
  return request.post('/agentapi/agent/versmscode', data)
}
