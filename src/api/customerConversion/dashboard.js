import request from '@/utils/request'

const conversionApi = {
  interactiveRadarAdd: '/client_transformation/interactradar/add', // 互动雷达-新增
  interactiveRadarList: '/client_transformation/interactradar/list', // 互动雷达-分页查询
  interactiveRadarDelete: '/client_transformation/interactradar/delete', // 互动雷达-删除
  interactiveRadarupdate: '/client_transformation/interactradar/update', // 互动雷达-修改
  interactiveRadarInfo: '/client_transformation/interactradar/info', // 互动雷达-详情

  interactiveRadarSave: '/client_transformation/interactradar/channel/save', //新增渠道
  channelLinks: '/client_transformation/interactradar/getChannelLinks', // 查询渠道链接列表
  generateChannelLink: '/client_transformation/interactradar/generateChannelLink', // 生成渠道链接
  interactradarList: '/client_transformation/interactradar/channel/list', // 雷达渠道列表查询
  interactradarUpdate: '/client_transformation/interactradar/channel/update', // 修改渠道
  statisticOverview: '/client_transformation/interactradar/statisticOverview', // 数据总览
  statisticDetail: '/client_transformation/interactradar/statisticDetail', // TOP10数据详情

  customerLog: '/client_transformation/interactradar/customerLog', // 客户数据
  getCustomerLogDetail: '/client_transformation/interactradar/customerLogDetail', // 客户数据详情
  channelLog: '/client_transformation/interactradar/channelLog', // 渠道数据
}

export function channelLog(parameter) {
  return request({
      url: conversionApi.channelLog,
      method: 'post',
      data: parameter,
  })
}

export function getCustomerLogDetail(parameter) {
  return request({
      url: conversionApi.getCustomerLogDetail,
      method: 'get',
      params: parameter,
  })
}

export function customerLog(parameter) {
  return request({
    url: conversionApi.customerLog,
    method: 'post',
    data: parameter,
  })
}

export function statisticDetail(parameter) {
  return request({
      url: conversionApi.statisticDetail,
      method: 'get',
      params: parameter,
  })
}

export function statisticOverview(parameter) {
  return request({
      url: conversionApi.statisticOverview,
      method: 'get',
      params: parameter,
  })
}

export function interactradarUpdate(parameter) {
  return request({
    url: conversionApi.interactradarUpdate,
    method: 'post',
    data: parameter,
  })
}

export function interactradarList(parameter) {
  return request({
      url: conversionApi.interactradarList,
      method: 'get',
      params: parameter,
  })
}

export function generateChannelLink(parameter) {
  return request({
      url: conversionApi.generateChannelLink,
      method: 'get',
      params: parameter,
  })
}

export function channelLinks(parameter) {
  return request({
      url: conversionApi.channelLinks,
      method: 'get',
      params: parameter,
  })
}

export function interactiveRadarSave(parameter) {
  return request({
    url: conversionApi.interactiveRadarSave,
    method: 'post',
    data: parameter,
  })
}

export function interactiveRadarInfo(restful) {
  return request({
      url: conversionApi.interactiveRadarInfo + '/' + restful,
      method: 'get',
  })
}

export function interactiveRadarupdate(parameter) {
  return request({
    url: conversionApi.interactiveRadarupdate,
    method: 'post',
    data: parameter,
  })
}

export function interactiveRadarDelete(parameter) {
  return request({
    url: conversionApi.interactiveRadarDelete,
    method: 'post',
    data: parameter,
  })
}

export function interactiveRadarAdd(parameter) {
  return request({
    url: conversionApi.interactiveRadarAdd,
    method: 'post',
    data: parameter,
  })
}

export function interactiveRadarList(parameter) {
  return request({
    url: conversionApi.interactiveRadarList,
    method: 'post',
    data: parameter,
  })
}