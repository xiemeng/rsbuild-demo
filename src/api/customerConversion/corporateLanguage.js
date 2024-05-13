import request from '@/utils/request'

const conversionApi = {
    searchPage: '/client_transformation/speechInfo/page', // 查询话术库列表
    addPage: '/client_transformation/speechInfo/add', // 新增
    updatePage: '/client_transformation/speechInfo/update', // 修改话术库
    delSpeechInfo: '/client_transformation/speechInfo/delSpeechInfo', // 删除话术库
    downloadTemp: '/client_transformation/speechInfo/downloadTemp', // 下载话术库模板
    importSpeech: '/client_transformation/speechInfo/importSpeech', // 导入话术库模板

    speechGroup: '/client_transformation/speechGroup/list', // 查询分组列表
    addGroup: '/client_transformation/speechGroup/add', // 添加分组
    updateGroup: '/client_transformation/speechGroup/update', // 修改分组
    delGroup: '/client_transformation/speechGroup/delGroup', // 删除分组

    bar: '/client_transformation/speechteam/bar', // 查看团队话术库
    updateSpeechTeam: '/client_transformation/speechteam/updateSpeechTeam', // 新增/更新团队
    delSpeechTeam: '/client_transformation/speechteam/delSpeechTeam', // 删除话术库团队
    sidebarStatus: '/client_transformation/speechInfo/sidebarStatus', // 查询侧边栏开关
    setSidebarStatus: '/client_transformation/speechInfo/setSidebarStatus', // 查询侧边栏开关
}

export function sidebarStatus(parameter) {
    return request({
        url: conversionApi.sidebarStatus,
        method: 'get',
        params: parameter,
    })
}
export function setSidebarStatus(parameter) {
    return request({
        url: conversionApi.setSidebarStatus,
        method: 'get',
        params: parameter,
    })
}
export function searchPage(parameter) {
    return request({
        url: conversionApi.searchPage,
        method: 'get',
        params: parameter,
    })
}

export function addPage(parameter) {
    return request({
        url: conversionApi.addPage,
        method: 'post',
        data: parameter,
    })
}

export function updatePage(parameter) {
    return request({
        url: conversionApi.updatePage,
        method: 'post',
        data: parameter,
    })
}

export function delSpeechInfo(parameter) {
    return request({
        url: conversionApi.delSpeechInfo,
        method: 'post',
        params: parameter,
    })
}

export function downloadTemp() {
    window.open(PRD_VUE_APP_API_BASE_URL + conversionApi.downloadTemp, '_blank')
}

export function importSpeech(parameter) {
    return request({
        url: conversionApi.importSpeech,
        method: 'post',
        data: parameter,
    })
}

export function speechGroup(parameter) {
    return request({
        url: conversionApi.speechGroup,
        method: 'get',
        params: parameter,
    })
}

export function addGroup(parameter) {
    return request({
        url: conversionApi.addGroup,
        method: 'post',
        data: parameter,
    })
}

export function updateGroup(parameter) {
    return request({
        url: conversionApi.updateGroup,
        method: 'post',
        data: parameter,
    })
}

export function delGroup(parameter) {
    return request({
        url: conversionApi.delGroup,
        method: 'post',
        params: parameter,
    })
}

export function bar(parameter) {
    return request({
        url: conversionApi.bar,
        method: 'get',
        params: parameter,
    })
}

export function updateSpeechTeam(parameter) {
    return request({
        url: conversionApi.updateSpeechTeam,
        method: 'post',
        data: parameter,
    })
}

export function delSpeechTeam(parameter) {
    return request({
        url: conversionApi.delSpeechTeam,
        method: 'post',
        data: parameter,
    })
}