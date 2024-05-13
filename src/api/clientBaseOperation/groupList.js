import request from '@/utils/request'

const groupApi = {
  queryGroupPageByGroupSop: '/client_group/customerGroup/queryGroupPageByGroupSop', // 群聊列表
  getCustGrpOwner: '/client_group/customerGroup/getCustGrpOwner', // 群主下拉框
  queryGroupTag: '/client_group/groupTagController/queryGroupTag', // 查询群标签
  getCustGrpList: '/client_group/customerGroup/getCustGrpList', // 查询群列表
  syncCustomerGroup: '/client_group/customerGroup/syncCustomerGroup', // 同步客户组列表
  batchGroupTagging: '/client_group/customerGroup/batchGroupTagging', // 批量打标签
  getCustGrpListExport: '/client_group/customerGroup/getCustGrpListExport', // 导出Excel

  customerGroupDetail: '/client_group/customerGroup/detail', // 查询群详情
  syncCustomerGroupByChatId: '/client_group/customerGroup/syncCustomerGroupByChatId', // 同步
  updateNotice: '/client_group/customerGroup/updateNotice', // 更新公告
  dailyStatistics: '/client_group/customerGroup/dailyStatistics', // 根据日期统计
  dailyStatisticsExport: '/client_group/customerGroup/dailyStatisticsExport', // 根据日期统计导出
  memberList: '/client_group/customerGroup/memberList', // 根据成员统计
  memberListExport: '/client_group/customerGroup/memberListExport', // 根据成员统计导出

  batchCustomerTagging: '/client_group/customerGroup/batchCustomerTagging', //给群客户打标签
}


export function getCustGrpListExport(parameter) {
  return request({
    url: groupApi.getCustGrpListExport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function batchCustomerTagging(parameter) {
  return request({
    url: groupApi.batchCustomerTagging,
    method: 'post',
    data: parameter,
  })
}

export function queryGroupPageByGroupSop(parameter) {
  return request({
    url: groupApi.queryGroupPageByGroupSop,
    method: 'get',
    params: parameter,
  })
}

export function getCustGrpOwner(parameter) {
  return request({
    url: groupApi.getCustGrpOwner,
    method: 'post',
    data: parameter,
  })
}

export function queryGroupTag(parameter) {
  return request({
    url: groupApi.queryGroupTag,
    method: 'post',
    data: parameter,
  })
}

export function getCustGrpList(parameter) {
  return request({
    url: groupApi.getCustGrpList,
    method: 'post',
    data: parameter,
  })
}

export function syncCustomerGroup(parameter) {
  return request({
    url: groupApi.syncCustomerGroup,
    method: 'post',
    data: parameter,
  })
}

export function batchGroupTagging(parameter) {
  return request({
    url: groupApi.batchGroupTagging,
    method: 'post',
    data: parameter,
  })
}

export function customerGroupDetail(parameter) {
  return request({
    url: groupApi.customerGroupDetail,
    method: 'get',
    params: parameter,
  })
}

export function syncCustomerGroupByChatId(parameter) {
  return request({
    url: groupApi.syncCustomerGroupByChatId,
    method: 'post',
    data: parameter,
  })
}

export function updateNotice(parameter) {
  return request({
    url: groupApi.updateNotice,
    method: 'post',
    data: parameter,
  })
}

export function dailyStatistics(parameter) {
  return request({
    url: groupApi.dailyStatistics,
    method: 'post',
    data: parameter,
  })
}

export function memberList(parameter) {
  return request({
    url: groupApi.memberList,
    method: 'get',
    params: parameter,
  })
}

export function memberListExport(parameter) {
  return request({
    url: groupApi.memberListExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

export function dailyStatisticsExport(parameter) {
  return request({
    url: groupApi.dailyStatisticsExport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}