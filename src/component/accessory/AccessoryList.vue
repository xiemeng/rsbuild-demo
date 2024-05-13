<template>
  <div>
    <!-- 文本 -->
    <div v-if="item.msgType === 0">
      {{ item.msgContent }}
    </div>
    <!-- 图片 -->
    <div v-if="item.msgType === 1">
      <img :src="item.msgContent.compress" class="image" />
    </div>
    <!-- 链接 -->
    <div v-if="item.msgType === 2" class="card-box">
      <img :src="item.msgContent.form.coverUrl.compress || '/imgs/default-cover.png'" @error="errorImg" />
      <div class="box-right">
        <h5>{{ item.msgContent.form.linkTitle }}</h5>
        <p>{{ item.msgContent.form.desc }}</p>
      </div>
    </div>
    <!-- pdf -->
    <div v-if="item.msgType === 3" class="custom-pdf">
      <a-avatar :size="60" src="/icons/pdf.png" shape="square"></a-avatar>
      <div class="contant">
        <p>{{ item.pdfArr[0].name }}</p>
        <span>{{ item.pdfArr[0].size | getUnits }}</span>
      </div>
    </div>
    <!-- 视频 -->
    <div v-if="item.msgType === 5">
      <video :src="item.videoArr[0].pdfFile" class="cover-img" controls height="100%"></video>
    </div>
    <!-- 自定义表单 -->
    <div v-if="item.msgType === 4" class="custom-form">
      <h4>{{ item.formObj.name }}</h4>
      <div class="flex-box">
        <p class="font-color-black-25">{{ item.formObj.desc }}</p>
        <a-avatar :size="40" :src="item.formObj.cover" shape="square"></a-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import { bytesToSize } from '@/utils/util'
export default {
  name: 'AccessoryList',
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    item: {
      handler() {
        console.log(this.item)
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {}
  },
  filters: {
    getUnits(value) {
      return bytesToSize(value)
    }
  },
  methods: {
    errorImg(event) {
      event.target.src = '/imgs/default-cover.png'
    }
  }
}
</script>

<style lang="less" scoped>
.image {
  width: 100px;
}
.card-box {
  display: flex;
  img {
    width: 64px;
    height: 64px;
  }
  .box-right {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    margin-left: 10px;
    width: 300px;
    h5 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.custom-form {
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
  .flex-box {
    justify-content: space-between;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.custom-pdf {
  display: flex;
  align-items: center;
  .contant {
    margin-left: 10px;
    width: 180px;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
.cover-img {
  width: 126px;
  height: 126px;
}
</style>
