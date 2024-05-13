import request from '@/utils/request'

const groupApi = {
  getPage: '/client_group/group/welcomes/get', // 分页查询
  deletePage: '/client_group/group/welcomes/delete', // 删除欢迎语
  addPage: '/client_group/group/welcomes/add', // 新增入群欢迎语
  detailPage: '/client_group/group/welcomes/detail', // 新增入群欢迎语
  updatePage: '/client_group/group/welcomes/update', // 修改欢迎语
}

export function getPage (parameter) {
  return request({
      url: groupApi.getPage,
      method: 'get',
      params: parameter,
  })
}

export function deletePage (parameter) {
  return request({
      url: groupApi.deletePage,
      method: 'get',
      params: parameter,
  })
}

export function addPage (parameter) {
  return request({
      url: groupApi.addPage,
      method: 'post',
      data: parameter,
  })
}

export function detailPage (parameter) {
  return request({
      url: groupApi.detailPage,
      method: 'get',
      params: parameter,
  })
}

export function updatePage (parameter) {
  return request({
      url: groupApi.updatePage,
      method: 'post',
      data: parameter,
  })
}