<template>
  <div class="phone-model">
    <img src="/imgs/chatBg.png" class="bg" />
    <div class="contant">
      <p class="time">{{ time }}</p>
      <ul v-if="textList.length > 0" class="contant-ul">
        <li class="contant-list" v-for="(item, index) in textList" :key="index">
          <img src="/icons/user.png" />
          <div class="contant-title">
            <p>{{ item.title }}</p>
            <div class="contant-contant">
              <span v-if="item.content">{{ item.content }}</span>
              <img :src="item.imageurl" v-if="item.imageurl" />
            </div>
          </div>
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
      //   textList: [
      //     {
      //       title: "点击这里，完成任务领取奖品吧👇",
      //       content: "快来参加活动吧",
      //     },{
      //       title: "点击这里，完成任务领取奖品吧👇",
      //       content: "快来参加活动吧",
      //       imageurl:
      //         "https://img0.baidu.com/it/u=3091312729,2448258900&fm=26&fmt=auto&gp=0.jpg",
      //     },{
      //       title: "点击这里，完成任务领取奖品吧👇",
      //       content: "快来参加活动吧",
      //       imageurl:
      //         "https://img0.baidu.com/it/u=3091312729,2448258900&fm=26&fmt=auto&gp=0.jpg",
      //     },{
      //       title: "点击这里，完成任务领取奖品吧👇",
      //       content: "快来参加活动吧",
      //       imageurl:
      //         "https://img0.baidu.com/it/u=3091312729,2448258900&fm=26&fmt=auto&gp=0.jpg",
      //     },
      //   ],
      time: this.$moment().format('HH:mm'),
    }
  },
  props: {
    textList: {
      type: [Array],
      default: () => {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
.phone-model {
  margin-left: 50px;
  position: relative;
  .bg {
    width: 274px;
  }
  .contant {
    position: absolute;
    left: 30px;
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
    .contant-ul {
      padding: 0;
    }
    .contant-list {
      font-size: 12px;
      width: 200px;
      display: flex;
      margin-bottom: 17px;
      p {
        margin-bottom: 5px;
      }
      .contant-title {
        background-color: #fff;
        padding: 7px 13px;
        border-radius: 5px;
        word-break: break-all;
        white-space: pre-wrap;
        .contant-contant {
          max-height: 54px;
          display: flex;
        }
      }
      span {
        flex: 1;
        margin-right: 5px;
        color: rgba(0, 0, 0, 0.45);
      }
      img {
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }
    }
  }
}
</style>
