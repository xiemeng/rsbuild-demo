/**
 *  上传附件控件
 * */

import { interactiveRadarAdd } from '@/api/customerConversion/dashboard'
import { channelCodeUploadFile } from '@/api/conversion'
export default {
  methods: {
    /***
     * params 上传图片到阿里云
     *  file 需要上传的文件
     *  path 上传的路径。招后台要
     */
    interactiveRadarUploadFile(file, path = this.uploadFilePath) {
      return new Promise((resolve, reject) => {
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('dir', path)
        channelCodeUploadFile(formdata).then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 上传文件到企业微信
    uploadMedia(list = this.attachments) {
      return new Promise((resolve, reject) => {
        const updateList =
          list?.map(item => {
            return new Promise((resolve, reject) => {
              if (item.type === 'link' && item.isRadar && !item.isMaterial) {
                this.interactiveRadarAdd(item).then(res => {
                  resolve(res)
                }).catch(error => {
                  reject(error)
                })
              } else if (item.type === 'img') {
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
    // 同步到雷达
    interactiveRadarAdd(data) {
      return new Promise((resolve, reject) => {
        this.getParamsLink(data).then(formdata => {
          interactiveRadarAdd(formdata)
            .then(res => {
              data.radarId = res.data.radarId
              data.url = res.data.radarLink + data.source
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
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
    // 修改时得到message参数
    getMessageList(list) {
      return list.map(item => {
        let msgContent = ''
        if (item.msgType === 0) {
          msgContent = item.msgContent
          item.formObj = {}
          item.pdfArr = []
          item.videoArr = []
        }
        if (item.msgType === 1) {
          msgContent = {
            compress: item.msgContent
          },
            item.imageObj = {
              title: '图片',
              prop: 'pic_url',
              type: 'img',
              tips: '',
              accept: '.jpg,.png',
              maxLength: 2097152,
              value: {
                compress: item.msgContent
              }
            }
          item.formObj = {}
          item.pdfArr = []
          item.videoArr = []
        }
        if (item.msgType === 2) {
          item.pdfArr = []
          item.videoArr = []
          const msgobj = JSON.parse(item.msgContent)
          msgContent = {
            form: {
              linkTitle: msgobj.title,
              desc: msgobj.desc,
              coverUrl: {
                compress: msgobj.picUrl
              },
              type: 'link',
              url: msgobj.url
            }
          }
          if (item.interactRadar) {
            msgContent.form.isRadar = true
            msgContent.form.behaviorNotify = Boolean(item.interactRadar.behaviorNotify)
            msgContent.form.activityNotify = Boolean(item.interactRadar.activityNotify)
            msgContent.form.isCustomerTag = item.interactRadar.tagRules?.length > 0
            msgContent.form.radarTitle = item.interactRadar.radarName
            msgContent.form.radarId = item.interactRadar.radarId
            msgContent.form.selectCustomerTagList = item.interactRadar.tagRules[0]?.customerTags?.map(item => {
              return {
                ...item,
                key: item.tagId,
              }
            })
            msgContent.form.isScoreRule = item.interactRadar.scoreRules?.length > 0
            msgContent.form.ruleDetails = item.interactRadar.scoreRules.map(item => {
              return {
                ...item,
                autoMarkTagBitmaps: item.autoMarkTagBitmaps, // 标签值
                selectTagList: item.customerTags?.map(item => {
                  return {
                    ...item,
                    key: item.tagId,
                  }
                }),
                hasTag: Boolean(item.hasTag), // 是否打上标签
                score: item.score, // 评分分数值
                ruleKind: item.ruleKind, // 打开方式
                count: item.count // 打开次数
              }
            })
          }
          console.log(msgContent)
        }
        if (item.msgType === 3) {
          const msgobj = JSON.parse(item.msgContent)
          item.pdfArr = [{
            ...msgobj,
            uid: '1',
            status: 'done',
          }]
          item.formObj = {}
          item.videoArr = []
          console.log(msgobj)
        }
        if (item.msgType === 4) {
          const msgobj = JSON.parse(item.msgContent)
          item.formObj = {
            ...msgobj,
            name: msgobj.title
          }
          item.pdfArr = []
          console.log(msgobj)
        }
        if (item.msgType === 5) {
          const msgobj = JSON.parse(item.msgContent)
          item.videoArr = [{
            ...msgobj,
          }]
          item.formObj = {}
          item.pdfArr = []
          console.log(msgobj)
        }
        return {
          ...item,
          msgContent: msgContent
        }
      })
    },
    // 得到添加-附件参数
    getPlanList(list) {
      return list.map(item => {
        return {
          ...item,
          messageList: this.getAddMessageList(item.messageList)
        }
      })
    },
    // 得到添加-附件参数2
    getAddMessageList(list) {
      return list.map(message => {
        console.log(message)
        let msgContent = ''
        if (message.msgType === 0) {
          msgContent = message.msgContent
        }
        if (message.msgType === 1) {
          msgContent = message.fileUrl || message.msgContent.compress
        }
        if (message.msgType === 2) {
          let picUrl = ''
          if (message.fileUrl) {
            picUrl = message.fileUrl
          } else if (message.msgContent.form.picurl) {
            picUrl = message.msgContent.form.picurl
          } else if (message.msgContent.form.coverUrl.compress) {
            picUrl = message.msgContent.form.coverUrl.compress
          }
          let radarId = message.msgContent.form.radarId || message.msgContent.form.interactRadar?.radarId
          if (radarId) {
            radarId = String(radarId)
          }
          msgContent = JSON.stringify({
            desc: message.msgContent.form.desc,
            picUrl: picUrl,
            url: message.msgContent.form.url,
            title: message.msgContent.form.linkTitle,
            radarId: radarId,
            type:
              message.msgContent.form.radarId || message.msgContent.form.interactRadar?.radarId
                ? 'radar_link'
                : 'normal_link'
          })
        }
        if (message.msgType === 3) {
          console.log(message)
          msgContent = JSON.stringify({
            pdfFile: message.pdfArr[0].fileUrl || message.pdfArr[0].pdfFile,
            name: message.pdfArr[0].name,
            size: message.pdfArr[0].size,
            cover: 'https://acadsocscrmpc.oss-cn-shenzhen.aliyuncs.com/h5/img/pdf.png'
          })
        }
        if (message.msgType === 4) {
          msgContent = JSON.stringify({
            cover: message.formObj.cover,
            desc: message.formObj.desc,
            title: message.formObj.name,
            url: message.formObj.link
          })
        }
        return {
          messageId: message.messageId,
          msgType: message.msgType,
          msgContent: msgContent
        }
      })
    },
    // 得到添加-需要上传的文件列表
    getPlanFileList(needUpdateList) {
      let promiseList = []
      if (needUpdateList.length > 0) {
        // 生成需要上传附件的数组
        promiseList = needUpdateList.map(item => {
          return new Promise((resolve, reject) => {
            // 链接
            if (item.msgType === 2) {
              // 同步到雷达
              if (item.msgContent.form.isRadar && item.msgContent.form.randerIsEdit) {
                this.interactiveRadarAdd(item.msgContent.form)
                  .then(res => {
                    item.radarId = res.data
                    resolve(res)
                  })
                  .catch(error => {
                    reject(error)
                  })
              } else if (item.msgContent.form.coverUrl.file) {
                this.interactiveRadarUploadFile(item.msgContent.form.coverUrl.file)
                  .then(res => {
                    item.fileUrl = res
                    resolve(res)
                  })
                  .catch(error => {
                    reject(error)
                  })
              } else {
                resolve()
              }
            } else if (item.msgType === 1 && item.msgContent.file) {
              console.log(item)
              this.interactiveRadarUploadFile(item.msgContent.file)
                .then(res => {
                  item.fileUrl = res
                  resolve(res)
                })
                .catch(error => {
                  reject(error)
                })
            } else if (item.msgType === 3 && item.pdfArr?.[0]?.originFileObj) {
              console.log(item)
              this.interactiveRadarUploadFile(item.pdfArr[0].originFileObj)
                .then(res => {
                  item.pdfArr[0].fileUrl = res
                  resolve(res)
                })
                .catch(error => {
                  reject(error)
                })
            } else if (item.msgType === 5 && item.videoArr?.[0]?.originFileObj) {
              this.interactiveRadarUploadFile(item.videoArr[0].originFileObj)
                .then(res => {
                  item.videoArr[0].fileUrl = res
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
      }
      return promiseList
    }
  },
}