<template>
  <div class="phone-model">
    <img src="/imgs/chatBg.png" class="bg" />
    <div class="contant">
      <p class="time">{{ time }}</p>
      <ul v-if="textList.length > 0">
        <li class="contant-list" v-for="(item, index) in textList" :key="index">
          <!-- 图文 -->
          <template v-if="item.type === 'img'">
            <img src="/icons/user.png" class="user" />
            <div class="contant-main"><img :src="item.pic_url.compress" class="upload-img" /></div>
          </template>
          <!-- 链接 -->
          <template v-if="item.type === 'link'">
            <img src="/icons/user.png" class="user" />
            <div class="contant-title">
              <a-tooltip :title="item.linkTitle">
                <p class="contant-subtitle">{{ item.linkTitle }}</p>
              </a-tooltip>
              <div class="contant-contant">
                <a-tooltip v-if="item.desc" :title="item.desc">
                  <span>{{ item.desc }}</span>
                </a-tooltip>
                <a-avatar :src="item.coverUrl.compress" :size="32" shape="square"></a-avatar>
              </div>
            </div>
          </template>
          <!-- 文字 -->
          <template v-if="!item.type">
            <img src="/icons/user.png" class="user" />
            <div class="contant-main">{{ item }}</div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneModel',
  data() {
    return {
      time: this.$moment().format('HH:mm')
    }
  },
  props: {
    textList: {
      type: [Array],
      default: () => {
        return []
      }
    }
  },
  watch: {
    textList() {
      console.log(this.textList)
    }
  }
}
</script>

<style lang="less" scoped>
.phone-model {
  margin-left: 50px;
  position: relative;
  ul {
    width: 205px;
  }
  .bg {
    width: 274px;
  }
  .contant {
    position: absolute;
    left: 40px;
    top: 100px;
    margin-right: 40px;
    line-height: 20px;
    height: 320px;
    overflow-y: auto;
    .time {
      text-align: center;
      width: 190px;
      margin-bottom: 20px;
    }
    .contant-list {
      display: flex;
      margin-bottom: 10px;
      text-align: left;
      .contant-main {
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        word-break: break-all;
        white-space: pre-wrap;
      }
      .contant-title {
        background-color: #fff;
        padding: 7px 13px;
        border-radius: 5px;
        width: 100%;
        .contant-subtitle {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 10px;
        }
        .contant-contant {
          display: flex;
          justify-content: space-between;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
            white-space: pre-wrap;
            width: 100px;
          }
        }
      }
      .user {
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }
      .upload-img {
        width: 80%;
        height: auto;
      }
    }
  }
}
</style>
