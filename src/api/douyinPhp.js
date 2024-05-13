import request from '@/utils/request'

const userApi = {
    authorization: '/api/dy/auth/authorization', //授权
    userList: '/enterprise/dy/user/queryUserPage', //用户列表
    videoList: '/enterprise/dy/video/list', //视频列表
    commentVideoList: '/api/dy/video/comment', //评论列表
    newComment: '/api/dy/video/new/comment', //评论列表
    replysList: '/api/dy/video/replys', //回复评论列表
    replyCommon: '/api/dy/video/reply', //回复评论
    exportList: '/api/dy/video/export', //导出
    monitor: '/api/dy/user/monitor', //监控
    userGroup: '/api/dy/user/group',
    statistics: '/api/dy/user/statistics',
    video: {
        auth: {
            create: '/api/video/auth/create',
            update: '/api/video/auth/update',
            list: '/api/video/auth/list',
        },
        rule: {
            create: '/api/video/rule/create',
            update: '/api/video/rule/update',
            list: '/api/video/rule/list',
        },
        user: {
            search: '/api/video/user/search',
            list: '/api/video/user/list',
        },
    },

    dy_config_list: '/api/dy/config/list', //抖音配置列表
    dy_account_del: '/external_api/douyin/user/account/del', //删除授权用户

    hot_group: '/enterprise/dy/video/hot/getGroupList', //热门视频分类
    hot_list: '/enterprise/dy/video/hot/getVideoHotList', //热门视频列表
    collect_add: '/enterprise/dy/video/collect/addCollect', //【收藏】热门视频添加
    collect_del: '/enterprise/dy/video/collect/delCollect', //【收藏】热门视频删除
    collect_list: '/enterprise/dy/video/collect/queryCollectList', //【收藏】视频列表
    hot_bind: '/enterprise/dy/video/hot/bind', //【爆款】热门视频绑定
    hot_bind_del: '/enterprise/dy/video/hot/bind/del', //热门视频解除绑定
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

export function dy_account_del(parameter) {
    return request({
        url: userApi.dy_account_del,
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
export function authorization(parameter) {
    return request({
        url: userApi.authorization,
        method: 'get',
        params: parameter,
    })
}
export function userList(parameter) {
    return request({
        url: userApi.userList,
        method: 'post',
        data: parameter,
    })
}
export function videoList(parameter) {
    return request({
        url: userApi.videoList,
        method: 'post',
        data: parameter,
    })
}
export function commentVideoList(parameter) {
    return request({
        url: userApi.commentVideoList,
        method: 'get',
        params: parameter,
    })
}
export function replysList(parameter) {
    return request({
        url: userApi.replysList,
        method: 'get',
        params: parameter,
    })
}
export function replyCommon(parameter) {
    return request({
        url: userApi.replyCommon,
        method: 'post',
        data: parameter,
    })
}

export function exportList(parameter) {
    return request({
        url: userApi.exportList,
        method: 'get',
        params: parameter,
    })
}

export function monitor(parameter) {
    return request({
        url: userApi.monitor,
        method: 'post',
        data: parameter,
    })
}

export function newComment(parameter) {
    return request({
        url: userApi.newComment,
        method: 'get',
        params: parameter,
    })
}

export function authCreate(parameter) {
    return request({
        url: userApi.video.auth.create,
        method: 'post',
        data: parameter,
    })
}

export function authUpdate(parameter) {
    return request({
        url: userApi.video.auth.update,
        method: 'post',
        data: parameter,
    })
}

export function authList(parameter) {
    return request({
        url: userApi.video.auth.list,
        method: 'get',
        params: parameter,
    })
}

export function ruleCreate(parameter) {
    return request({
        url: userApi.video.rule.create,
        method: 'post',
        data: parameter,
    })
}

export function ruleUpdate(parameter) {
    return request({
        url: userApi.video.rule.update,
        method: 'post',
        data: parameter,
    })
}

export function ruleList(parameter) {
    return request({
        url: userApi.video.rule.list,
        method: 'get',
        params: parameter,
    })
}

export function userSearch(parameter) {
    return request({
        url: userApi.video.user.search,
        method: 'get',
        params: parameter,
    })
}

export function userList2(parameter) {
    return request({
        url: userApi.video.user.list,
        method: 'get',
        params: parameter,
    })
}

export function userGroup(parameter) {
    return request({
        url: userApi.userGroup,
        method: 'get',
        params: parameter,
    })
}

export function statistics(parameter) {
    return request({
        url: userApi.statistics,
        method: 'get',
        params: parameter,
    })
}