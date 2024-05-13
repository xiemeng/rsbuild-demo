<template>
  <div class="upload-wrap">
    <div class="upload-file" v-if="fileList.length < 1" :style="{width: widthData}">
      <div>
        <img class="upload-icon" src="~@/assets/icons/upload-file.svg" alt="上传" />
        <p class="tips">{{ formatType.tips }}</p>
        <a-upload
          list-type="picture"
          :accept="accept"
          :fileList="fileList"
          :showUploadList="false"
          :before-upload="beforeUpload"
          :customRequest="customRequest"
          @change="handleChange"
        >
          <a-button type="primary">选择文件</a-button>
        </a-upload>
      </div>
    </div>
    <div v-else class="preview">
      <div class="preview-detail">
        <div class="uploadImg-wrap" v-if="selectMaterial === '2'">
          <img :src="uploadImg" class="uploadImg" />
        </div>
        <div class="document" v-else>
          <div class="document-left">
            <a-tooltip :title="uploadFile.name">
              <p>{{ uploadFile.name }}</p>
            </a-tooltip>
            <span>{{ uploadFile.size | getUnits }}</span>
          </div>
          <img :src="formatType.icon" class="icon-img" />
        </div>
        <a-upload
          list-type="picture"
          :accept="accept"
          :fileList="fileList"
          :showUploadList="false"
          :before-upload="beforeUpload"
          :customRequest="customRequest"
          @change="handleChange"
        >
          <a-button type="link" icon="sync"> 重新上传 </a-button>
        </a-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { MATERIAL_LIST } from '@/config/enum'
import { imageZip, bytesToSize } from '@/utils/util'

export default {
  name: 'UploadFile',
  props: {
    widthData: {
      type: String,
      default: '347px',
    },
    value: {
      type: String,
      default: '',
    },
    selectMaterial: {
      type: String,
      default: '2',
    },
    title: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
    uploadFileDict: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visibleUpload: false,
      accept: '',
      visibleTags: false,
      uploadImg: '',
      checked: false, //
      uploadFile: '', // 需要上传的文件
      fileList: [], // 已经上传的文件列表
    }
  },
  filters: {
    getUnits(value) {
      return bytesToSize(value)
    },
  },
  computed: {
    formatType() {
      return MATERIAL_LIST.find((item) => {
        return item.id == this.selectMaterial
      })
    },
  },
  created() {
    this.accept = this.formatType.format
  },
  watch: {
    value() {
      this.visibleUpload = this.value
    },
    uploadFileDict: {
      handler() {
        this.uploadFile = {
          name: this.uploadFileDict.name || '2.0版本.pdf',
          size: this.uploadFileDict.size || 0,
        }
      },
      deep: true,
    },
    url() {
      if (this.url) {
        this.fileList = [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: this.url,
          },
        ]
        this.uploadImg = this.url
      }
    },
  },
  methods: {
    // 自定义自己的上传实现
    customRequest(data) {
      this.uploadFile = data.file
      data.onSuccess()
    },
    // 上传限制
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.formatType.max
      if (!isLt2M) {
        this.$message.error(`文件不能大于${this.formatType.max}MB!`)
      }
      return isLt2M
    },
    handleChange(data) {
      this.selectMaterial == 2 &&
        imageZip(data?.file?.originFileObj).then((res) => {
          this.uploadImg = res[1]
        })
      if (data.file.status === 'uploading') {
        this.fileList = [data.fileList[data.fileList.length - 1]]
        this.fileList[0].status = 'done'
      }
      this.$emit('input', data?.fileList[data.fileList.length - 1]?.originFileObj)
    },
  },
}
</script>

<style lang="less" scoped>
.upload-wrap {
  text-align: center;
  h4 {
    font-size: 17px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
  }
  .upload-file {
    padding-bottom: 20px;
    // height: 221px;
    background: #f8fcff;
    border-radius: 2px;
    border: 1px dashed #ddd;
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
    .upload-icon {
      padding-top: 40px;
    }
    .tips {
      width: 120px;
      margin: 10px auto;
      margin-bottom: 30px;
    }
  }
  .preview {
    padding: 0 20px;
    .preview-detail {
      display: flex;
      display: flex;
      align-items: flex-end;
      .uploadImg-wrap {
        height: 221px;
        .uploadImg {
          width: 178px;
          height: 100%;
          background: #f1f7fd;
          border-radius: 4px;
          object-fit: contain;
          margin: 0;
        }
      }
    }
    .upload-tag {
      text-align: left;
      margin-top: 10px;
      .select-tag {
        margin-top: 10px;
        button {
          margin-right: 10px;
        }
        .ant-tag {
          margin-top: 10px;
        }
      }
    }
  }
}
.document {
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  width: 240px;
  height: 92px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  text-align: left;
  .document-left {
    overflow: hidden;
    flex: 1;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
  .icon-img {
    width: 48px;
    height: 48px;
    background: #54a0ff;
    border-radius: 2px;
    margin-left: 10px;
  }
}
.foot-button {
  text-align: right;
  padding: 15px;
}
</style>
