import request from '@/utils/request'

const userApi = {
  appletList: '/kolify/spoken/applet/label/page', //分页获取标签接口
  getDouYinIntelligentList: '/enterprise/dy/intelligent/getDouYinIntelligentList', //查看抖音达人列表
  getDouYinIntelligentDetail: '/enterprise/dy/intelligent/getDouYinIntelligentDetail', //查看抖音达人详情
  updateDouyinId: '/enterprise/dy/intelligent/updateDouYinId', //编辑抖音号
  statistics: '/enterprise/dy/user/statistics', //归属人数据统计
  userGroup: '/enterprise/dy/user/group', //归属人数据统计
  videoList: '/enterprise/dy/video/list', //视频列表
  queryUserPage: '/enterprise/dy/user/queryUserPage', //查询抖音授权用户
  authorization: '/enterprise/dy/auth/getAuthorizationUrl', //获取授权url(Web 授权)
  dy_config_list: '/enterprise/dy/config/list', //抖音配置列表
  monitorUpdate: '/enterprise/dy/user/monitorUpdate', //抖音配置列表
  dy_account_del: '/enterprise/dy/user/userDelete', //用户删除（软删除）
  exportList: '/enterprise/dy/video/export', //视频导出
  userSearch: '/enterprise/dy/admin/user/search', //搜索用户表
  replyCommon: '/enterprise/dy/video/comment', //评论
  newComment: '/enterprise/dy/video/commentlist', //评论列表

  updateDouyinInfoNow: '/enterprise/dy/user/updateDouyinInfoNow', //即时拉取抖音信息（用户个人信息及视频信息）
  entryUser: '/enterprise/common/user/user/entry', //手动录入用户数据

  userList: '/enterprise/common/user/userList', //新用户列表
  userDel: '/enterprise/common/user/userDel', //新用户删除
  commonMonitorUpdate: '/enterprise/common/user/monitorUpdate', //新监控配置修改

  common_video_list: '/enterprise/common/user/api/acadsoc/common/video/list', //小红书/B站/快手 视频列表
  common_video_export: '/enterprise/common/user/api/acadsoc/common/video/export', //小红书/B站/快手 视频列表导出
  plugin_load: '/enterprise/common/user/api/acadsoc/book/plugin/load', //下载插件
  book_account_auth: '/enterprise/common/user/api/acadsoc/book/account/auth', //小红书账号授权

  getKsAuthUrl: '/enterprise/common/user/auth/getKsAuthUrl', //获取快手授权url
  getBliAuthUrl: '/enterprise/common/user/auth/getBliAuthUrl', //获取B站授权url

  allSession: '/enterprise/openai/session/allSession', //查询当前用户下的所有会话
  delSession: '/enterprise/openai/session/delSession', //删除会话
  updateSession: '/enterprise/openai/session/updateSession', //修改会话 标题
  general: '/enterprise/openai/chat/sendMsg', //聊天
  deleteMsg: '/enterprise/openai/chat/deleteMsg',
  chat_history: '/enterprise/openai/chat/history', //获取历史记录

  uploadFile: '/enterprise/common/chat/uploadFile', //文件上传
  uploadFileOpenai: '/enterprise/openai/info/uploadFile', //上传文件到openAi

  kol_list: '/client_manager/kol/list', //课程列表
  kol_distribute: '/client_manager/kol/distribute', //分配客服
  kol_addConfig: '/client_manager/kol/addConfig', //新增或者修改配置
  kol_change: '/client_manager/kol/change', //变更
  kol_config: '/client_manager/kol/config', //获取配置

  queryTimeRangeAccessData: '/custservice/statistics/visit/queryTimeRangeAccessData', //查询时间范围访问数据

  configList: '/enterprise/push/config/configList', //推送配置列表
  config_update: '/enterprise/push/config/update', //修改状态-发布或者结束
  config_add: '/enterprise/push/config/add', //新增/发布/修改
  config_detail: '/enterprise/push/config/detail', //详情
  config_charts: '/enterprise/push/config/charts', //详情-统计图
  config_dataTotal: '/enterprise/push/config/dataTotal', //详情-数据汇总
  config_pushList: '/enterprise/push/config/pushList', //推送列表

  getSmsTemplates: '/enterprise/sms/template/getSmsTemplates', //获取短信模板
  getOverview: '/enterprise/push/msg/data/getOverview', //总体数据概览
  growthTrendLineChart: '/enterprise/push/msg/data/growthTrendLineChart', //增长趋势折线图
  pieChart: '/enterprise/push/msg/data/pieChart', //饼图
  getTop10: '/enterprise/push/msg/data/getTop10', //top10

  config_save: '/marketing/fission/poster/config/save', //保存裂变海报配置
  config_getList: '/marketing/fission/poster/config/getList', //查看裂变海报配置
  share_list: '/marketing/fission/poster/share/list', //分享数据列表
  share_export: '/marketing/fission/poster/share/export', //分享数据列表导出
}

