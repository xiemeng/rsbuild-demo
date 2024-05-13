<template>
  <div class="undate">
    <a-icon type="plus" v-if="!imgurl" class="plus"></a-icon>
    <img :src="imgurl" class="update-img" v-if="imgurl" />
    <div class="cover" v-if="imgurl">
      <span class="add-btn flex-row align-center">
        <a-icon type="delete" />
      </span>
    </div>
    <a-input type="file" :accept="accept" @input="getFile"></a-input>
  </div>
</template>

<script>
import { imageZip } from '@/utils/util'
export default {
  name: 'UpdateImg',
  components: {},
  props: {
    formInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: {
      handler() {
        this.imgurl = this.value.compress
      },
      immediate: true
    }
  },
  data() {
    return {
      imgurl: '',
      accept:
        '.bmp,.jpg,.jpeg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp'
    }
  },
  created() {
    console.log(this.formInfo)
  },
  methods: {
    // 得到文件
    getFile(event) {
      imageZip(event).then(res => {
        this.imgurl = res[0]
        this.$emit('input', {
          file: event?.target?.files[0], // 文件，上传FormData用
          compress: res[0], // 压缩过的图
          master: res[1] // 原图
        })
      })
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
  box-sizing: border-box;
  margin-right: 8px;
  cursor: pointer;
  .plus {
    font-size: 12px;
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
</style>
