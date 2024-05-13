import request from '@/utils/request'

const userApi = {
    appletList: '/kolify/spoken/applet/label/page', //分页获取标签接口
    statistics: '/enterprise/dy/user/statistics', //归属人数据统计
    userGroup: '/enterprise/dy/user/group', //归属人数据统计
    videoList: '/enterprise/tx/video/getVideoList', //视频列表
    queryUserPage: '/enterprise/tx/video/userList', //查询视频号用户
    dy_config_list: '/enterprise/dy/config/list', //抖音配置列表
    monitorUpdate: '/enterprise/tx/video/monitorUpdate', //配置更新修改
    dy_account_del: '/enterprise/tx/video/userDel', //用户删除（软删除）
    exportList: '/enterprise/tx/video/export', //视频导出
    userSearch: '/enterprise/dy/admin/user/search', //搜索用户表
    replyCommon: '/enterprise/dy/video/comment', //评论
    newComment: '/enterprise/tx/video/getCommentList', //评论列表

    updateDouyinInfoNow: '/enterprise/dy/user/updateDouyinInfoNow', //即时拉取抖音信息（用户个人信息及视频信息）

    hot_group: '/enterprise/dy/video/hot/getGroupList', //热门视频分类
    hot_list: '/enterprise/tx/video/getVideoHotList', //热门视频列表
    collect_add: '/enterprise/tx/video/addCollect', //【收藏】热门视频添加
    collect_del: '/enterprise/tx/video/delCollect', //【收藏】热门视频删除
    collect_list: '/enterprise/tx/video/collectList', //【收藏】视频列表
    hot_bind: '/enterprise/tx/video/bindHot', //【爆款】热门视频绑定
    hot_bind_del: '/enterprise/tx/video/delBindHot', //热门视频解除绑定
    video_plugin: '/enterprise/tx/video/plugin', //下载插件

}
export function video_plugin(parameter) {
    return request({
        url: userApi.video_plugin,
        method: 'post',
        data: parameter,
    })
}
export function hot_bind_del(parameter) {
    return request({
        url: userApi.hot_bind_del,
        method: 'post',
        data: parameter,
    })
}
export function hot_bind(parameter) {
    return request({
        url: userApi.hot_bind,
        method: 'post',
        data: parameter,
    })
}
export function collect_list(parameter) {
    return request({
        url: userApi.collect_list,
        method: 'post',
        data: parameter,
    })
}
export function collect_del(parameter) {
    return request({
        url: userApi.collect_del,
        method: 'post',
        data: parameter,
    })
}
export function collect_add(parameter) {
    return request({
        url: userApi.collect_add,
        method: 'post',
        data: parameter,
    })
}
export function hot_list(parameter) {
    return request({
        url: userApi.hot_list,
        method: 'post',
        data: parameter,
    })
}

export function hot_group(parameter) {
    return request({
        url: userApi.hot_group,
        method: 'post',
        data: parameter,
    })
}
export function updateDouyinInfoNow(parameter) {
    return request({
        url: userApi.updateDouyinInfoNow,
        method: 'post',
        data: parameter,
    })
}
export function appletList(parameter) {
    return request({
        url: userApi.appletList,
        method: 'post',
        data: parameter,
    })
}
export function getDouYinIntelligentList(parameter) {
    return request({
        url: userApi.getDouYinIntelligentList,
        method: 'post',
        data: parameter,
    })
}
export function getDouYinIntelligentDetail(parameter) {
    return request({
        url: userApi.getDouYinIntelligentDetail,
        method: 'post',
        data: parameter,
    })
}
export function updateDouyinId(parameter) {
    return request({
        url: userApi.updateDouyinId,
        method: 'post',
        data: parameter,
    })
}
export function statistics(parameter) {
    return request({
        url: userApi.statistics,
        method: 'post',
        data: parameter,
    })
}
export function userGroup(parameter) {
    return request({
        url: userApi.userGroup,
        method: 'get',
        params: parameter,
    })
}
export function videoList(parameter) {
    return request({
        url: userApi.videoList,
        method: 'post',
        data: parameter,
    })
}
export function queryUserPage(parameter) {
    return request({
        url: userApi.queryUserPage,
        method: 'post',
        data: parameter,
    })
}
export function authorization(parameter) {
    return request({
        url: userApi.authorization,
        method: 'post',
        data: parameter,
    })
}
export function dy_config_list(parameter) {
    return request({
        url: userApi.dy_config_list,
        method: 'get',
        params: parameter,
    })
}
export function monitorUpdate(parameter) {
    return request({
        url: userApi.monitorUpdate,
        method: 'post',
        data: parameter,
    })
}
export function dy_account_del(parameter) {
    return request({
        url: userApi.dy_account_del,
        method: 'post',
        data: parameter,
    })
}
export function exportList(parameter) {
    return request({
        url: userApi.exportList,
        method: 'post',
        data: parameter,
    })
}
export function userSearch(parameter) {
    return request({
        url: userApi.userSearch,
        method: 'post',
        data: parameter,
    })
}
export function replyCommon(parameter) {
    return request({
        url: userApi.replyCommon,
        method: 'post',
        data: parameter,
    })
}
export function newComment(parameter) {
    return request({
        url: userApi.newComment,
        method: 'post',
        data: parameter,
    })
}