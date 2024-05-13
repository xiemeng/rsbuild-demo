import request from '@/utils/request'

const api = {
  getUserSig: `/custservice/app/kf/login`, //同步更新
  endSession: '/custservice/app/kf/endSession', // 结束会话
  sessionList: '/custservice/app/kf/sessionList', // 会话列表
  endHistoryList: '/custservice/app/kf/endList', // 已结束的会话记录

  queryQuickReply: `/custservice/app/kf/queryQuickReply`, //查询快捷回复
  saveQuickReply: '/custservice/app/kf/saveQuickReply', // 保存快捷回复
  deleteQuickReply: '/custservice//app/kf/deleteQuickReply', // 删除快捷回复
  redactQuickReply: '/custservice/app/kf/redactQuickReply', // 编辑快捷回复

  queryTag: '/custservice/app/kf/queryTag', // 查询快捷回复标签
  saveTag: '/custservice/app/kf/saveTag', // 保存快捷回复标签
  deleteTag: '/custservice/app/kf/deleteTag', // 删除快捷回复标签
}

/**
 * 获取签名
 * @param {*} parameter
 * @returns
 */
export function getUserSig(parameter) {
  return request({
    url: api.getUserSig,
    method: 'post',
    data: parameter,
  })
}
/**
 * 结束会话
 * @param {*} parameter
 * @returns
 */
export function endSession(parameter) {
  return request({
    url: api.endSession,
    method: 'post',
    data: parameter,
  })
}
/**
 * 结束会话
 * @param {*} parameter
 * @returns
 */
export function sessionList(parameter) {
  return request({
    url: api.sessionList,
    method: 'post',
    data: parameter,
  })
}
export function endHistoryList(parameter) {
  return request({
    url: api.endHistoryList,
    method: 'post',
    data: parameter,
  })
}

export function queryQuickReply(parameter) {
  return request({
    url: api.queryQuickReply,
    method: 'post',
    data: parameter,
  })
}
export function saveQuickReply(parameter) {
  return request({
    url: api.saveQuickReply,
    method: 'post',
    data: parameter,
  })
}
export function deleteQuickReply(parameter) {
  return request({
    url: api.deleteQuickReply,
    method: 'post',
    data: parameter,
  })
}
export function redactQuickReply(parameter) {
  return request({
    url: api.redactQuickReply,
    method: 'post',
    data: parameter,
  })
}
export function queryTag(parameter) {
  return request({
    url: api.queryTag,
    method: 'post',
    data: parameter,
  })
}
export function saveTag(parameter) {
  return request({
    url: api.saveTag,
    method: 'post',
    data: parameter,
  })
}
export function deleteTag(parameter) {
  return request({
    url: api.deleteTag,
    method: 'post',
    data: parameter,
  })
}
