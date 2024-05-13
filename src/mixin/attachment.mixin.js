/**
 *  上传附件控件
 * */

import { interactiveRadarAdd } from '@/api/customerConversion/dashboard'
import { interactiveRadarUploadFile, channelCodeUploadFile } from '@/api/conversion'
export default {
  methods: {
    // 添加附件
    addAccessory(attachments) {
      this.attachments = attachments
    },
    // 上传文件到企业微信
    uploadMedia(list) {
      const attachments = list || this.attachments
      return new Promise((resolve, reject) => {
        const updateList =
          attachments?.map(item => {
            return new Promise((resolve, reject) => {
              if (item.type === 'link') {
                this.interactiveRadarAdd(item).then(res => {
                  resolve(res)
                })
              } else if (item.type === 'img' && item.pic_url.file) {
                const formdata = new FormData()
                formdata.append('file', item.pic_url.file)
                formdata.append('dir', 'clientTransformation')
                formdata.append('type', 'image')
                channelCodeUploadFile(formdata).then(res => {
                  item.pic_url.fileUrl = res.data.fileUrl
                  item.pic_url.mediaId = res.data.mediaId
                  resolve(res.data)
                })
              } else {
                resolve()
              }
            })
          }) || []
        Promise.all(updateList)
          .then(res => {
            resolve()
          })
          .catch(error => {
            this.$message.error(error || error.message)
            this.loading = false
            reject(error)
          })
      })
    },
    channelCodeUploadFileFun(list) {
      const attachments = list || this.attachments
      return new Promise((resolve, reject) => {
        const updateList =
          attachments?.map(item => {
            return new Promise((resolve, reject) => {
              if (item.type === 'link') {
                this.interactiveRadarAdd(item).then(res => {
                  resolve(res)
                })
              } else if (item.type === 'img' && item.pic_url.file) {
                const formdata = new FormData()
                formdata.append('file', item.pic_url.file)
                channelCodeUploadFile(formdata).then(res => {
                  item.pic_url.fileUrl = res.data.fileUrl
                  item.pic_url.mediaId = res.data.mediaId
                  resolve(res.data)
                })
              } else {
                resolve()
              }
            })
          }) || []
        Promise.all(updateList)
          .then(res => {
            resolve()
          })
          .catch(error => {
            this.$message.error(error || error.message)
            this.loading = false
            reject(error)
          })
      })
    },
    // 得到 attachments 请求参数
    getAttachments(list) {
      console.log(list, this.attachments)
      const attachments = list || this.attachments
      return attachments?.map(item => {
        console.log(item)
        if (item.type === 'img') {
          return {
            msgtype: 'image',
            image: {
              media_id: item.pic_url.mediaId,
              pic_url: item.pic_url.fileUrl || item.pic_url.compress,
              title: item.title
            }
          }
        }
        if (item.type === 'link') {
          // 判断类型
          let type = 'normal_link'
          if (item.linktype) {
            type = item.linktype
          } else if (item.radarId) {
            type = 'radar_link'
          }
          let radarId = item.radarId || item.formId || item.id
          if (radarId) {
            radarId = String(radarId)
          }
          return {
            msgtype: 'link',
            link: {
              title: item.linkTitle,
              picurl: item.picurl || item.coverUrl.compress,
              desc: item.desc,
              url: item.url || item.link || item.activityLink,
              radarId: radarId,
              type: type, // / 普通链接：normal_link,雷达链接：radar_link,表单链接：form_link,：抽奖链接：luck_link,红包链接 red_package_link
            }
          }
        }
      })
    },
    // 同步到雷达
    interactiveRadarAdd(data) {
      return new Promise((resolve, reject) => {
        this.getParamsLink(data).then(formdata => {
          if (data.isRadar && data.randerIsEdit) {
            interactiveRadarAdd(formdata)
              .then(res => {
                data.radarId = res.data.radarId
                data.url = res.data.radarLink + data.source
                resolve(res)
              })
              .catch(error => {
                reject(error)
              })
          } else {
            resolve()
          }
        })
      })
    },
    // 得到雷达请求参数
    getParamsLink(data) {
      return new Promise((resolve, reject) => {
        // 上传图片到阿里云
        const formdata = new FormData()
        const tagRule = data.isCustomerTag
          ? [
            {
              autoMarkTagBitmaps: data.selectCustomerTagList.map(item => item.bitmap).join(',')
            }
          ]
          : []
        formdata.append('type', 1)
        formdata.append('radarName', data.linkTitle)
        formdata.append('link', data.url)
        formdata.append('activityNotify', Number(data.activityNotify))
        formdata.append('behaviorNotify', Number(data.behaviorNotify))
        formdata.append('tagRule', JSON.stringify(tagRule))
        formdata.append('title', data.radarTitle)
        formdata.append('desc', data.desc)
        formdata.append('hasCustomerTag', Number(data.isCustomerTag))
        // 如果设置了评分
        if (data.isScoreRule) {
          const scoreRule = JSON.stringify(
            data.ruleDetails.map(item => {
              return {
                autoMarkTagBitmaps: item.selectTagList?.map(item => item.bitmap)?.join(','), // 标签值
                hasTag: Number(item.hasTag),
                score: item.score,
                ruleKind: item.ruleKind,
                count: item.count || 0
              }
            })
          )
          formdata.append('scoreRule', scoreRule)
        }
        if (data.coverUrl.file) {
          const formdataUpload = new FormData()
          formdataUpload.append('file', data.coverUrl.file)
          formdataUpload.append('dir', 'clientTransformation')
          interactiveRadarUploadFile(formdataUpload)
            .then(res => {
              formdata.append('coverUrl', res.data)
              data.picurl = res.data
              resolve(formdata)
            })
            .catch(error => {
              reject(error)
            })
        } else {
          resolve(formdata)
        }
      })
    },
    // 详情得到attachments列表
    attachmentsDetail(attachments) {
      return attachments?.map(item => {
        console.log(item)
        let typeText = '',
          key = '',
          pic_url = '',
          type = '',
          coverUrl = {}
        if (item.msgtype === 'image') {
          typeText = '图文'
          key = 'visibileAddImg'
          type = 'img'
          pic_url = {
            compress: item.image.pic_url
          }
        }
        if (item.msgtype === 'link') {
          type = 'link'
          item.linktype = item.link.type
          // 雷达链接
          if (item.linktype === 'radar_link' || item.linktype === 'normal_link') {
            key = 'visibileAddLink'
            typeText = '链接'
          }
          // 自定义表单链接
          if (item.linktype === 'form_link') {
            key = 'visibileForm'
            typeText = '自定义表单'
          }
          // 抽奖链接
          if (item.linktype === 'luck_link') {
            key = 'visibileLuckDraw'
            typeText = '抽奖活动'
          }

          coverUrl = {
            compress: item.link.picurl
          }
          item.linkTitle = item.link.title
          item.desc = item.link.desc
          item.url = item.link.url
          if (item.link.interactRadar) {
            item.isRadar = true
            item.behaviorNotify = Boolean(item.link.interactRadar.behaviorNotify)
            item.activityNotify = Boolean(item.link.interactRadar.activityNotify)
            item.isCustomerTag = item.link.interactRadar.tagRules?.length > 0
            item.radarId = item.link.interactRadar?.radarId
            item.radarTitle = item.link.title
            item.selectCustomerTagList = item.link.interactRadar.tagRules[0]?.customerTags?.map(item => {
              return {
                ...item,
                key: item.tagId
              }
            })
            item.isScoreRule = item.link.interactRadar.scoreRules?.length > 0
            item.ruleDetails = item.link.interactRadar.scoreRules.map(item => {
              return {
                ...item,
                autoMarkTagBitmaps: item.autoMarkTagBitmaps, // 标签值
                selectTagList: item.customerTags?.map(item => {
                  return {
                    ...item,
                    key: item.tagId
                  }
                }),
                hasTag: Boolean(item.hasTag), // 是否打上标签
                score: item.score, // 评分分数值
                ruleKind: item.ruleKind, // 打开方式
                count: item.count // 打开次数
              }
            })
          }
        }
        return {
          ...item,
          key: key,
          pic_url,
          type,
          coverUrl,
          typeText: typeText
        }
      })
    }
  },
  computed: {
    state() {
      return this.$route.query.state
    },
    isAddText() {
      return this.$route.query.state === 'add' ? '新建' : '修改'
    },
    textList() {
      const arr = []
      if (this.messageOne) {
        arr.push(this.messageOne)
      }
      if (this.attachments) {
        arr.push(...this.attachments)
      }
      return arr
    }
  },
}