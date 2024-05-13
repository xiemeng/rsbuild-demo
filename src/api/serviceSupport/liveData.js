import request from '@/utils/request'

const cusTomapi = {
  syncAll: '/custservice/livinginfo/syncAll', //直播全量同步
  getLivingCode: '/custservice/livinginfo/h5/getLivingCode', //查询H5直播凭证
  liveList: '/custservice/livinginfo/list', //直播列表
  livePeopleList: '/custservice/livingaudience/list', //直播观众列表
  liveInfo: '/custservice/livinginfo/info', //直播记录信息
  syncOne: '/custservice/livinginfo/syncOne', //直播单条同步
  saveLive: '/custservice/livinginfo/save', //新增预约直播
  updateLive: '/custservice/livinginfo/update', //修改预约直播
  deleteList: '/custservice/livinginfo/cancel', //取消预约直播
  wxlivingList: '/custservice/wx/living/list', //微信直播列表
  add_wxliving: '/custservice/wx/living/add', //增加直播
  modify_wxliving: '/custservice/wx/living/modify', //修改直播
  del_wxliving: '/custservice/wx/living/del', //删除直播
  phone_getDetail: '/custservice/wx/living/getDetail', //查看直播手机号明细
  meeting_list: '/custservice/meetingInfo/page', //会议列表
  createMeeting: '/custservice/meetingInfo/createMeeting', //创建会议
  cancelMeeting: '/custservice/meetingInfo/cancelMeeting', //取消会议
  updateMeeting: '/custservice/meetingInfo/updateMeeting', //更新会议
}
export function updateMeeting (parameter) {
  return request({
    url: cusTomapi.updateMeeting,
    method: 'post',
    data: parameter,
  })
}
export function cancelMeeting (parameter) {
  return request({
    url: cusTomapi.cancelMeeting,
    method: 'post',
    data: parameter,
  })
}
export function createMeeting (parameter) {
  return request({
    url: cusTomapi.createMeeting,
    method: 'post',
    data: parameter,
  })
}

export function meeting_list (parameter) {
  return request({
    url: cusTomapi.meeting_list,
    method: 'post',
    data: parameter,
  })
}

export function phone_getDetail (parameter) {
  return request({
    url: cusTomapi.phone_getDetail,
    method: 'post',
    data: parameter,
  })
}
export function modify_wxliving (parameter) {
  return request({
    url: cusTomapi.modify_wxliving,
    method: 'post',
    data: parameter,
  })
}
export function add_wxliving (parameter) {
  return request({
    url: cusTomapi.add_wxliving,
    method: 'post',
    data: parameter,
  })
}
export function del_wxliving (parameter) {
  return request({
    url: cusTomapi.del_wxliving,
    method: 'get',
    params: parameter,
  })
}

export function wxlivingList (parameter) {
  return request({
    url: cusTomapi.wxlivingList,
    method: 'post',
    data: parameter,
  })
}


export function deleteList (parameter) {
  return request({
    url: cusTomapi.deleteList,
    method: 'post',
    data: parameter,
  })
}

export function saveLive (parameter) {
  return request({
    url: cusTomapi.saveLive,
    method: 'post',
    data: parameter,
  })
}

export function updateLive (parameter) {
  return request({
    url: cusTomapi.updateLive,
    method: 'post',
    data: parameter,
  })
}

export function livePeopleList (parameter) {
  return request({
    url: cusTomapi.livePeopleList,
    method: 'post',
    data: parameter,
  })
}
export function syncAll (parameter) {
  return request({
    url: cusTomapi.syncAll,
    method: 'get',
    params: parameter,
  })
}
export function getLivingCode (parameter) {
  return request({
    url: cusTomapi.getLivingCode,
    method: 'get',
    params: parameter,
  })
}
export function liveList (parameter) {
  return request({
    url: cusTomapi.liveList,
    method: 'post',
    data: parameter,
  })
}
export function liveInfo (parameter) {
  return request({
    url: cusTomapi.liveInfo,
    method: 'get',
    params: parameter,
  })
}
export function syncOne (parameter) {
  return request({
    url: cusTomapi.syncOne,
    method: 'get',
    params: parameter,
  })
}