export const LOSS_STATUS = 'LOSS_STATUS' // 流失状态
export const GROUP_STATUS = 'GROUP_STATUS' // 群聊状态
export const ORDER_WAY = 'ORDER_WAY' // 排序方式
export const ORDER_CONDITION = 'ORDER_CONDITION' // 排序条件
export const ADD_WAY = 'ADD_WAY' // 添加渠道
export const GENDER = 'GENDER' // 性别
export const CUSTOMER_STATUS = 'CUSTOMER_STATUS' //客户状态

export const ADD_STATUS = { // 添加状态
    0: '待分配',
    1: '待添加',
    2: '待通过',
    3: '已添加',
    4: '导入中'
}
export const CYCLE = { // 添加状态
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日',
}
export const INFO_SEND_STATUS = [
    { text: '未发送', color: '#ffc2c2', id: 0 },
    { text: '已发送', color: '', id: 1 },
    { text: '已不是好友', color: '#ffd4b6', id: 2 },
    { text: '客户接收达上限', color: '#fbe8ae', id: 3 },
    { text: '本月消息已经达到上限', color: '', id: 4 },
]
export const GROUP_SEND_STATUS = [
    { text: '未发送', color: '#ffc2c2', id: 0 },
    { text: '已发送', color: '', id: 2 },
    { text: '没有群发任务', color: '', id: 4 },
]
export const CUSTOM_TYPE = { // 用户类型
    1: '微信',
    2: '企业微信'
}
export const SEND_TIME_ENUM = [
    { id: 'immediately', value: '立即发送' },
    { id: 'timing', value: '定时发送' }
]
export const ADD_WAY_LIST = {
        0: '渠道码',
        1: '区域扫码',
        2: '自动拉群',
        3: '一客一码',
        4: '加好友',
        5: '通过群码拉群'
    }
    // 群聊状态
export const GROUP_CHAT_STATUS = {
        0: { text: '拉人中', color: 'green' },
        1: { text: '未开始', color: '' },
        2: { text: '已达上限', color: 'orange' },
        3: { text: '已停用', color: 'red' },
    }
    // 任务状态
export const TASK_STATUS = {
    0: { text: '创建失败', color: 'green', id: 0, },
    1: { text: '待发送', color: 'rgba(34,34,34,.85)', id: 1 },
    2: { text: '已发送', color: 'rgba(34,34,34,.85)', id: 2 },
    3: { text: '已取消', color: 'rgba(34,34,34,.85)', id: 3 },
    4: { text: '提醒发送', color: '#1890ff', id: 4 },
}
export const MATERIAL_LIST = [{
        text: '文章',
        id: '0',
        format: ''
    },
    {
        text: '链接',
        id: '1',
    },
    {
        text: '海报',
        id: '2',
        max: 2,
        format: '.bmp,.jpg,.jpeg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp',
        tips: '请上传png、jpg格式不超过2M的文件'
    },
    {
        text: '视频',
        id: '7',
        max: 200000,
        format: '.MP4',
        tips: '请上传格式为MP4的视频文件'
    },
    {
        text: 'PDF',
        id: '3',
        max: 20,
        format: '.pdf',
        icon: '/icons/pdf.png',
        tips: '请上传PDF格式不超过20M的文件'
    },
    {
        text: 'PPT',
        id: '4',
        max: 20,
        format: '.pptx,.ppt,.pps',
        icon: '/icons/ppt.svg',
        tips: '请上传PPT格式不超过20M的文件'
    },
    {
        text: '表格',
        id: '5',
        max: 20,
        format: '.xlsx,.xls,.csv',
        icon: '/icons/excel.svg',
        tips: '请上传csv、xlsx格式不超过20M的文件'
    },
    {
        text: '文档',
        id: '6',
        max: 20,
        format: '.txt,.doc,.docx',
        icon: '/icons/word.svg',
        tips: '请上传doc、txt.docx格式不超过20M的文件'
    }
]

export default {
    LOSS_STATUS,
    ADD_WAY,
    GENDER,
    CUSTOMER_STATUS
}