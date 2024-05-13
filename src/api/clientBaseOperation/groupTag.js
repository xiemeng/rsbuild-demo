import request from '@/utils/request'

const groupApi = {
  queryGroupPageByGroupSop: '/client_group/customerGroup/queryGroupPageByGroupSop', // 群聊列表
  addOrEditGroupTag: '/client_group/groupTagController/addOrEditGroupTag', // 新增群标签
  delGroupTag: '/client_group/groupTagController/delGroupTag', // 删除群标签
  queryGroupTag: '/client_group/groupTagController/queryGroupTag', // 查询群标签
}

export function addOrEditGroupTag(parameter) {
  return request({
    url: groupApi.addOrEditGroupTag,
    method: 'post',
    data: parameter,
  })
}

export function delGroupTag(parameter) {
  return request({
    url: groupApi.delGroupTag,
    method: 'post',
    data: parameter,
  })
}

export function queryGroupTag(parameter) {
  return request({
    url: groupApi.queryGroupTag,
    method: 'post',
    data: parameter,
  })
}