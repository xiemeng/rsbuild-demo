import request from '@/utils/request'

const groupApi = {
    pageList: '/client_group/groupAutoPull/page', // 查询自动加群列表
    addPageList: '/client_group/groupAutoPull/add', // 添加自动拉群
    detailPage: '/client_group/groupAutoPull/detail', // 群聊详情
    updatePageList: '/client_group/groupAutoPull/update', // 修改自动拉群
    delGroupAutoPull: '/client_group/groupAutoPull/delGroupAutoPull', // 删除自动拉群
    updatePic: '/client_group/groupAutoPull/updatePic', // 更新二维码头像
    groupList: '/client_group/groupAutoPullGroup/list', // 查询分组列表
    groupSave: '/client_group/groupAutoPullGroup/save', //添加分组
    groupUpdate: '/client_group/groupAutoPullGroup/update', //修改分组
    groupDelete: '/client_group/groupAutoPullGroup/delete', //删除分组
    batchGroup: '/client_group/groupAutoPullGroup/batchGroup', //批量分组
}

export function batchGroup(parameter) {
    return request({
        url: groupApi.batchGroup,
        method: 'post',
        data: parameter,
    })
}

export function groupDelete(parameter) {
    return request({
        url: groupApi.groupDelete,
        method: 'get',
        params: parameter,
    })
}

export function groupUpdate(parameter) {
    return request({
        url: groupApi.groupUpdate,
        method: 'post',
        data: parameter,
    })
}

export function groupSave(parameter) {
    return request({
        url: groupApi.groupSave,
        method: 'post',
        data: parameter,
    })
}

export function groupList(parameter) {
    return request({
        url: groupApi.groupList,
        method: 'get',
        params: parameter,
    })
}

export function pageList(parameter) {
    return request({
        url: groupApi.pageList,
        method: 'get',
        params: parameter,
    })
}

export function addPageList(parameter) {
    return request({
        url: groupApi.addPageList,
        method: 'post',
        data: parameter,
    })
}

export function detailPage(parameter) {
    return request({
        url: groupApi.detailPage,
        method: 'get',
        params: parameter,
    })
}

export function updatePageList(parameter) {
    return request({
        url: groupApi.updatePageList,
        method: 'post',
        data: parameter,
    })
}

export function delGroupAutoPull(parameter) {
    return request({
        url: groupApi.delGroupAutoPull,
        method: 'post',
        params: parameter,
    })
}

export function updatePic(parameter) {
    return request({
        url: groupApi.updatePic,
        method: 'post',
        data: parameter,
    })
}