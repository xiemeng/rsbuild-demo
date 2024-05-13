import request from '@/utils/request'

const vioApi = {
    privateList: '/risk/risk/msgrecordviolation/list', //私聊违规提醒列表
    grouplist: '/risk/risk/msgrecordviolation/grouplist', //群聊违规提醒列表
    cruxList: '/risk/risk/msgviolationkey/list', //违规关键词表列表
    save: '/risk/risk/msgviolationkey/save', //新增违规关键词
    deleteCux: '/risk/risk/msgviolationkey/delete', //删除关键词
    customList: '/enterprise/staff/get' //所有成员列表
}

export function customList(parameter) {
    return request({
        url: vioApi.customList,
        method: 'get',
        params: parameter,
    })
}

export function save(parameter) {
    return request({
        url: vioApi.save,
        method: 'post',
        data: parameter,
    })
}

export function privateList(parameter) {
    return request({
        url: vioApi.privateList,
        method: 'post',
        params: parameter,
    })
}

export function grouplist(parameter) {
    return request({
        url: vioApi.grouplist,
        method: 'post',
        params: parameter,
    })
}

export function cruxList(parameter) {
    return request({
        url: vioApi.cruxList,
        method: 'post',
        params: parameter,
    })
}

export function deleteCux(parameter) {
    return request({
        url: vioApi.deleteCux,
        method: 'post',
        params: parameter,
    })
}