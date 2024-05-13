import request from '@/utils/request'

const groupApi = {
  listControl: '/client_group/quanlity/control/list', // 分页查询
  switchControl: '/client_group/quanlity/control/switch', // 切换开关
  deleteControl: '/client_group/quanlity/control/delete', // 删除
  addControl: '/client_group/quanlity/control/save', // 新增
  infoControl: '/client_group/quanlity/control/info', // 详情
  updateControl: '/client_group/quanlity/control/update', // 修改
  statistic: '/client_group/quanlity/control/statistic', // 数据总览
  exportGrpInfo: '/client_group/quanlity/control/exportGrpInfo', // 导出群聊详情数据
  updateGroupInRule: '/client_group/customerGroup/updateGroupInRule', // 更新群所在的质检规则
  getRelationRuleDetail: '/client_group/customerGroup/getRelationRuleDetail', // 查询群所在的质检规则
  getgrpInfo: '/client_group/quanlity/control/grpInfo', // 回复数据详情
}

export function getgrpInfo(parameter) {
  return request({
    url: groupApi.getgrpInfo,
    method: 'get',
    params: parameter
  })
}

export function getRelationRuleDetail(parameter) {
  return request({
    url: groupApi.getRelationRuleDetail,
    method: 'get',
    params: parameter
  })
}

export function updateGroupInRule(parameter) {
  return request({
    url: groupApi.updateGroupInRule,
    method: 'post',
    data: parameter,
  })
}

export function listControl(parameter) {
  return request({
    url: groupApi.listControl,
    method: 'post',
    data: parameter,
  })
}

export function switchControl(restfor) {
  return request({
    url: groupApi.switchControl + restfor,
    method: 'get',
  })
}

export function deleteControl(parameter) {
  return request({
    url: groupApi.deleteControl,
    method: 'post',
    data: parameter
  })
}

export function addControl(parameter) {
  return request({
    url: groupApi.addControl,
    method: 'post',
    data: parameter
  })
}

export function infoControl(restfor) {
  return request({
    url: groupApi.infoControl + '/' + restfor,
    method: 'get',
  })
}

export function updateControl(parameter) {
  return request({
    url: groupApi.updateControl,
    method: 'post',
    data: parameter
  })
}

export function statistic(parameter) {
  return request({
    url: groupApi.statistic,
    method: 'get',
    params: parameter
  })
}

export function exportGrpInfo(parameter) {
  return request({
    url: groupApi.exportGrpInfo,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}