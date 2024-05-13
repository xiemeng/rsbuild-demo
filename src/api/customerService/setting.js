import request from '@/utils/request'

const customerApi = {
  info: '/client_manager/fieldCustomRule/info', // 查询自定义信息
  updateBase: '/client_manager/fieldCustomRule/updateBase', // 修改基本信息显示与隐藏
  save: '/client_manager/fieldCustomRule/save', // 添加自定义字段
  update: '/client_manager/fieldCustomRule/update', // 修改自定义字段
  deleteRule: '/client_manager/fieldCustomRule/delete', // 删除自定义字段
  move: '/client_manager/fieldCustomRule/move', // 移动自定义字段顺序
}

export function info(parameter) {
  return request({
    url: customerApi.info,
    method: 'get',
    get: parameter,
  })
}
export function updateBase(parameter) {
  return request({
    url: customerApi.updateBase,
    method: 'post',
    data: parameter,
  })
}
export function save(parameter) {
  return request({
    url: customerApi.save,
    method: 'post',
    data: parameter,
  })
}
export function deleteRule(parameter) {
  return request({
    url: customerApi.deleteRule,
    method: 'post',
    params: parameter,
  })
}
export function move(parameter) {
  return request({
    url: customerApi.move,
    method: 'post',
    params: parameter,
  })
}
export function update(parameter) {
  return request({
    url: customerApi.update,
    method: 'post',
    data: parameter,
  })
}