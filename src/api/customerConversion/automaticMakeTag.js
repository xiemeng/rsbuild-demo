import request from '@/utils/request'

const conversionApi = {
  autoTaggingQueryList: '/client_transformation/autoTagging/autoTaggingQueryList', // 规则列表查询
  openRule: '/client_transformation/autoTagging/openRule', // 开启关闭规则
  delRule: '/client_transformation/autoTagging/delRule', // 开启关闭规则
  createAutoTaggingKeyWord: '/client_transformation/autoTagging/createAutoTaggingKeyWord', // 关键字新增
  createAutoTaggingGrp: '/client_transformation/autoTagging/createAutoTaggingGrp', // 客户入群新增
  createAutoTaggingTime: '/client_transformation/autoTagging/createAutoTaggingTime', // 分时段新增
  ruleDetail: '/client_transformation/autoTagging/ruleDetail', // 自动打标签详情-基础信息
  statistics: '/client_transformation/autoTaggingStatistics/statistics', // 自动打标签统计接口
  customerList: '/client_transformation/autoTaggingStatistics/customerList', // 详情页面列表
  remindList: '/client_manager/customerdelremind/remindList', // 企业风控-删人提醒
}

export function autoTaggingQueryList(parameter) {
  return request({
    url: conversionApi.autoTaggingQueryList,
    method: 'post',
    data: parameter,
  })
}

export function openRule(parameter) {
  return request({
    url: conversionApi.openRule,
    method: 'post',
    data: parameter,
  })
}

export function delRule(parameter) {
  return request({
    url: conversionApi.delRule,
    method: 'post',
    data: parameter,
  })
}

export function createAutoTaggingKeyWord(parameter) {
  return request({
    url: conversionApi.createAutoTaggingKeyWord,
    method: 'post',
    data: parameter,
  })
}

export function createAutoTaggingGrp(parameter) {
  return request({
    url: conversionApi.createAutoTaggingGrp,
    method: 'post',
    data: parameter,
  })
}

export function createAutoTaggingTime(parameter) {
  return request({
    url: conversionApi.createAutoTaggingTime,
    method: 'post',
    data: parameter,
  })
}

export function ruleDetail(parameter) {
  return request({
    url: conversionApi.ruleDetail,
    method: 'post',
    data: parameter,
  })
}

export function statistics(parameter) {
  return request({
    url: conversionApi.statistics,
    method: 'post',
    data: parameter,
  })
}

export function customerList(parameter) {
  return request({
    url: conversionApi.customerList,
    method: 'post',
    data: parameter,
  })
}

export function remindList(parameter) {
  return request({
    url: conversionApi.remindList,
    method: 'post',
    data: parameter,
  })
}