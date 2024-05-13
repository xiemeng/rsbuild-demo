import request from '@/utils/request'
const groupApi = {
  pageList: '/client_group/groupCalendar/page', // 查询群日历列表
  addPage: '/client_group/groupCalendar/save', // 添加群日历
  detailPage: '/client_group/groupCalendar/detail', // 查询群日历详情
  delPage: '/client_group/groupCalendar/delete', // 删除群日历
  updateStatus: '/client_group/groupCalendar/updateStatus', // 群日历开关
  addGroupChat: '/client_group/groupCalendar/addGroupChat', // 群日历添加群聊
  delGroupChat: '/client_group/groupCalendar/delGroupChat', // 群日历删除群聊

  update: '/client_group/groupCalendar/update', // 修改群日历名称
  savePlan: '/client_group/groupCalendar/savePlan', // 添加群日历规则
  updatePlan: '/client_group/groupCalendar/updatePlan', // 修改群日历规则
  deletePlan: '/client_group/groupCalendar/deletePlan', // 删除群日历规则
}
export function pageList(parameter) {
  return request({
    url: groupApi.pageList,
    method: 'get',
    params: parameter,
  })
}
export function detailPage(parameter) {
  return request({
    url: groupApi.detailPage,
    method: 'get',
    params: parameter,
  })
}
export function addPage(parameter) {
  return request({
    url: groupApi.addPage,
    method: 'post',
    data: parameter,
  })
}
export function delPage(parameter) {
  return request({
    url: groupApi.delPage,
    method: 'post',
    data: parameter,
  })
}
export function updateStatus(parameter) {
  return request({
    url: groupApi.updateStatus,
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
export function update(parameter) {
  return request({
    url: groupApi.update,
    method: 'post',
    data: parameter,
  })
}
export function savePlan(parameter) {
  return request({
    url: groupApi.savePlan,
    method: 'post',
    data: parameter,
  })
}
export function updatePlan(parameter) {
  return request({
    url: groupApi.updatePlan,
    method: 'post',
    data: parameter,
  })
}
export function deletePlan(parameter) {
  return request({
    url: groupApi.deletePlan,
    method: 'post',
    data: parameter,
  })
}
