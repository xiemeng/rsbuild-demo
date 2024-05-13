import request from '@/utils/request'

const cusTomapi = {
  list: '/custservice/account/list', // 获取列表
  uploadMedia: '/client_group/upload/uploadMedia', // 上传文件到企业微信
  add: '/custservice/account/add', // 添加客服第一步
  update: '/custservice/account/update', //客服第一步修改
  delete: '/custservice/account/delete', //删除
  info: '/custservice/account/info', //客服详情
  channelSave: '/custservice/customerservicechannel/save', //新建渠道
  channelUpdate: '/custservice/customerservicechannel/update', //修改渠道
  getchannelList: '/custservice/customerservicechannel/list', //查询渠道
  channelDelete: '/custservice/customerservicechannel/delete', //删除渠道
  getkeyword: '/custservice/account/getkeyword', //关键词列表
  saveReceptionSet: '/custservice/account/saveReceptionSet', //保存接待设置
  receptionistsList: '/custservice/customerserviceservicer/list', //接待人员列表
  getByMember: '/custservice/data/getByMember', //图表-员工
  getByChannel: '/custservice/data/getByChannel', //图表-渠道
  overview: '/custservice/data/overview', //数据总览
  getListByMember: '/custservice/data/getListByMember', //列表-员工数据
  getListByChannel: '/custservice/data/getListByChannel', //渠道-员工数据
  memberExport: '/custservice/data/memberExport', //成员导出Excel
  attendenceExport: '/custservice/data/attendenceExport', //考勤导出Excel
  getOnLineDetailByMember: '/custservice/data/getOnLineDetailByMember', //上下线明细
  listV2: '/custservice/customerserviceservicer/listV2', //获取接待员列表
  account_pageV2: '/custservice/account/pageV2', //分页查询客服账号列表
}
export function account_pageV2 (parameter) {
  return request({
    url: cusTomapi.account_pageV2,
    method: 'post',
    data: parameter,
  })
}
export function listV2 (parameter) {
  return request({
    url: cusTomapi.listV2,
    method: 'post',
    data: parameter,
  })
}
export function getOnLineDetailByMember (parameter) {
  return request({
    url: cusTomapi.getOnLineDetailByMember,
    method: 'post',
    data: parameter,
  })
}

export function attendenceExport (parameter) {
  return request({
    url: cusTomapi.attendenceExport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function memberExport (parameter) {
  return request({
    url: cusTomapi.memberExport,
    method: 'post',
    data: parameter,
    responseType: 'blob'
  })
}

export function getListByChannel (parameter) {
  return request({
    url: cusTomapi.getListByChannel,
    method: 'post',
    data: parameter,
  })
}


export function getListByMember (parameter) {
  return request({
    url: cusTomapi.getListByMember,
    method: 'post',
    data: parameter,
  })
}

export function overview (parameter) {
  return request({
    url: cusTomapi.overview,
    method: 'post',
    data: parameter,
  })
}

export function getByChannel (parameter) {
  return request({
    url: cusTomapi.getByChannel,
    method: 'post',
    data: parameter,
  })
}

export function getByMember (parameter) {
  return request({
    url: cusTomapi.getByMember,
    method: 'post',
    data: parameter,
  })
}

export function receptionistsList (parameter) {
  return request({
    url: cusTomapi.receptionistsList,
    method: 'post',
    data: parameter,
  })
}

export function getkeyword (parameter) {
  return request({
    url: cusTomapi.getkeyword,
    method: 'post',
    data: parameter,
  })
}

export function channelDelete (parameter) {
  return request({
    url: cusTomapi.channelDelete,
    method: 'post',
    data: parameter,
  })
}

export function getchannelList (parameter) {
  return request({
    url: cusTomapi.getchannelList,
    method: 'post',
    data: parameter,
  })
}

export function channelUpdate (parameter) {
  return request({
    url: cusTomapi.channelUpdate,
    method: 'post',
    data: parameter,
  })
}

export function channelSave (parameter) {
  return request({
    url: cusTomapi.channelSave,
    method: 'post',
    data: parameter,
  })
}

export function getCusList (parameter) {
  return request({
    url: cusTomapi.list,
    method: 'post',
    data: parameter,
  })
}

export function uploadMedia (parameter) {
  return request({
    url: cusTomapi.uploadMedia,
    method: 'post',
    data: parameter,
  })
}

export function addCustomer (parameter) {
  return request({
    url: cusTomapi.add,
    method: 'post',
    data: parameter,
  })
}

export function updateCustomer (parameter) {
  return request({
    url: cusTomapi.update,
    method: 'post',
    data: parameter,
  })
}

export function deleteCustomer (parameter) {
  return request({
    url: cusTomapi.delete,
    method: 'post',
    data: parameter,
  })
}

export function getInfo (parameter) {
  return request({
    url: cusTomapi.info,
    method: 'post',
    data: parameter,
  })
}

export function saveReceptionSet (parameter) {
  return request({
    url: cusTomapi.saveReceptionSet,
    method: 'post',
    data: parameter,
  })
}