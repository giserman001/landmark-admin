import request from '@/utils/request'

// 企业资料
export function agentInformation(params) {
  return request({ url: '/agentapi/agent/agentInformation', method: 'get', params })
}

// 修改个人/企业资料
export function modifyInfo(data) {
  return request.post('/agentapi/agent/modifyInfo', data)
}

// 管理员列表
export function operatorList(params) {
  return request.get('/agentapi/agent/operatorList', { params })
}

// 编辑管理员
export function editOperator(data) {
  return request.post('/agentapi/agent/editOperator', data)
}

// 添加管理员
export function addOperator(data) {
  return request.post('/agentapi/agent/addOperator', data)
}

// 启/禁用管理员状态
export function operatorStatus(data) {
  return request.post('/agentapi/agent/operatorStatus', data)
}

