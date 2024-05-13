import request from '@/utils/request'

const dataAnalysisApi = {
    getActivityList:'/marketing/fissiontask/list',
    getActiveAndFissionData: '/marketing/dataAnalysis/analysis',
    getCustomerData:'/marketing/dataAnalysis/customerDetail',
    getInvitationData: '/marketing/dataAnalysis/invitationDetail',
    getActiveInfo:'/marketing/fissiontask/info/',
}

// 获取活动信息
export function getActiveInfo(parameter) {
  return request({
    url: dataAnalysisApi.getActiveInfo + parameter,
    method: 'get',
  })
}

// 获取活动列表
export function getActivityList(parameter) {
  return request({
    url: dataAnalysisApi.getActivityList,
    method: 'post',
    data: parameter, // params
  })
}

// 获取活动实时数据，客户裂变数据
export function getActiveAndFissionData(parameter) {
  return request({
    url: dataAnalysisApi.getActiveAndFissionData,
    method: 'post',
    params: parameter,
  })
}

// 客户详情信息
export function getCustomerData(parameter) {
  return request({
    url: dataAnalysisApi.getCustomerData,
    method: 'post',
    data: parameter,
  })
}

// 邀请详情信息
export function getInvitationData(parameter) {
  return request({
    url: dataAnalysisApi.getInvitationData,
    method: 'post',
    params: parameter,
  })
}

