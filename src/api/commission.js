import request from '@/utils/request'

// 佣金列表
export function getCommissionList(params) {
  return request({ url: '/agentapi/agent/getCommissionList', method: 'get', params })
}

// 刷新佣金
export function freshCommission() {
  return request({ url: '/agentapi/agent/freshCommission', method: 'get' })
}

// 渠道商佣金结算列表
export function settleAgencyList() {
  return request({ url: '/agentapi/agent/settleAgencyList', method: 'get' })
}
