import request from '@/utils/request'

const listApi = {
  page: '/client_manager/transfer/page', // 待分配客户列表
  transferGroupList: '/client_manager/transfer/transferGroupList', // 群聊列表
  getCustomerList: '/client_manager/transfer/onDuty/getCustomerList', // 在职继承客户列表
  assign: '/client_manager/transfer/assign', //离职分配客户
  transfer: '/client_manager/transfer/sync', //同步待分配客户列表
  record: '/client_manager/transfer/record/sync', //同步分配结果
  groupTransfer: '/client_manager/transfer/groupTransfer', //分配群聊
  nowassign: '/client_manager/transfer/onDuty/assign', //在职分配
  getGroupOwner: '/client_manager/transfer/getGroupOwner', // 获取离职群主
  ondutyTransferRecord: '/client_manager/transfer/ondutyTransferRecord', //在职分配记录
  quitRecord: '/client_manager/transfer/record', //离职分配记录
  transferGroupRecord: '/client_manager/transfer/transferGroupRecord', //群聊分配记录
}

export function quitRecord(parameter) {
  return request({
    url: listApi.quitRecord,
    method: 'post',
    data: parameter,
  })
}

export function ondutyTransferRecord(parameter) {
  return request({
    url: listApi.ondutyTransferRecord,
    method: 'post',
    data: parameter,
  })
}

export function getGroupOwner() {
  return request({
    url: listApi.getGroupOwner,
    method: 'get',
  })
}


export function nowassign(parameter) {
  return request({
    url: listApi.nowassign,
    method: 'post',
    data: parameter,
  })
}

export function groupTransfer(parameter) {
  return request({
    url: listApi.groupTransfer,
    method: 'post',
    data: parameter,
  })
}

export function assign(parameter) {
  return request({
    url: listApi.assign,
    method: 'post',
    data: parameter,
  })
}

export function record() {
  return request({
    url: listApi.record,
    method: 'get',
  })
}

export function transfer() {
  return request({
    url: listApi.transfer,
    method: 'get',
  })
}

export function pageList(parameter) {
  return request({
    url: listApi.page,
    method: 'post',
    data: parameter,
  })
}

export function transferGroupList(parameter) {
  return request({
    url: listApi.transferGroupList,
    method: 'post',
    data: parameter,
  })
}

export function getCustomerList(parameter) {
  return request({
    url: listApi.getCustomerList,
    method: 'get',
    params: parameter,
  })
}

export function transferGroupRecord(parameter) {
  return request({
    url: listApi.transferGroupRecord,
    method: 'post',
    data: parameter,
  })
}