import request from '@/utils/request'

const cusTomapi = {
  inspectkeywordList: '/custservice/inspectkeyword/list', //列表
  inspectkeywordAdd: '/custservice/inspectkeyword/add', //添加
  inspectkeywordUpdate: '/custservice/inspectkeyword/update', //修改
  inspectkeywordDelete: '/custservice/inspectkeyword/delete', //删除
  inspectkeywordSearch: '/custservice/chat/search', //聊天记录查询
  searchVideo: '/custservice/chat/searchVideo', //查询视频号聊天记录

  pageList: '/custservice/inspect/record/pageList', //聊天记录查询 列表
  queryDetails: '/custservice/inspect/record/queryDetails', //详情查询
  searchChat: '/custservice/chat/search', //查询聊天记录
  disposeInspectRecord: '/custservice/inspect/record/disposeInspectRecord', //处理
  listV2: '/custservice/inspectkeyword/listV2', //获取关键字列表
  listAccount: '/custservice/account/list', //客服账号列表
  customerserviceservicer: '/custservice/customerserviceservicer/listV2', //获取接待员列表
}

export function searchVideo (parameter) {
  return request({
    url: cusTomapi.searchVideo,
    method: 'post',
    data: parameter,
  })
}
export function inspectkeywordList (parameter) {
  return request({
    url: cusTomapi.inspectkeywordList,
    method: 'post',
    data: parameter,
  })
}
export function inspectkeywordAdd (parameter) {
  return request({
    url: cusTomapi.inspectkeywordAdd,
    method: 'post',
    data: parameter,
  })
}
export function inspectkeywordUpdate (parameter) {
  return request({
    url: cusTomapi.inspectkeywordUpdate,
    method: 'post',
    data: parameter,
  })
}
export function inspectkeywordDelete (parameter) {
  return request({
    url: cusTomapi.inspectkeywordDelete,
    method: 'post',
    data: parameter,
  })
}

export function inspectkeywordSearch (parameter) {
  return request({
    url: cusTomapi.inspectkeywordSearch,
    method: 'post',
    data: parameter,
  })
}

export function pageList (parameter) {
  return request({
    url: cusTomapi.pageList,
    method: 'post',
    data: parameter,
  })
}
export function queryDetails (parameter) {
  return request({
    url: cusTomapi.queryDetails,
    method: 'post',
    data: parameter,
  })
}
export function searchChat (parameter) {
  return request({
    url: cusTomapi.searchChat,
    method: 'post',
    data: parameter,
  })
}
export function disposeInspectRecord (parameter) {
  return request({
    url: cusTomapi.disposeInspectRecord,
    method: 'post',
    data: parameter,
  })
}
export function listV2 (parameter) {
  return request({
    url: cusTomapi.listV2,
    method: 'post',
    data: parameter,
  })
}
export function listAccount (parameter) {
  return request({
    url: cusTomapi.listAccount,
    method: 'post',
    data: parameter,
  })
}
export function customerserviceservicer (parameter) {
  return request({
    url: cusTomapi.customerserviceservicer,
    method: 'post',
    data: parameter,
  })
}