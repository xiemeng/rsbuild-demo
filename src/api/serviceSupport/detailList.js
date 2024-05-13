import request from '@/utils/request'

const cusTomapi = {
  getAvailableReceptorList: '/custservice/customerserviceservicer/getAvailableReceptorList', //获取接待员列表
  queuePage: '/custservice/queue/page', //客服排队列表-分页查询
  statePage: '/custservice/state/page', //客服会话列表-分页查询
  visitPage: '/custservice/visit/page', //客服访问记录列表-分页查询

  leavePage: '/custservice/leave/page', // 留言-分页查询
  accountStatistics: '/custservice/account/accountStatistics', // 微信接待客服链接
}

export function getAvailableReceptorList(parameter) {
  return request({
    url: cusTomapi.getAvailableReceptorList,
    method: 'post',
    data: parameter,
  })
}

export function queuePage(parameter) {
  return request({
    url: cusTomapi.queuePage,
    method: 'post',
    data: parameter,
  })
}

export function statePage(parameter) {
  return request({
    url: cusTomapi.statePage,
    method: 'post',
    data: parameter,
  })
}

export function visitPage(parameter) {
  return request({
    url: cusTomapi.visitPage,
    method: 'post',
    data: parameter,
  })
}
export function leavePage(parameter) {
  return request({
    url: cusTomapi.leavePage,
    method: 'post',
    data: parameter,
  })
}
export function accountStatistics(parameter) {
  return request({
    url: cusTomapi.accountStatistics,
    method: 'post',
    data: parameter,
  })
}