import request from '@/utils/request'

// 客户列表
export function customerList(params) {
  return request({ url: '/agentapi/agent/customerList', method: 'get', params })
}

// 客户详情
export function customerDetail(params) {
  return request({ url: '/agentapi/agent/customerDetail', method: 'get', params })
}

// 查看客户费率
export function getRate(data) {
  return request({ url: '/agentapi/company/getRate', method: 'post', data })
}
