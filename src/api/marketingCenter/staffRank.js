import request from '@/utils/request'

const apiList = {
    staffRankSave: '/marketing/rankingactivity/save', //创建排行榜活动
    staffRankDelete: '/marketing/rankingactivity/delete', //删除排行榜活动
    staffRankUpdate: '/marketing/rankingactivity/update', //更新排行榜活动
    staffRankInfo: '/marketing/rankingactivity/info/', //查询排行榜活动详情
    staffRankList: '/marketing/rankingactivity/list', //批量查询排行榜活动
    getactivitymemberrank: '/marketing/rankingactivitymember/getactivitymemberrank', //排行榜TOP10
    getuserids: '/marketing/rankingactivitymember/rankingByStaff', //客户统计-根据成员查看
    rankingByDate: '/marketing/rankingactivitymember/rankingByDate', //客户统计-根据日期查看
    rankingByCustomer: '/marketing/rankingactivitymember/rankingByCustomer', //客户统计-根据客户查看
    rankingByGroup: '/marketing/rankingactivitymember/rankingByGroup', //客户统计-根据群聊查看
}

export function rankingByCustomer(parameter) {
    return request({
        url: apiList.rankingByCustomer,
        method: 'post',
        data: parameter,
    })
}

export function rankingByGroup(parameter) {
    return request({
        url: apiList.rankingByGroup,
        method: 'post',
        data: parameter,
    })
}

export function rankingByDate(parameter) {
    return request({
        url: apiList.rankingByDate,
        method: 'post',
        data: parameter,
    })
}

export function getuserids(parameter) {
    return request({
        url: apiList.getuserids,
        method: 'post',
        data: parameter,
    })
}

export function getactivitymemberrank(parameter) {
    return request({
        url: apiList.getactivitymemberrank,
        method: 'post',
        data: parameter,
    })
}

export function staffRankList(parameter) {
    return request({
        url: apiList.staffRankList,
        method: 'post',
        data: parameter,
    })
}

export function staffRankInfo(parameter) {
    return request({
        url: apiList.staffRankInfo + parameter,
        method: 'get',
    })
}

export function staffRankUpdate(parameter) {
    return request({
        url: apiList.staffRankUpdate,
        method: 'post',
        data: parameter,
    })
}

export function staffRankSave(parameter) {
    return request({
        url: apiList.staffRankSave,
        method: 'post',
        data: parameter,
    })
}

export function staffRankDelete(parameter) {
    return request({
        url: apiList.staffRankDelete,
        method: 'post',
        data: parameter,
    })
}