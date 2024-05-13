// 任务宝接口
import request from '@/utils/request'

const roleApi = {
  save: '/marketing/fissiontask/save', // 创建活动
  invitationCustomer: '/marketing/fissiontask/invitationCustomer', //邀请客户
  fissiontaskList: '/marketing/fissiontask/list', // 获取企微任务宝列表
  fissiontaskDelete: '/marketing/fissiontask/delete', // 删除
  fissiontaskInfo: '/marketing/fissiontask/info', //查看详情
  fissiontaskUpdate: 'marketing/fissiontask/update', // 修改
}

export function save(parameter) {
  return request({
    url: roleApi.save,
    method: 'post',
    data: parameter,
  })
}

export function invitationCustomer(parameter) {
  return request({
    url: roleApi.invitationCustomer,
    method: 'post',
    data: parameter,
  })
}


export function fissiontaskList(parameter) {
  return request({
    url: roleApi.fissiontaskList,
    method: 'post',
    data: parameter,
  })
}

export function fissiontaskDelete(parameter) {
  return request({
    url: roleApi.fissiontaskDelete,
    method: 'post',
    params: parameter,
  })
}

export function fissiontaskInfo(restful = '') {
  return request({
    url: roleApi.fissiontaskInfo + '/' + restful,
    method: 'get',
  })
}

export function fissiontaskUpdate(parameter) {
  return request({
    url: roleApi.fissiontaskUpdate,
    method: 'post',
    data: parameter,
  })
}