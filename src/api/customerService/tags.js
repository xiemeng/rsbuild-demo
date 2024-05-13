import request from '@/utils/request'

const customerApi = {
  getTagGroup: '/client_manager/CustomerTag/getTagGroup', // 获取标签组信息
  syncTagGroup: '/client_manager/CustomerTag/syncTagGroup', // 同步标签
  addOrEditTagGroup: '/client_manager/CustomerTag/addOrEditTagGroup', // 新增标签
  delTagGroup: '/client_manager/CustomerTag/delTagGroup', // 删除标签
}

export function getTagGroup(parameter) {
  return request({
      url: customerApi.getTagGroup,
      method: 'post',
      data: parameter,
  })
}

export function syncTagGroup(parameter) {
  return request({
      url: customerApi.syncTagGroup,
      method: 'post',
      data: parameter,
  })
}

export function addOrEditTagGroup(parameter) {
  return request({
      url: customerApi.addOrEditTagGroup,
      method: 'post',
      data: parameter,
  })
}

export function delTagGroup(parameter) {
  return request({
      url: customerApi.delTagGroup,
      method: 'post',
      data: parameter,
  })
}
