import request from '@/utils/request'

const groupApi = {
  addSersonSop: '/client_group/groupSop/add', // 新增群sop
  delGroupSop: '/client_group/groupSop/delGroupSop', // 删除群sop
  detailPersonSop: '/client_group/groupSop/detail', // 查询群sop详情
  pagePersonSop: '/client_group/groupSop/page', // 查询群sop列表
  addGroupChat: '/client_group/groupSop/addGroupChat', // 添加群聊
  delGroupChat: '/client_group/groupSop/delGroupChat', // 移除群聊

  updatePersonSop: '/client_group/groupSop/update', // 更新群sop
  updateStatus: '/client_group/groupSop/updateStatus', // 修改开关
}

export function addSersonSop(parameter) {
  return request({
    url: groupApi.addSersonSop,
    method: 'post',
    data: parameter,
  })
}

export function delGroupSop(parameter) {
  return request({
    url: groupApi.delGroupSop,
    method: 'post',
    params: parameter,
  })
}

export function detailPersonSop(parameter) {
  return request({
    url: groupApi.detailPersonSop,
    method: 'get',
    params: parameter,
  })
}

export function pagePersonSop(parameter) {
  return request({
    url: groupApi.pagePersonSop,
    method: 'get',
    params: parameter,
  })
}

export function addGroupChat(parameter) {
  return request({
    url: groupApi.addGroupChat,
    method: 'post',
    data: parameter,
  })
}

export function delGroupChat(parameter) {
  return request({
    url: groupApi.delGroupChat,
    method: 'post',
    data: parameter,
  })
}

export function updatePersonSop(parameter) {
  return request({
    url: groupApi.updatePersonSop,
    method: 'post',
    data: parameter,
  })
}

export function updateStatus(parameter) {
  return request({
    url: groupApi.updateStatus,
    method: 'post',
    params: parameter,
  })
}