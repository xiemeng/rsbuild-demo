<template>
  <div>
    <ul>
      <li class="send-content" v-for="(item, index) in sendContentList" :key="index">
        <span v-if="needTitle">消息{{ index + 1 }}：</span>
        <div class="flex1">
          <p class="radio">
            <a-radio-group v-model="item.msgType" @change="changeType(index)">
              <a-radio :value="item.id" v-for="(item, index) in msgTypeList" :key="index">
                {{ item.text }}
              </a-radio>
            </a-radio-group>
            <a-icon type="delete" v-if="index !== 0" @click="$emit('delContent', index)" />
          </p>
          <!-- 文字 -->
          <div v-if="item.msgType === 0" class="textarea-wrap">
            <a-textarea
              v-model="item.msgContent"
              class="textarea"
              :maxLength="item.maxLength || 400"
              placeholder="请输入内容"
              :autoSize="{ minRows: 4, maxRows: 4 }"
            ></a-textarea>
            <p class="statistics font-color-black-25" v-if="item.maxLength">
              {{ item.msgContent.length }}/{{ item.maxLength }}
            </p>
          </div>
          <!-- 图片 -->
          <div v-if="item.msgType === 1">
            <FormList :formInfo="item.imageObj" class="input" v-model="item.msgContent"></FormList>
          </div>
          <!-- 链接 -->
          <div v-if="item.msgType === 2">
            <AddLinkWrap
              v-model="item.msgContent"
              :editData="item.msgContent.form"
              :isNeedSelectRadar="isNeedSelectRadar"
              :source="source"
              :isNeedRader="isNeedRader"
            ></AddLinkWrap>
          </div>
          <!-- PDF -->
          <div v-if="item.msgType === 3" class="flex-pdf">
            <AccessoryList :item="item" v-if="item.pdfArr[0]"></AccessoryList>
            <div class="flex-pdf">
              <a-upload
                @change="handleChange"
                :file-list="item.pdfArr"
                :showUploadList="false"
                :accept="acceptPdf"
                :customRequest="customRequest"
              >
                <div class="ant-upload" v-if="!item.pdfArr[0]">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    添加pdf
                  </div>
                </div>
                <a-button type="link" v-else>重新上传</a-button>
              </a-upload>
              <span class="font-color-black-25" style="margin-left:10px;">请在20M以内</span>
            </div>
          </div>
          <!-- 自定义表单 -->
          <div v-if="item.msgType === 4" class="flex-box">
            <AccessoryList :item="item" v-if="item.formObj.name"></AccessoryList>
            <div>
              <a-button type="link" @click="visibileForm = true" v-if="item.formObj.name">重新选择</a-button>
              <div class="ant-upload" @click="visibileForm = true" v-else>
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  选择素材
                </div>
              </div>
            </div>
          </div>
          <!-- 视频 -->
          <div v-if="item.msgType === 5" class="flex-pdf">
            <AccessoryList :item="item" v-if="item.videoArr[0]"></AccessoryList>
            <div class="flex-pdf">
              <a-upload
                @change="handleChangeVideo"
                @preview="handlePreview"
                :showUploadList="false"
                :accept="acceptVideo"
                :customRequest="customRequest"
              >
                <div class="ant-upload" v-if="!item.videoArr[0]">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传视频
                  </div>
                </div>
                <a-button type="link" v-else>重新上传</a-button>
              </a-upload>
              <span class="font-color-black-25" style="margin-left:10px;">请在10M以内</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 自定义表单 -->
    <a-modal v-model="visibileForm" :footer="null" destroyOnClose width="880px" centered>
      <AddForm @cancle="visibileForm = false" @serviceOk="serviceOk" :editData="editData" :source="source"></AddForm>
    </a-modal>
  </div>
</template>

<script>
import FormList from './FormList'
import AddLinkWrap from './AddLinkWrap'
import AddForm from './AddForm'
import AccessoryList from './AccessoryList'

export default {
  name: 'TypeAccessory',
  components: { FormList, AddLinkWrap, AddForm, AccessoryList },
  props: {
    // 传进来的数据
    sendContentList: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否需要标题
    needTitle: {
      type: Boolean,
      default() {
        return true
      }
    },
    // 数据类型
    msgTypeList: {
      type: Array,
      default() {
        return []
      }
    },
    // 来源
    source: {
      type: String,
      default: ''
    },
    // 是否需要雷达
    isNeedRader: {
      type: Boolean,
      default: true
    },
    // 是否需要雷达
    isNeedSelectRadar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      acceptPdf: '.pdf',
      acceptVideo: '.MP4',
      visibileForm: false,
      editData: {},
      formObj: {}
    }
  },
  watch: {
    sendContentList() {
      console.log(this.sendContentList)
    }
  },
  created() {
    console.log(this.sendContentList)
  },
  methods: {
    changeType(index) {
      this.sendContentList[index].msgContent = ''
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj)
      }
      const videoObj = this.sendContentList.find(item => item.msgType === 5)
      videoObj.videoArr[0].pdfFile = file.url || file.preview
      console.log(file)
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    handleChange({ fileList }) {
      console.log(fileList)
      const newFileList = fileList.slice(-1)
      if (newFileList?.[0]?.size > 20480000) {
        this.$message.warning('pdf不能大于20M')
        return
      }
      // 需要异步延迟一下
      setTimeout(() => {
        const pdfObj = this.sendContentList.find(item => item.msgType === 3)
        pdfObj.pdfArr = newFileList.map(item => {
          return {
            ...item,
            status: 'done',
            msgType: 3
          }
        })
      }, 0)
    },
    handleChangeVideo({ fileList }) {
      console.log(fileList)
      const newFileList = fileList.slice(-1)
      if (newFileList?.[0]?.size > 10240000) {
        this.$message.warning('视频不能大于10M')
        return
      }
      // 需要异步延迟一下
      setTimeout(() => {
        this.getBase64(newFileList[0].originFileObj).then(res => {
          console.log(res)
          const videoObj = this.sendContentList.find(item => item.msgType === 5)
          videoObj.videoArr = newFileList.map(item => {
            return {
              ...item,
              status: 'done',
              msgType: 5,
              pdfFile: res
            }
          })
        })
      }, 0)
    },
    customRequest(file) {
      file.onSuccess() //上传成功
    },
    serviceOk(value) {
      const findObj = this.sendContentList.find(item => item.msgType === 4)
      findObj.formObj = {
        ...value,
        msgType: 4
      }
      this.visibileForm = false
    }
  }
}
</script>

<style lang="less" scoped>
.send-content {
  display: flex;
  padding-bottom: 10px;
  line-height: 22px;
  .radio {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.ant-upload {
  width: 114px;
  height: 114px;
  background: #fff;
  border: 1px dashed #ededed;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.flex-box {
  align-items: flex-end;
}
.flex-pdf {
  display: flex;
  align-items: flex-end;
  justify-content: left;
  padding-bottom: 20px;
  .ant-upload-picture-card-wrapper {
    width: auto;
  }
}
</style>
