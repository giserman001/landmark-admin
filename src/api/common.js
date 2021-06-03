import request from '@/utils/request'
// 新上传文件
export const uploadNewFile = data => {
  return request.post('/agentapi/common/uploadnewFile', data)
}

// 发送验证码
export const sendsmsCode = data => {
  return request.post('/agentapi/agent/sendsmsCode', data)
}

// 企业性质下拉列表
export const natureList = () => {
  return request.get('/agentapi/agent/natureList')
}

