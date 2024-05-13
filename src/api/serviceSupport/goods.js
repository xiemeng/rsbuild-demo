import request from '@/utils/request'

const cusTomapi = {
  productinfoList: '/custservice/productinfo/list', //商品列表
  productinfoInfo: '/custservice/productinfo/info', //商品详情
  productinfoSave: '/custservice/productinfo/save', //新增商品
  productinfoUpdate: '/custservice/productinfo/update', //修改商品
  productinfoDelete: '/custservice/productinfo/delete', //删除商品
  productinfoSyncProduct: '/custservice/productinfo/syncProduct', //同步商品
  uploadAttachment: '/client_group/upload/uploadAttachment', //上传文件,仅商品模块可用
}

export function productinfoList(parameter) {
  return request({
    url: cusTomapi.productinfoList,
    method: 'post',
    data: parameter,
  })
}
export function productinfoInfo(parameter) {
  return request({
    url: cusTomapi.productinfoInfo,
    method: 'get',
    params: parameter,
  })
}
export function productinfoSave(parameter) {
  return request({
    url: cusTomapi.productinfoSave,
    method: 'post',
    data: parameter,
  })
}
export function productinfoUpdate(parameter) {
  return request({
    url: cusTomapi.productinfoUpdate,
    method: 'post',
    data: parameter,
  })
}
export function productinfoDelete(parameter) {
  return request({
    url: cusTomapi.productinfoDelete,
    method: 'post',
    data: parameter,
  })
}
export function productinfoSyncProduct(parameter) {
  return request({
    url: cusTomapi.productinfoSyncProduct,
    method: 'post',
    data: parameter,
  })
}
export function uploadAttachment(parameter) {
  return request({
    url: cusTomapi.uploadAttachment,
    method: 'post',
    data: parameter,
  })
}