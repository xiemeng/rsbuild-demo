import request from '@/utils/request'

const batchFriendApi = {
  getList: '/channel/batchAddFriends/getList', // 批量加好友列表
  downloadTemp: '/channel/batchAddFriends/downloadTemp', // 导入模板-模板下载
  importCustomer: '/channel/batchAddFriends/importCustomer', // 导入模板
  deleteCustomer: '/channel/batchAddFriends/delete', // 删除客户
  record: '/channel/import/record', // 导入记录列表
  statistics: '/channel/import/statistics', // 统计
  deleteImport: '/channel/import/delete', // 删除导入记录
  remind: '/channel/batchAddFriends/remind', // 批量加好友后提醒功能
  getInfo: '/channel/import/info', // 导入记录详情
  setting: '/channel/batchAddFriends/setting', //批量加好友潜在客户设置
  settingInfo: '/channel/batchAddFriends/settingInfo', //批量加好友潜在客户设置详情
  batchDistribute: '/channel/batchAddFriends/batchDistribute', //批量分配
  exportData: '/channel/import/export', //导出客户数据
}

export function batchDistribute(parameter) {
  return request({
    url: batchFriendApi.batchDistribute,
    method: 'post',
    data: parameter,
  })
}

export function setting(parameter) {
  return request({
    url: batchFriendApi.setting,
    method: 'post',
    data: parameter,
  })
}

export function settingInfo(parameter) {
  return request({
    url: batchFriendApi.settingInfo,
    method: 'get',
    params: parameter,
  })
}

export function getInfo(parameter) {
  return request({
    url: batchFriendApi.getInfo,
    method: 'get',
    params: parameter,
  })
}

export function remind(parameter) {
  return request({
    url: batchFriendApi.remind,
    method: 'post',
    params: parameter,
  })
}

export function getList(parameter) {
  return request({
    url: batchFriendApi.getList,
    method: 'get',
    params: parameter,
  })
}

export function importCustomer(parameter) {
  return request({
    url: batchFriendApi.importCustomer,
    method: 'post',
    data: parameter,
  })
}

export function deleteCustomer(parameter) {
  return request({
    url: batchFriendApi.deleteCustomer,
    method: 'post',
    data: parameter,
  })
}

export function record(parameter) {
  return request({
    url: batchFriendApi.record,
    method: 'get',
    params: parameter,
  })
}

export function statistics(parameter) {
  return request({
    url: batchFriendApi.statistics,
    method: 'get',
    params: parameter,
  })
}

export function deleteImport(parameter) {
  return request({
    url: batchFriendApi.deleteImport,
    method: 'post',
    params: parameter,
  })
}

export function exportData(parameter) {
  return request({
    url: batchFriendApi.exportData,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function downloadTemp() {
  window.open(PRD_VUE_APP_API_BASE_URL + batchFriendApi.downloadTemp, '_blank')
}