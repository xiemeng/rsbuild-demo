import request from '@/utils/request'

const cusTomapi = {
  billcommodity: '/custservice/billcommodity/list', //订单商品表详情
  billtransaction: '/custservice/billtransaction/list', //订单事务表列表
  billrefund: '/custservice/billrefund/info', //订单退款单据详情信息
  syncAll: '/custservice/billtransaction/syncAll', //同步所有对外收款记录
}

export function billcommodity(parameter) {
  return request({
    url: cusTomapi.billcommodity,
    method: 'get',
    params: parameter,
  })
}
export function billtransaction(parameter) {
  return request({
    url: cusTomapi.billtransaction,
    method: 'post',
    data: parameter,
  })
}
export function billrefund(parameter) {
  return request({
    url: cusTomapi.billrefund,
    method: 'get',
    params: parameter,
  })
}
export function syncAll(parameter) {
  return request({
    url: cusTomapi.syncAll,
    method: 'get',
    params: parameter,
  })
}