export function share_export (parameter) {
  return request({
    url: userApi.share_export,
    method: 'post',
    data: parameter,
  })
}
export function share_list (parameter) {
  return request({
    url: userApi.share_list,
    method: 'post',
    data: parameter,
  })
}
export function config_getList (parameter) {
  return request({
    url: userApi.config_getList,
    method: 'post',
    data: parameter,
  })
}
export function config_save (parameter) {
  return request({
    url: userApi.config_save,
    method: 'post',
    data: parameter,
  })
}
export function getTop10 (parameter) {
  return request({
    url: userApi.getTop10,
    method: 'post',
    data: parameter,
  })
}
export function pieChart (parameter) {
  return request({
    url: userApi.pieChart,
    method: 'post',
    data: parameter,
  })
}
export function growthTrendLineChart (parameter) {
  return request({
    url: userApi.growthTrendLineChart,
    method: 'post',
    data: parameter,
  })
}
export function getOverview (parameter) {
  return request({
    url: userApi.getOverview,
    method: 'post',
    data: parameter,
  })
}
export function getSmsTemplates (parameter) {
  return request({
    url: userApi.getSmsTemplates,
    method: 'post',
    data: parameter,
  })
}
export function config_pushList (parameter) {
  return request({
    url: userApi.config_pushList,
    method: 'post',
    data: parameter,
  })
}
export function config_dataTotal (parameter) {
  return request({
    url: userApi.config_dataTotal,
    method: 'post',
    data: parameter,
  })
}
export function config_charts (parameter) {
  return request({
    url: userApi.config_charts,
    method: 'post',
    data: parameter,
  })
}
export function config_detail (parameter) {
  return request({
    url: userApi.config_detail,
    method: 'post',
    data: parameter,
  })
}
export function config_add (parameter) {
  return request({
    url: userApi.config_add,
    method: 'post',
    data: parameter,
  })
}
export function config_update (parameter) {
  return request({
    url: userApi.config_update,
    method: 'post',
    data: parameter,
  })
}
export function configList (parameter) {
  return request({
    url: userApi.configList,
    method: 'post',
    data: parameter,
  })
}
export function queryTimeRangeAccessData (parameter) {
  return request({
    url: userApi.queryTimeRangeAccessData,
    method: 'post',
    data: parameter,
  })
}
export function kol_config (parameter) {
  return request({
    url: userApi.kol_config,
    method: 'post',
    data: parameter,
  })
}
export function kol_change (parameter) {
  return request({
    url: userApi.kol_change,
    method: 'post',
    data: parameter,
  })
}
export function kol_addConfig (parameter) {
  return request({
    url: userApi.kol_addConfig,
    method: 'post',
    data: parameter,
  })
}
export function kol_distribute (parameter) {
  return request({
    url: userApi.kol_distribute,
    method: 'post',
    data: parameter,
  })
}
export function kol_list (parameter) {
  return request({
    url: userApi.kol_list,
    method: 'post',
    data: parameter,
  })
}
export function uploadFileOpenai (parameter) {
  return request({
    url: userApi.uploadFileOpenai,
    method: 'post',
    data: parameter,
  })
}
export function uploadFile (parameter) {
  return request({
    url: userApi.uploadFile,
    method: 'post',
    data: parameter,
  })
}
export function deleteMsg (parameter) {
  return request({
    url: userApi.deleteMsg,
    method: 'post',
    data: parameter,
  })
}
export function chat_history (parameter) {
  return request({
    url: userApi.chat_history,
    method: 'get',
    params: parameter,
  })
}
export function general (parameter) {
  return request({
    url: userApi.general,
    method: 'post',
    data: parameter,
  })
}
export function updateSession (parameter) {
  return request({
    url: userApi.updateSession,
    method: 'get',
    params: parameter,
  })
}
export function delSession (parameter) {
  return request({
    url: userApi.delSession,
    method: 'get',
    params: parameter,
  })
}
export function allSession (parameter) {
  return request({
    url: userApi.allSession,
    method: 'get',
    params: parameter,
  })
}
export function getBliAuthUrl (parameter) {
  return request({
    url: userApi.getBliAuthUrl,
    method: 'post',
    data: parameter,
  })
}
export function getKsAuthUrl (parameter) {
  return request({
    url: userApi.getKsAuthUrl,
    method: 'post',
    data: parameter,
  })
}
export function book_account_auth (parameter) {
  return request({
    url: userApi.book_account_auth,
    method: 'post',
    data: parameter,
  })
}
export function plugin_load (parameter) {
  return request({
    url: userApi.plugin_load,
    method: 'post',
    data: parameter,
  })
}
export function common_video_export (parameter) {
  return request({
    url: userApi.common_video_export,
    method: 'post',
    data: parameter,
  })
}
export function common_video_list (parameter) {
  return request({
    url: userApi.common_video_list,
    method: 'post',
    data: parameter,
  })
}
export function updateDouyinInfoNow (parameter) {
  return request({
    url: userApi.updateDouyinInfoNow,
    method: 'post',
    data: parameter,
  })
}
export function appletList (parameter) {
  return request({
    url: userApi.appletList,
    method: 'post',
    data: parameter,
  })
}
export function getDouYinIntelligentList (parameter) {
  return request({
    url: userApi.getDouYinIntelligentList,
    method: 'post',
    data: parameter,
  })
}
export function getDouYinIntelligentDetail (parameter) {
  return request({
    url: userApi.getDouYinIntelligentDetail,
    method: 'post',
    data: parameter,
  })
}
export function updateDouyinId (parameter) {
  return request({
    url: userApi.updateDouyinId,
    method: 'post',
    data: parameter,
  })
}
export function statistics (parameter) {
  return request({
    url: userApi.statistics,
    method: 'post',
    data: parameter,
  })
}
export function userGroup (parameter) {
  return request({
    url: userApi.userGroup,
    method: 'get',
    params: parameter,
  })
}
export function videoList (parameter) {
  return request({
    url: userApi.videoList,
    method: 'post',
    data: parameter,
  })
}
export function queryUserPage (parameter) {
  return request({
    url: userApi.queryUserPage,
    method: 'post',
    data: parameter,
  })
}
export function authorization (parameter) {
  return request({
    url: userApi.authorization,
    method: 'post',
    data: parameter,
  })
}
export function dy_config_list (parameter) {
  return request({
    url: userApi.dy_config_list,
    method: 'get',
    params: parameter,
  })
}
export function monitorUpdate (parameter) {
  return request({
    url: userApi.monitorUpdate,
    method: 'post',
    data: parameter,
  })
}
export function dy_account_del (parameter) {
  return request({
    url: userApi.dy_account_del,
    method: 'post',
    data: parameter,
  })
}
export function exportList (parameter) {
  return request({
    url: userApi.exportList,
    method: 'post',
    data: parameter,
  })
}
export function userSearch (parameter) {
  return request({
    url: userApi.userSearch,
    method: 'post',
    data: parameter,
  })
}
export function replyCommon (parameter) {
  return request({
    url: userApi.replyCommon,
    method: 'post',
    data: parameter,
  })
}
export function newComment (parameter) {
  return request({
    url: userApi.newComment,
    method: 'post',
    data: parameter,
  })
}
export function entryUser (parameter) {
  return request({
    url: userApi.entryUser,
    method: 'post',
    data: parameter,
  })
}
export function userList (parameter) {
  return request({
    url: userApi.userList,
    method: 'post',
    data: parameter,
  })
}
export function userDel (parameter) {
  return request({
    url: userApi.userDel,
    method: 'post',
    data: parameter,
  })
}
export function commonMonitorUpdate (parameter) {
  return request({
    url: userApi.commonMonitorUpdate,
    method: 'post',
    data: parameter,
  })
}