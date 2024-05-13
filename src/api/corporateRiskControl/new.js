import request from '@/utils/request'

const newApi = {
  memberList: '/risk/messageStorage/showSession', //聊天记录-成员列表
  recordList: '/risk/risk/msgmessagerecord/list', //聊天记录管理
  groupList: '/risk/risk/msgmessagerecord/groupList', //群聊聊天记录
  getStaff: '/risk/messageStorage/getStaff', //获取成员开启会话存档情况
  showSessionCustomer: '/risk/messageStorage/showSessionCustomer', //聊天记录-根据客户获取
}

export function getStaff(parameter) {
  return request({
    url: newApi.getStaff,
    method: 'get',
    params: parameter,
  })
}

export function memberList(parameter) {
  return request({
    url: newApi.memberList,
    method: 'get',
    params: parameter,
  })
}

export function recordList(parameter) {
  return request({
    url: newApi.recordList,
    method: 'get',
    params: parameter,
  })
}

export function groupList(parameter) {
  return request({
    url: newApi.groupList,
    method: 'get',
    params: parameter,
  })
}

export function showSessionCustomer(parameter) {
  return request({
    url: newApi.showSessionCustomer,
    method: 'get',
    params: parameter,
  })
}