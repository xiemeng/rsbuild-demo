import request from '@/utils/request'

const costomApi = {
  getlist: '/client_transformation/customersend/list', // 客户群发列表
  addSave: '/client_transformation/customersend/save', // 新增客户群发
  infoDetails: '/client_transformation/customersend/info/', // 群发详情
  count: '/client_transformation/customersend/count', // 计算消息送达人数
  remind: '/client_transformation/customersend/remind', // 提醒
  staffInfo: '/client_transformation/customersend/info/staff', // 群发员工详情
  customerInfo: '/client_transformation/customersend/info/customer', // 群发客户详情
  cancel: '/client_transformation/customersend/cancel', // 取消群发任务
}

export function infoDetails(parameter, missionId) {
  return request({
    url: costomApi.infoDetails + missionId,
    method: 'get',
    params: parameter,
  })
}

export function getlist(parameter) {
  return request({
    url: costomApi.getlist,
    method: 'post',
    data: parameter,
  })
}

export function addSave(parameter) {
  return request({
    url: costomApi.addSave,
    method: 'post',
    data: parameter,
  })
}

export function count(parameter) {
  return request({
    url: costomApi.count,
    method: 'post',
    data: parameter,
  })
}

export function remind(parameter) {
  return request({
    url: costomApi.remind,
    method: 'post',
    data: parameter,
  })
}

export function staffInfo(restful = '', params) {
  return request({
    url: costomApi.staffInfo + '/' + restful + `?${params}`,
    method: 'get',
  })
}

export function customerInfo(restful = '', params) {
  return request({
    url: costomApi.customerInfo + '/' + restful + `?${params}`,
    method: 'get',
  })
}

export function cancel(parameter) {
  return request({
    url: costomApi.cancel,
    method: 'post',
    data: parameter,
  })
}