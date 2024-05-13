import request from '@/utils/request'

const costomApi = {
  getCustomerStaffList: '/client_manager/client/getCustomerStaffList', // 获取员工列表
  getCustomerDetail: '/client_manager/client/getCustomerDetail', // 获取客户详情
  getCustomerTagList: '/client_manager/client/getCustomerTagList', // 查询客户的企业标签
  setCustomerTag: '/client_manager/client/setCustomerTag', // 设置客户的企业标签
  personalTagList: '/client_manager/personalTag/list', // 个人标签列表
  personalTagSave: '/client_manager/personalTag/save', // 新增个人标签
  personalTagDelete: '/client_manager/personalTag/delete', // 删除个人标签
  getPersonalTagList: '/client_manager/personalTag/getPersonalTagList', // 查询客户的个人标签
  setPersonalTag: '/client_manager/personalTag/setPersonalTag', // 设置客户的个人标签
  showInfo: '/client_manager/fieldCustomRule/showInfo', // 查询需要显示的字段
  getFieldCustomList: '/client_manager/fieldCustomRule/getFieldCustomList', // 查询客户的自定义数据
  updateFieldBase: '/client_manager/client/updateFieldBase', // 修改基本信息
  updateFieldCustom: '/client_manager/fieldCustomRule/updateFieldCustom', // 修改自定义信息
  getStageList: '/client_transformation/customerstage/getStageList', // 查询客户阶段列表
  customerEventList: '/client_manager/customerEvent/list', // 查询客户动态
  getTypeList: '/client_manager/customerEvent/getTypeList', // 查询动态类型
  getCustomerGroup: '/client_manager/client/getCustomerGroup', // 查询群聊列表
}
export function getCustomerStaffList(parameter) {
  return request({
    url: costomApi.getCustomerStaffList,
    method: 'get',
    params: parameter,
  })
}
export function getCustomerDetail(parameter) {
  return request({
    url: costomApi.getCustomerDetail,
    method: 'get',
    params: parameter,
  })
}
export function getCustomerTagList(parameter) {
  return request({
    url: costomApi.getCustomerTagList,
    method: 'get',
    params: parameter,
  })
}
export function setCustomerTag(parameter) {
  return request({
    url: costomApi.setCustomerTag,
    method: 'post',
    data: parameter,
  })
}
export function personalTagList(parameter) {
  return request({
    url: costomApi.personalTagList,
    method: 'get',
    params: parameter,
  })
}
export function personalTagSave(parameter) {
  return request({
    url: costomApi.personalTagSave,
    method: 'post',
    data: parameter,
  })
}
export function personalTagDelete(parameter) {
  return request({
    url: costomApi.personalTagDelete,
    method: 'post',
    data: parameter,
  })
}
export function getPersonalTagList(parameter) {
  return request({
    url: costomApi.getPersonalTagList,
    method: 'get',
    params: parameter,
  })
}
export function setPersonalTag(parameter) {
  return request({
    url: costomApi.setPersonalTag,
    method: 'post',
    data: parameter,
  })
}
export function showInfo(parameter) {
  return request({
    url: costomApi.showInfo,
    method: 'get',
    params: parameter,
  })
}
export function getFieldCustomList(parameter) {
  return request({
    url: costomApi.getFieldCustomList,
    method: 'get',
    params: parameter,
  })
}
export function updateFieldBase(parameter) {
  return request({
    url: costomApi.updateFieldBase,
    method: 'post',
    data: parameter,
  })
}
export function updateFieldCustom(parameter) {
  return request({
    url: costomApi.updateFieldCustom,
    method: 'post',
    data: parameter,
  })
}
export function getStageList(parameter) {
  return request({
    url: costomApi.getStageList,
    method: 'get',
    params: parameter,
  })
}
export function customerEventList(parameter) {
  return request({
    url: costomApi.customerEventList,
    method: 'post',
    data: parameter,
  })
}
export function getTypeList(parameter) {
  return request({
    url: costomApi.getTypeList,
    method: 'get',
    params: parameter,
  })
}
export function getCustomerGroup(parameter) {
  return request({
    url: costomApi.getCustomerGroup,
    method: 'get',
    params: parameter,
  })
}