import request from '@/utils/request'

const costomApi = {
  customerFormSave: '/client_transformation/customerForm/save', // 新增表单
  dateInfoList: '/client_transformation/customerFormData/dateInfoList', // 自定义表单数据详情列表
  customerFormList: '/client_transformation/customerForm/list', // 表单列表
  customerFormInfo: '/client_transformation/customerForm/info', // 获取表单明细
  customerFormUpdate: '/client_transformation/customerForm/update', // 修改表单
  customerFormPublish: '/client_transformation/customerForm/publish', // 表单发布和截止日期设置
  customerFormDelete: '/client_transformation/customerForm/delete', // 删除表单
  dataInfo: '/client_transformation/customerFormData/dataInfo', // 自定义表单表信息详情
  analysis: '/client_transformation/customerFormData/analysis', // 表单内容分析
  staffList: '/client_transformation/customerFormData/staffList', // 员工发送数据
  infoList: '/client_transformation/customerFormData/infoList', // 客户数据详情列表
  analysisExport: '/client_transformation/customerFormData/analysisExport', // 表单内容分析-导出excel
  dataInfoExport: '/client_transformation/customerFormData/dataInfoExport', // 客户数据详情-导出
  infoCityList: '/client_transformation/customerFormData/infoCityList', // 客户数据详情所属城市列表
  batchTags: '/client_transformation/customerFormData/batchTags', // 批量打标签
  selectList: '/client_transformation/customerForm/userData/selectList', // 客户数据下拉值列表数据
  queryDataList: '/client_transformation/customerFormData/queryDataList', // 获取单个客户填写数据详情列表
}

export function infoList(parameter) {
  return request({
    url: costomApi.infoList,
    method: 'post',
    data: parameter,
  })
}

export function staffList(parameter) {
  return request({
    url: costomApi.staffList,
    method: 'get',
    params: parameter,
  })
}

export function analysis(parameter) {
  return request({
    url: costomApi.analysis,
    method: 'get',
    params: parameter,
  })
}

export function dataInfo(parameter) {
  return request({
    url: costomApi.dataInfo,
    method: 'get',
    params: parameter,
  })
}

export function customerFormSave(parameter) {
  return request({
    url: costomApi.customerFormSave,
    method: 'post',
    data: parameter,
  })
}

export function customerFormList(parameter) {
  return request({
    url: costomApi.customerFormList,
    method: 'get',
    params: parameter,
  })
}

export function dateInfoList(parameter) {
  return request({
    url: costomApi.dateInfoList,
    method: 'get',
    params: parameter,
  })
}

export function customerFormDelete(parameter) {
  return request({
    url: costomApi.customerFormDelete,
    method: 'post',
    data: parameter,
  })
}

export function customerFormInfo(parameter) {
  return request({
    url: costomApi.customerFormInfo,
    method: 'get',
    params: parameter,
  })
}

export function customerFormUpdate(parameter) {
  return request({
    url: costomApi.customerFormUpdate,
    method: 'post',
    data: parameter,
  })
}

export function customerFormPublish(parameter) {
  return request({
    url: costomApi.customerFormPublish,
    method: 'post',
    data: parameter,
  })
}

export function analysisExport(parameter) {
  return request({
    url: costomApi.analysisExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

export function dataInfoExport(parameter) {
  return request({
    url: costomApi.dataInfoExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

export function infoCityList(parameter) {
  return request({
    url: costomApi.infoCityList,
    method: 'get',
    params: parameter,
  })
}

export function batchTags(parameter) {
  return request({
    url: costomApi.batchTags,
    method: 'post',
    data: parameter,
  })
}

export function selectList(parameter) {
  return request({
    url: costomApi.selectList,
    method: 'get',
    params: parameter,
  })
}

export function queryDataList(parameter) {
  return request({
    url: costomApi.queryDataList,
    method: 'post',
    data: parameter,
  })
}