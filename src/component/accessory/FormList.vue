// 表单集合
<template>
  <div>
    <!-- 输入框 -->
    <div v-if="formInfo.type === 'input'">
      <a-input
        :placeholder="formInfo.tips"
        :maxLength="formInfo.maxLength"
        v-model="formInfo.value"
        :disabled="formInfo.disabled"
      >
        <div slot="suffix" class="font-color-black-25">{{ formInfo.value.length }}/{{ formInfo.maxLength }}</div>
      </a-input>
    </div>
    <!-- 图片上传 -->
    <div v-if="formInfo.type === 'img'">
      <div class="undate" :class="imgurl ? '' : 'empty'">
        <a-icon type="plus" v-if="!imgurl" class="plus"></a-icon>
        <img :src="imgurl" class="update-img" v-if="imgurl" />
        <div class="cover" v-if="imgurl">
          <span class="add-btn flex-row align-center">
            <a-icon type="plus"></a-icon>
            更换图片
          </span>
        </div>
        <a-input type="file" :accept="formInfo.accept" @input="getFile"></a-input>
      </div>
      <p class="upload-prompt" v-if="formInfo.tips">({{ formInfo.tips }})</p>
    </div>
    <!-- 上传多张图片 -->
    <div v-if="formInfo.type === 'imgList'">
      <a-upload
        list-type="picture-card"
        :file-list="formInfo.value"
        @preview="handlePreview"
        @change="handleChange"
        :accept="formInfo.accept || accept"
        :customRequest="customRequest"
      >
        <div v-if="formInfo.value.length < formInfo.maxLength">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            点击上传图片
          </div>
        </div>
      </a-upload>
    </div>
    <!-- 多行文本 -->
    <div v-if="formInfo.type === 'textarea'" class="textarea-wrap">
      <a-textarea
        :placeholder="formInfo.tips"
        :maxLength="formInfo.maxLength"
        v-model="formInfo.value"
        :autoSize="{ minRows: 4, maxRows: 4 }"
        allow-clear
        :disabled="formInfo.disabled"
      />
      <p class="statistics font-color-black-25">{{ formInfo.value.length }}/{{ formInfo.maxLength }}</p>
    </div>
    <!-- 开关 -->
    <ul v-if="formInfo.type === 'switch'">
      <li v-for="(item, index) in formInfo.list" :key="index" class="switch-list">
        <a-switch v-model="item.isChecked" size="small" class="switch"></a-switch>
        <div>
          <p>{{ item.tips }}</p>
          <p class="aks-tips" v-if="item.subTips">{{ item.subTips }}</p>
        </div>
        <a-tooltip :title="item.tooltip" v-if="item.tooltip">
          <a-icon type="question-circle" />
        </a-tooltip>
        <div v-if="item.list && item.isChecked" class="change-radio">
          <a-radio-group v-model="item.value">
            <a-radio :value="radio.label" v-for="radio in item.list" :key="radio.label">
              {{ radio.text }}
              <span :class="radio.label"></span>
            </a-radio>
          </a-radio-group>
        </div>
      </li>
    </ul>
    <!-- 单选框 -->
    <div v-if="formInfo.type === 'radio'">
      <a-radio-group v-model="formInfo.value">
        <a-radio :value="item.label" v-for="(item, index) in formInfo.list" :key="index">
          {{ item.title }}
        </a-radio>
      </a-radio-group>
    </div>
    <!-- select 选择框 -->
    <div v-if="formInfo.type === 'select'">
      <div v-if="formInfo.subtitle" class="select-subtitle-box">
        {{ formInfo.subtitle }}
        <a-tooltip :title="formInfo.subtitleTooltip" v-if="formInfo.subtitleTooltip">
          <a-icon type="question-circle" />
        </a-tooltip>
        <a-switch v-model="formInfo.subtitleValue" size="small" />
      </div>
      <ul class="select-list-wrap">
        <li v-for="(item, index) in formInfo.list" :key="index">
          <div class="select">
            <UpdateImg
              v-model="item.baseImg"
              :formInfo="item"
              class="select-update"
              v-if="formInfo.isUpdateImg"
            ></UpdateImg>
            <a-input :maxLength="formInfo.maxLength" :placeholder="formInfo.tips" v-model="item.value" />
            <div class="list-but">
              <a-icon type="minus-circle" @click="deleteSelect(index)" />
              <a-icon type="plus-circle" @click="addSelect" />
            </div>
          </div>
          <div class="add-tag" v-if="formInfo.subtitleValue">
            <a-button @click="addTags(item)" class="add-but"><a-icon type="plus"></a-icon>添加标签</a-button>
            <a-tag
              v-for="item in item.selectTagList"
              :key="item.tagId"
              closable
              @close="closeTag(item.tagId)"
              class="tag"
            >
              {{ item.tagName }}
            </a-tag>
          </div>
        </li>
      </ul>
    </div>
    <!-- 选择标签弹窗 -->
    <a-modal v-model="visibleTag" :footer="null" centered destroyOnClose>
      <SelectTags
        @cancle="visibleTag = false"
        @serviceOk="serviceOk"
        :selectTagList="selectItem.selectTagList"
      ></SelectTags>
    </a-modal>
    <!-- 查看大图 -->
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { imageZip } from '@/utils/util'
import SelectTags from '@/component/tags/SelectTags'
import UpdateImg from './UpdateImg'
import { bytesToSize } from '@/utils/util'
export default {
  name: 'FormList',
  components: { SelectTags, UpdateImg },
  props: {
    formInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    formInfo: {
      handler() {
        if (this.formInfo.type === 'img') {
          this.imgurl = this.formInfo.value.compress
        }
        if (this.formInfo.value) {
          this.$emit('input', this.formInfo.value)
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      imgurl: '',
      accept:
        '.bmp,.jpg,.jpeg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp',
      visibleTag: false,
      selectItem: {
        selectTagList: []
      },
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    customRequest(file) {
      file.onSuccess() //上传成功
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      if (this.formInfo.maxNum && fileList.length > this.formInfo.maxNum) {
        this.$message.warning(`不能超过${this.formInfo.maxNum}张`)
        return
      }
      console.log(fileList)
      const newFileList = fileList.slice(-this.formInfo.maxLength)
      // 需要异步延迟一下
      setTimeout(() => {
        this.formInfo.value = newFileList.map(item => {
          return {
            ...item,
            status: 'done'
          }
        })
      }, 0)
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    // 得到文件
    getFile(event) {
      console.log(this.formInfo, event?.target?.files[0])
      if (this.formInfo.maxLength >= 2048000) {
        if (event?.target?.files[0].size >= this.formInfo.maxLength) {
          this.$message.warning(`上传图片大小不能超过${bytesToSize(this.formInfo.maxLength)}`)
          return
        }
      }
      imageZip(event).then(res => {
        this.imgurl = res[0]
        this.formInfo.value = {
          file: event?.target?.files[0], // 文件，上传FormData用
          compress: res[0], // 压缩过的图
          master: res[1] // 原图
        }
      })
    },
    // 删除选项
    deleteSelect(index) {
      if (this.formInfo.list.length === 1) return
      this.formInfo.list.splice(index, 1)
    },
    // 添加选项
    addSelect() {
      this.formInfo.list.push(this.formInfo.defaultItem)
    },
    // 添加标签
    serviceOk(tagList) {
      this.selectItem.selectTagList = tagList
        .filter(item => item.selectTagList.length > 0)
        .map(item => item.selectTagList)
        .flat()
      this.visibleTag = false
    },
    // 添加标签
    addTags(item) {
      this.selectItem = item
      this.visibleTag = true
    },
    // 删除标签
    closeTag(tagId) {
      const index = this.selectItem.selectTagList.findIndex(item => item.tagId === tagId)
      this.selectItem.selectTagList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.undate {
  position: relative;
  background: #f4f9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  &.empty {
    height: 179px;
  }
  .plus {
    font-size: 40px;
    color: #1890ff;
  }
  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.48);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .add-btn {
      width: 106px;
      height: 34px;
      border-radius: 17px;
      border: 1px solid #fff;
      font-size: 13px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .update-img {
    width: 100%;
    background-color: #fff;
  }
  input {
    position: absolute;
    width: 100%;
    cursor: pointer;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
}
.upload-prompt {
  text-align: center;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.65);
}
.switch-list {
  display: flex;
  align-items: flex-start;
  line-height: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  .switch {
    margin-right: 5px;
  }
  i {
    margin-left: 5px;
  }
  .change-radio {
    width: 100%;
    margin-top: 10px;
  }
  .soild {
    width: 40px;
    height: 2px;
    display: inline-block;
    margin-top: 9px;
    background: #cecece;
    border-radius: 1px;
    position: relative;
    top: -4px;
  }
  .dashed {
    margin-top: 9px;
    width: 40px;
    display: inline-block;
    border: 1px dashed #cecece;
    position: relative;
    top: -4px;
  }
}
.select-subtitle-box {
  display: flex;
  align-items: center;
  i {
    margin: 0 5px;
  }
}
.select-list-wrap {
  margin-top: 20px;
  .select {
    margin-bottom: 10px;
    display: flex;
    .list-but {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      i {
        font-size: 12px;
      }
    }
    .select-update {
      width: 33px;
      height: 33px;
      flex-shrink: 0;
    }
  }
  .add-tag {
    margin: 20px 0;
    .add-but {
      margin-right: 8px;
      margin-bottom: 8px;
    }
    .tag {
      padding-top: 5px;
      padding-bottom: 5px;
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
}
/deep/ .ant-input-affix-wrapper input {
  padding-right: 50px !important;
}
</style>
