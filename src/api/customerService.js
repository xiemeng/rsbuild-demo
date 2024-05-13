import request from '@/utils/request'

const customerApi = {
  customerList: '/client_manager/client/getCustomerList', // 获取员工列表
  dictionaryByCode: '/client_manager/client/getDictionaryByCode', // 获取数据字典
  distinctNum: '/client_manager/client/getDistinctNum', // 获取排除重复客户后的值
  syncCustomerData: '/client_manager/client/syncCustomerData', // 初始化客户列表
  tagGroup: '/client_manager/CustomerTag/getTagGroup ', // 获取客户标签列表
  customerLoss: '/client_manager/customerLoss/page', //获取流失客户列表
  batchTagging: '/client_manager/CustomerTag/batchTagging', //批量打客户标签 弃用
  batchTaggingFront: '/client_manager/CustomerTag/batchTaggingFront', // 批量打标签新
  batchDelTagFront: '/client_manager/CustomerTag/batchDelTagFront', // 批量移除客户标签
  findByCustomerGroup: '/client_manager/client/findByCustomerGroup', // 所在群聊筛选
  findByCustomerEvent: '/client_manager/client/findByCustomerEvent', // 客户动态筛选
  findEventByCustomerWxid: '/client_manager/client/findEventByCustomerWxid', // 客户动态筛选-查看事件
  findByCustomField: '/client_manager/client/findByCustomField', // 自定义信息筛选
  exportDown: '/client_manager/customerLoss/export', //流失提醒导出
  getCustomerListExport: '/client_manager/client/getCustomerListExport', //查询客户列表导出
  findByCustomFieldExport: '/client_manager/client/findByCustomFieldExport', //自定义信息筛选导出
  customerScoreExport: '/client_manager/customerScore/customerScoreExport', //客户评分筛选导出
  customerScore: '/client_manager/customerScore/customerScore', //客户评分列表
  updateScore: '/client_manager/customerScore/updateScore', //（批量）修改评分
  historyList: '/client_manager/customerScore/list', //评分修改记录
  getTemplateList: '/client_manager/customerEvent/getTemplateList', //模板列表
  addTemplateEvent: '/client_manager/customerEvent/addTemplateEvent', //添加事件
  addTemplate: '/client_manager/customerEvent/addTemplate', //添加模板
  updateTemplate: '/client_manager/customerEvent/updateTemplate', //修改模板
  delTemplate: '/client_manager/customerEvent/delTemplate', //删除模板
  findByCustomIntegral: '/client_manager/customerIntegral/findByCustomIntegral', //客户积分筛选
  findByCustomIntegralExport: '/client_manager/customerIntegral/findByCustomIntegralExport', //客户积分筛选导出
  channelList: '/client_manager/customerIntegral/channelList', //积分类型列表
  integralList: '/client_manager/customerIntegral/integralList', //积分明细列表
}
export function findByCustomIntegralExport(parameter) {
  return request({
    url: customerApi.findByCustomIntegralExport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function findByCustomIntegral(parameter) {
  return request({
    url: customerApi.findByCustomIntegral,
    method: 'post',
    data: parameter,
  })
}

export function integralList(parameter) {
  return request({
    url: customerApi.integralList,
    method: 'post',
    data: parameter,
  })
}

export function channelList(parameter) {
  return request({
    url: customerApi.channelList,
    method: 'get',
    params: parameter,
  })
}

export function delTemplate(parameter) {
  return request({
    url: customerApi.delTemplate,
    method: 'get',
    params: parameter,
  })
}

export function updateTemplate(parameter) {
  return request({
    url: customerApi.updateTemplate,
    method: 'get',
    params: parameter,
  })
}

export function addTemplate(parameter) {
  return request({
    url: customerApi.addTemplate,
    method: 'get',
    params: parameter,
  })
}

export function addTemplateEvent(parameter) {
  return request({
    url: customerApi.addTemplateEvent,
    method: 'get',
    params: parameter,
  })
}

export function getTemplateList(parameter) {
  return request({
    url: customerApi.getTemplateList,
    method: 'get',
    params: parameter,
  })
}

export function historyList(parameter) {
  return request({
    url: customerApi.historyList,
    method: 'get',
    params: parameter,
  })
}

export function updateScore(parameter) {
  return request({
    url: customerApi.updateScore,
    method: 'post',
    data: parameter,
  })
}

export function customerScore(parameter) {
  return request({
    url: customerApi.customerScore,
    method: 'post',
    data: parameter,
  })
}

export function customerScoreExport(parameter) {
  return request({
    url: customerApi.customerScoreExport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function findByCustomFieldExport(parameter) {
  return request({
    url: customerApi.findByCustomFieldExport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function getCustomerListExport(parameter) {
  return request({
    url: customerApi.getCustomerListExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

export function exportDown(parameter) {
  return request({
    url: customerApi.exportDown,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function customerList(parameter) {
  return request({
    url: customerApi.customerList,
    method: 'get',
    params: parameter,
  })
}

export function dictionaryByCode(parameter) {
  return request({
    url: customerApi.dictionaryByCode,
    method: 'get',
    params: parameter,
  })
}

export function distinctNum(params) {
  return request({
    url: customerApi.distinctNum,
    method: 'get',
    params: params
  })
}

export function syncCustomerData() {
  return request({
    url: customerApi.syncCustomerData,
    method: 'get',
  })
}

export function tagGroup() {
  return request({
    url: customerApi.tagGroup,
    method: 'post',
    data: {}
  })
}

export function customerLoss(parameter) {
  return request({
    url: customerApi.customerLoss,
    method: 'post',
    data: parameter
  })
}

export function batchTagging(parameter) {
  return request({
    url: customerApi.batchTagging,
    method: 'post',
    data: parameter
  })
}

export function batchTaggingFront(parameter) {
  return request({
    url: customerApi.batchTaggingFront,
    method: 'post',
    data: parameter
  })
}

export function batchDelTagFront(parameter) {
  return request({
    url: customerApi.batchDelTagFront,
    method: 'post',
    data: parameter
  })
}

export function findByCustomerGroup(parameter) {
  return request({
    url: customerApi.findByCustomerGroup,
    method: 'post',
    data: parameter
  })
}

export function findByCustomerEvent(parameter) {
  return request({
    url: customerApi.findByCustomerEvent,
    method: 'post',
    data: parameter
  })
}

export function findEventByCustomerWxid(parameter) {
  return request({
    url: customerApi.findEventByCustomerWxid,
    method: 'post',
    data: parameter
  })
}

export function findByCustomField(parameter) {
  return request({
    url: customerApi.findByCustomField,
    method: 'post',
    data: parameter
  })
}