<template>
  <div class="qrcode-wrap">
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :accept="accept"
      :disabled="isDisabled"
      :file-list="fileList"
      :customRequest="customRequest"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div>
        <a-icon type="plus" />
        <div class="ant-upload-text">
          {{ !imageUrl ? titleName : '重新选择' }}
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="imageUrl" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'UpDateImg',
  props: ['value', 'url', 'title', 'isDisabled', 'articleFile','timestamp'],
  data() {
    return {
      accept: '.jpg,.png,',
      previewVisible: false,
      imageUrl: '',
      titleName: this.title || '上传活码',
      fileList: []
    }
  },
  watch: {
    url: {
      handler() {
        if (this.url) {
          this.fileList[0] = {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: this.url
          }
          this.imageUrl = this.url
        }
      },
      immediate: true
    },
    timestamp: {
      handler() {
        if (this.url) {
          this.fileList[0] = {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: this.url
          }
          this.imageUrl = this.url
        }else{
          this.imageUrl=''
          this.fileList=[]
        }
      },
      immediate: true
    },
    articleFile: {
      handler() {
        if (this.articleFile) {
          this.getBase64(this.articleFile, imageUrl => {
            this.fileList[0] = {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: this.imageUrl
            }
            this.imageUrl = imageUrl
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    customRequest(file) {
      file.onSuccess() //上传成功
    },
    handlePreview(file) {
      this.previewVisible = true
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
        })
        this.fileList = [info.fileList[info.fileList.length - 1]]
        this.fileList[0].status = 'done'
      }
      if (info.file.status === 'removed') {
        this.fileList = []
        this.imageUrl = ''
      }
      this.$emit('input', info?.fileList[info.fileList.length - 1]?.originFileObj)
    }
  }
}
</script>

<style lang="less" scoped>
.qrcode-wrap {
  display: flex;
  align-items: flex-end;
}
</style>
