// 二维码预览组件  样式案例 clientBaseOperation/autoPullGroup/NewGruoup
<template>
  <div class="qrcode-wrap">
    <div class="qr-code">
      <img class="qr-img" :src="imgUrlCode" alt="二维码" />
      <img class="qr-header" :src="defaultLogo" v-if="!urlCode" />
      <img class="qr-header" :src="imageUrl" v-if="imageUrl" />
    </div>
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :accept="accept"
      :file-list="fileList"
      :customRequest="customRequest"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div>
        <a-icon type="plus" />
        <div class="ant-upload-text">
          {{ title }}
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="previewVisible = false">
      <img alt="example" style="width: 100%" :src="imageUrl" />
    </a-modal>
  </div>
</template>

<script>
import { ynthesisImages } from '@/utils/util'
export default {
  name: 'CodePreview',
  props: {
    // 展示图
    urlCode: {
      type: [String],
      default: ''
    },
    // 底图合成用
    qrCode: {
      type: [String],
      default: ''
    },
    title: {
      type: [String],
      default: '选择图片'
    },
    state: {
      type: [String],
      default: 'add'
    }
  },
  data() {
    return {
      accept: '.bmp,.jpg,.jpeg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp',
      previewVisible: false,
      imageUrl: '',
      fileList: [],
      defaultUrl: '/imgs/qr-preview.png',
      defaultLogo: '/imgs/default-logo.png',
    }
  },
  watch: {
    imgUrlQr() {
      this.imageUrl && ynthesisImages(this.imgUrlQr,this.imageUrl).then(res => {
        this.qrcodeCallback(res)
      })
    }
  },
  activated() {
    this.imageUrl = ''
    this.previewVisible = false
    this.fileList = []
  },
  computed: {
    imgUrlCode() {
      return this.urlCode || this.defaultUrl
    },
    imgUrlQr() {
      return this.qrCode || this.defaultUrl
    }
  },
  mounted() {
    if(this.state === 'add') {
      ynthesisImages(this.imgUrlQr,this.defaultLogo).then(res => {
        this.qrcodeCallback(res)
      })
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
        console.log(info)
        this.$emit('qrcodeInfo',info)
        if (info.file.status === 'uploading') {
            this.getBase64(info.file.originFileObj, imageUrl => {
                this.imageUrl = imageUrl
                ynthesisImages(this.imgUrlQr,this.imageUrl).then(res => {
                  this.qrcodeCallback(res)
                })
            })
            this.fileList = [info.fileList[info.fileList.length-1]]
            this.fileList[0].status = 'done'
        }
        if (info.file.status === 'removed') {
            this.fileList = []
            this.imageUrl = ''
        }
    },
    qrcodeCallback(url) {
      this.$emit('qrcodeCallback',{base64:url,imageUrl:this.imageUrl})
    }
  }
}
</script>

<style lang="less" scoped>
  .qrcode-wrap {
      display: flex;
      align-items: flex-end;
  }
  .qr-code {
    width: 165px;
    height: 165px;
    position: relative;
    .qr-img {
      height: 100%;
    }
    .qr-header {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
