import request from '@/utils/request'

const groupApi = {
  groupSendList: '/client_group/groupsend/list', // 分页查询
  groupSendSave: '/client_group/groupsend/save', // 新增
  groupSendInfo: '/client_group/groupsend/info/', // 详情
  groupSendNotify: '/client_group/groupsend/notify', // 提醒群发
  groupSendCancel: '/client_group/groupsend/cancel', // 取消群发
  groupSendChat: '/client_group/groupsend/chat', // 客户群接收详情
  groupSendStaff: '/client_group/groupsend/staff', // 群主发送详情
}

export function groupSendList(parameter) {
  return request({
    url: groupApi.groupSendList,
    method: 'post',
    data: parameter,
  })
}

export function groupSendSave(parameter) {
  return request({
    url: groupApi.groupSendSave,
    method: 'post',
    data: parameter,
  })
}

export function groupSendInfo(restfor) {
  return request({
    url: groupApi.groupSendInfo + restfor,
    method: 'get',
  })
}

export function groupSendCancel(parameter) {
  return request({
    url: groupApi.groupSendCancel,
    method: 'post',
    data: parameter,
  })
}

export function groupSendNotify(parameter) {
  return request({
    url: groupApi.groupSendNotify,
    method: 'post',
    data: parameter,
  })
}

export function groupSendChat(parameter) {
  return request({
    url: groupApi.groupSendChat,
    method: 'post',
    data: parameter,
  })
}

export function groupSendStaff(parameter) {
  return request({
    url: groupApi.groupSendStaff,
    method: 'post',
    data: parameter,
  })
}