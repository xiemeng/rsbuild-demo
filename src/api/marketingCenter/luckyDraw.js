import request from '@/utils/request'

const ApiList = {
    getList: '/marketing/luckyActivity/list', //抽奖活动列表
    addSave: '/marketing/luckyActivity/save', //新增抽奖活动
    updateList: '/marketing/luckyActivity/update', //更新抽奖活动
    deleteList: '/marketing/luckyActivity/delete', //删除抽奖活动
    getInfo: '/marketing/luckyActivity/info', //抽奖活动详情
    uploadFile: '/marketing/luckActivityPrize/uploadFile', //上传文件到阿里云
    prizeInfo: '/marketing/luckActivityPrize/prizeInfo', //数据分析——奖品详情
    numberOfPeopleInfo: '/marketing/luckyActivity/numberOfPeopleInfo', //数据分析——人数详情
    customerInfo: '/marketing/luckyActivity/customerInfo', //数据分析——客户详情
    cancelAfterVerification: '/marketing/luckyActivity/cancelAfterVerification', //任务分析——奖品核销
}

export function cancelAfterVerification(parameter) {
    return request({
        url: ApiList.cancelAfterVerification,
        method: 'post',
        data: parameter,
    })
}

export function customerInfo(parameter) {
    return request({
        url: ApiList.customerInfo,
        method: 'get',
        params: parameter,
    })
}

export function numberOfPeopleInfo(parameter) {
    return request({
        url: ApiList.numberOfPeopleInfo,
        method: 'get',
        params: parameter,
    })
}

export function prizeInfo(parameter) {
    return request({
        url: ApiList.prizeInfo,
        method: 'get',
        params: parameter,
    })
}

export function uploadFile(parameter) {
    return request({
        url: ApiList.uploadFile,
        method: 'post',
        data: parameter,
    })
}

export function getInfo(parameter) {
    return request({
        url: ApiList.getInfo,
        method: 'get',
        params: parameter,
    })
}

export function getList(parameter) {
    return request({
        url: ApiList.getList,
        method: 'get',
        params: parameter,
    })
}

export function addSave(parameter) {
    return request({
        url: ApiList.addSave,
        method: 'post',
        data: parameter,
    })
}

export function deleteList(parameter) {
    return request({
        url: ApiList.deleteList,
        method: 'post',
        data: parameter,
    })
}

export function updateList(parameter) {
    return request({
        url: ApiList.updateList,
        method: 'post',
        data: parameter,
    })
}