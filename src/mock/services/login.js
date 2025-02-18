import Mock from 'mockjs2'
import { builder } from '../util'

export const verify = (option) => {
  const result = {
    id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb3JwIjoid3dlNmI2ZDk5ODE4ODA1YzliIiwiaXNzIjoiYXV0aDAiLCJzdGFmZk5hbWUiOiJ0ZWQiLCJ1dWlkIjoiMjViZjczNWFkMzRhNGVlODliOGY0Zjc0MmI1ZDk3MmQiLCJzdGFmZklkIjoiMTA1NCJ9.IIlLIkY6lqkjOBS-0LTd06fby9JdsvOkUI4h5Ve7J2Q',
    corpId: 'ww9dad977ce79a52d9',
  }
  return builder(result)
}
export const admin = (option) => {
  const result = {
    permission: [{
      id: '12',
      pid: '0',
      name: 'GetDouyin',
      title: '抖音管理',
      children: [{
        id: '1211',
        pid: '12',
        name: 'dyAccount',
        title: '抖音账号',
        children: null,
      },
      {
        id: '1219',
        pid: '12',
        name: 'MassiveCreativity',
        title: '创意视频',
        children: null,
      },
      {
        id: '1220',
        pid: '12',
        name: 'CollectCreativity',
        title: '收藏视频',
        children: null,
      },
      {
        id: '1212',
        pid: '12',
        name: 'VideoList',
        title: '抖音视频列表',
        children: null,
      },
      {
        id: '1213',
        pid: '12',
        name: 'DyData',
        title: '抖音归属人数据统计',
        children: null,
      },
      {
        id: '1214',
        pid: '12',
        name: 'DyIntelligent',
        title: '抖音达人列表',
        children: null,
      },
      ],
    },
    {
      id: '1299',
      pid: '0',
      name: 'ChatGPT',
      title: 'ChatGPT',
      children: [{
        id: '121199',
        pid: '1299',
        name: 'GPT3',
        title: 'GPT3.5',
        children: null,
      },
      {
        id: '121999',
        pid: '1299',
        name: 'GPT4',
        title: 'GPT4',
        children: null,
      },
      ],
    },
    {
      id: '12',
      pid: '0',
      name: 'GetKs',
      title: '快手管理',
      children: [{
        id: '1211',
        pid: '12',
        name: 'ksAccount',
        title: '快手账号',
        children: null,
      }, {
        id: '12114',
        pid: '12',
        name: 'ksADouyinvideo',
        title: '作品列表',
        children: null,
      },],
    },
    {
      id: '12',
      pid: '0',
      name: 'Getbz',
      title: 'B站管理',
      children: [{
        id: '1211',
        pid: '12',
        name: 'bzAccount',
        title: 'B站账号',
        children: null,
      }, {
        id: '121143',
        pid: '12',
        name: 'bzDouyinvideo',
        title: '作品列表',
        children: null,
      },],
    },
    {
      id: '1266',
      pid: '0',
      name: 'pushManagement',
      title: '推送管理',
      children: [{
        id: '121166',
        pid: '1266',
        name: 'pushList',
        title: '推送列表',
        children: null,
      }, {
        id: '12114366',
        pid: '1266',
        name: 'pushDataStatistics',
        title: '数据统计',
        children: null,
      },],
    },
    {
      id: '12',
      pid: '0',
      name: 'Getxrs',
      title: '小红书管理',
      children: [{
        id: '1211',
        pid: '12',
        name: 'xhsAccount',
        title: '小红书账号',
        children: null,
      },
      {
        id: '12113',
        pid: '12',
        name: 'xhsDouyinvideo',
        title: '小红书账号列表账号',
        children: null,
      },
      ],
    },
    {
      id: '812',
      pid: '0',
      name: 'acadsoc',
      title: '阿卡索内容管理',
      children: [{
        id: '81211',
        pid: '812',
        name: 'contentManagement',
        title: '作品列表',
        children: null,
      },],
    },
    {
      id: '13',
      pid: '0',
      name: 'GetTx',
      title: '视频号管理',
      children: [{
        id: '12113',
        pid: '13',
        name: 'txAccount',
        title: '抖音账号',
        children: null,
      },
      {
        id: '12194',
        pid: '13',
        name: 'txMassiveCreativity',
        title: '创意视频',
        children: null,
      },
      {
        id: '12205',
        pid: '13',
        name: 'txCollectCreativity',
        title: '收藏视频',
        children: null,
      },
      {
        id: '12126',
        pid: '13',
        name: 'txVideoList',
        title: '抖音视频列表',
        children: null,
      },
      {
        id: '12137',
        pid: '13',
        name: 'txData',
        title: '抖音归属人数据统计',
        children: null,
      },
      {
        id: '12148',
        pid: '13',
        name: 'txIntelligent',
        title: '抖音达人列表',
        children: null,
      },
      ],
    },
    {
      id: '1',
      pid: '0',
      name: 'GetCilent',
      title: '引流获客',
      children: [{
        id: '100',
        pid: '1',
        name: 'ChannelCode',
        title: '渠道活码',
        children: null,
      },
      {
        id: '101',
        pid: '1',
        name: 'BatchFriend',
        title: '批量加好友',
        children: null,
      },
      ],
    },
    {
      id: '99',
      pid: '0',
      name: 'Live',
      title: '直播管理',
      children: [{
        id: '100',
        pid: '1',
        name: 'LiveData',
        title: '直播统计',
        children: null,
      },
      {
        id: '101',
        pid: '1',
        name: 'Goods',
        title: '商品管理',
        children: null,
      },
      {
        id: '101',
        pid: '1',
        name: 'Orders',
        title: '订单管理',
        children: null,
      },
      ],
    },
    {
      id: '2',
      pid: '0',
      name: 'BusinessAdmin',
      title: '企业管理',
      children: [{
        id: '200',
        pid: '2',
        name: 'Member',
        title: '成员管理',
        children: null,
      },
      {
        id: '201',
        pid: '2',
        name: 'Jurisdiction',
        title: '权限管理',
        children: null,
      },
      {
        id: '202',
        pid: '2',
        name: 'Information',
        title: '账户信息',
        children: null,
      },
      {
        id: '203',
        pid: '2',
        name: 'LogOperation',
        title: '操作日志',
        children: null,
      },
      ],
    },
    {
      id: '3',
      pid: '0',
      name: 'corporateRiskControl',
      title: '企业风控',
      children: [{
        id: '300',
        pid: '3',
        name: 'news',
        title: '消息存档',
        children: null,
      },
      {
        id: '301',
        pid: '3',
        name: 'violationReminder',
        title: '违规提醒',
        children: null,
      },
      {
        id: '302',
        pid: '3',
        name: 'deleteReminder',
        title: '删人提醒',
        children: null,
      },
      ],
    },
    {
      id: '4',
      pid: '0',
      name: 'CustomerService',
      title: '客户管理',
      children: [{
        id: '400',
        pid: '4',
        name: 'CustomerList',
        title: '客户管理',
        children: null,
      },
      {
        id: '401',
        pid: '4',
        name: 'CustomerTages',
        title: '标签管理',
        children: null,
      },
      {
        id: '4011',
        pid: '4',
        name: 'BatchAddCustomers',
        title: '批量加客户',
        children: null,
      },
      {
        id: '402',
        pid: '4',
        name: 'remind',
        title: '流失提醒',
        children: null,
      },
      {
        id: '403',
        pid: '4',
        name: 'transfer',
        title: '客户迁移',
        children: null,
      },
      {
        id: '403',
        pid: '4',
        name: 'Blacklist',
        title: '黑名单',
        children: null,
      },
      {
        id: '404',
        pid: '4',
        name: 'setting',
        title: '自定义信息',
        children: null,
      },
      ],
    },
    {
      id: '5',
      pid: '0',
      name: 'CustomerConversion',
      title: '客户转化',
      children: [{
        id: '500',
        pid: '5',
        name: 'CustomerGroup',
        title: '客户群发',
        children: null,
      },
      {
        id: '500',
        pid: '5',
        name: 'LiveData',
        title: '直播统计',
        children: null,
      },
      {
        id: '500',
        pid: '5',
        name: 'Goods',
        title: '商品管理',
        children: null,
      },
      {
        id: '501',
        pid: '5',
        name: 'Material',
        title: '企业素材库',
        children: null,
      },
      {
        id: '502',
        pid: '5',
        name: 'AutomaticMakeTag',
        title: '自动打标签',
        children: null,
      },
      {
        id: '503',
        pid: '5',
        name: 'WelcomeFriend',
        title: '好友欢迎语',
        children: null,
      },
      {
        id: '504',
        pid: '5',
        name: 'CorporateLanguage',
        title: '企业话术库',
        children: null,
      },
      {
        id: '504',
        pid: '5',
        name: 'FormTable',
        title: '自定义表单',
        children: null,
      },
      {
        id: '505',
        pid: '5',
        name: 'PersonSOP',
        title: '个人SOP',
        children: null,
      },
      {
        id: '505',
        pid: '5',
        name: 'Dashboard',
        title: '互动雷达',
        children: null,
      },
      {
        id: '506',
        pid: '5',
        name: 'PersonalMaterial',
        title: '个人素材库',
        children: null,
      },
      {
        id: '506',
        pid: '5',
        name: 'Management',
        title: '客户阶段管理',
        children: null,
      },
      ],
    },
    {
      id: '6',
      pid: '0',
      name: 'ClientBaseOperation',
      title: '客户群运营',
      children: [{
        id: '601',
        pid: '6',
        name: 'GroupList',
        title: '客户群管理',
        children: null,
      },
      {
        id: '602',
        pid: '6',
        name: 'GroupTages',
        title: '客户群标签',
        children: null,
      },
      {
        id: '603',
        pid: '6',
        name: 'GroupChatInspection',
        title: '群聊质检',
        children: null,
      },
      {
        id: '604',
        pid: '6',
        name: 'GroupSOP',
        title: '群SOP',
        children: null,
      },
      {
        id: '605',
        pid: '6',
        name: 'AutoPullGroup',
        title: '自动拉群',
        children: null,
      },
      {
        id: '606',
        pid: '6',
        name: 'InfiniteGroup',
        title: '无限拉群',
        children: null,
      },
      {
        id: '607',
        pid: '6',
        name: 'labelGroup',
        title: '标签建群',
        children: null,
      },
      {
        id: '608',
        pid: '6',
        name: 'GroupWelcome',
        title: '入群欢迎语',
        children: null,
      },
      {
        id: '609',
        pid: '6',
        name: 'GroupCalendar',
        title: '群日历',
        children: null,
      },
      ],
    },
    {
      id: '7',
      pid: '0',
      name: 'FriendsCircle',
      title: '朋友圈运营',
      children: [{
        id: '701',
        pid: '7',
        name: 'HistoryCircle',
        title: '历史朋友圈',
        children: null,
      },
      {
        id: '702',
        pid: '7',
        name: 'EnterpriseCircle',
        title: '企业朋友圈',
        children: null,
      },
      ],
    },
    {
      id: '8',
      pid: '0',
      name: 'MarketingCenter',
      title: '营销中心',
      children: [{
        id: '801',
        pid: '8',
        name: 'TaskTreasure',
        title: '企微任务宝',
        children: null,
      },
      {
        id: '803',
        pid: '8',
        name: 'LuckyDraw',
        title: '抽奖活动',
        children: null,
      },
      {
        id: '803',
        pid: '8',
        name: 'AuthorizationManagement',
        title: '授权管理',
        children: null,
      },
      {
        id: '8031',
        pid: '8',
        name: 'fissionPoster',
        title: '裂变海报',
        children: null,
      },
      {
        id: '803',
        pid: '8',
        name: 'OKRManagement',
        title: 'OKR管理',
        children: null,
      },
      {
        id: '803',
        pid: '8',
        name: 'Jira',
        title: 'jira管理',
        children: null,
      },
      {
        id: '803',
        pid: '8',
        name: 'Tencent',
        title: '腾讯文档管理',
        children: null,
      },
      {
        id: '803',
        pid: '8',
        name: 'ViewOkr',
        title: '查看okr',
        children: null,
      },
      {
        id: '802',
        pid: '8',
        name: 'newActivity',
        title: '创建活动',
        children: null,
      },
      {
        id: '808',
        pid: '8',
        name: 'StaffRank',
        title: '拉新排行榜',
        children: null,
      },
      {
        id: '809',
        pid: '8',
        name: 'CustomerPoints',
        title: '客户积分',
        children: null,
      },
      ],
    },
    {
      id: '9',
      pid: '0',
      name: 'ServiceSupport',
      title: '服务支持',
      children: [{
        id: '901',
        pid: '9',
        name: 'WxCustomerService',
        title: '微信客服',
        children: null,
      },
      {
        id: '901',
        pid: '9',
        name: 'QualityServe',
        title: '客服质检',
        children: null,
      },
      {
        id: '901',
        pid: '9',
        name: 'Chatroom',
        title: '聊天室',
        children: null,
      },
      {
        id: '901',
        pid: '9',
        name: 'orders',
        title: '订单管理',
        children: null,
      },
      {
        id: '9011',
        pid: '9',
        name: 'videoID',
        title: '视频号',
        children: null,
      },
      ],
    },
    ],
    kefu: true,
    zhibo: false,
    zhifu: false,
    user: {
      staffId: 'ted',
      userid: 'ChenTao',
      status: 1,
      name: '谢孟',
      alias: '',
      gender: null,
      mobile: '18649619427',
      telephone: '',
      email: '',
      avatar: 'http://wework.qpic.cn/bizmail/0Jw22tZ15JpicIEnpyvkJgJPEEgjAh6GyeI4bCMVHJwG0EpGRJCCkuw/0',
      thumbAvatar: 'http://wework.qpic.cn/bizmail/0Jw22tZ15JpicIEnpyvkJgJPEEgjAh6GyeI4bCMVHJwG0EpGRJCCkuw/100',
      address: null,
      roleId: null,
      qrCode: 'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vc6fc979ce4cf4645d',
      mainWebsite: null,
      zoneWebsite: null,
      qwResponseJson: "{'errcode':0,'errmsg':'ok','userid':'MengLuoHongChen','name':'谢孟','department':[1,2,4,3],'position':'','mobile':'18649619427','gender':'1','email':'','avatar':'http://wework.qpic.cn/bizmail/0Jw22tZ15JpicIEnpyvkJgJPEEgjAh6GyeI4bCMVHJwG0EpGRJCCkuw/0','status':1,'isleader':0,'extattr':{'attrs':[]},'telephone':'','enable':1,'hide_mobile':0,'order':[0,0,0,0],'main_department':3,'qr_code':'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=vc6fc979ce4cf4645d','alias':'','is_leader_in_dept':[0,0,0,0],'thumb_avatar':'http://wework.qpic.cn/bizmail/0Jw22tZ15JpicIEnpyvkJgJPEEgjAh6GyeI4bCMVHJwG0EpGRJCCkuw/100'}",
      creatorId: null,
      creatorName: null,
      createTime: null,
      updaterId: null,
      updaterName: null,
      updateTime: '2021-06-04 18:47:40',
      isDeleted: 0,
    },
  }
  return builder(result)
}

Mock.mock(/\/api\/way\/authority\/login\/verify/, 'get', verify)
Mock.mock(/\/api\/way\/authority\/login\/admin/, 'get', admin)