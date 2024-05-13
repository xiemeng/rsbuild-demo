import request from '@/utils/request'

const baseApi = {
  jiraTaskInfoPage: '/enterprise/jiraTaskInfo/page', // 分页查询
  jiraUserNameMappingList: '/enterprise/jiraUserNameMapping/list', // 执行人列表查询
  exportOPPM: '/enterprise/jiraTaskInfo/exportOPPM', // PPM EXCEL导出
  pushOPPM: '/enterprise/jiraTaskInfo/pushOPPM', // 推送OPPM数据
  listSubTask: '/enterprise/jiraTaskInfo/listSubTask', // 子任务列表查询
}

export function jiraTaskInfoPage(parameter) {
  return request({
    url: baseApi.jiraTaskInfoPage,
    method: 'post',
    data: parameter,
  })
}

export function jiraUserNameMappingList(parameter) {
  return request({
    url: baseApi.jiraUserNameMappingList,
    method: 'post',
    data: parameter,
  })
}

export function exportOPPM(parameter) {
  return request({
    url: baseApi.exportOPPM,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function pushOPPM(parameter) {
  return request({
    url: baseApi.pushOPPM,
    method: 'post',
    data: parameter,
  })
}

export function listSubTask(parameter) {
  return request({
    url: baseApi.listSubTask,
    method: 'post',
    data: parameter,
  })
}