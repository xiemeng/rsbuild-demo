/** * 公共的弹窗组件 modal 包含头部，底部，tis样式 * */
<template>
  <div>
    <h6 class="dialog-title">{{ title }}</h6>
    <span name="tip" v-if="tipText">
      <div class="tip">
        <a-icon type="bell" theme="filled" class="primaryColor"></a-icon>
        {{ tipText }}
      </div>
    </span>
    <slot></slot>
    <div class="foot-button" v-if="footer">
      <div class="left">
        <slot name="bottomLeft"></slot>
      </div>
      <a-space :size="12">
        <slot name="footer"></slot>
        <a-button @click="$emit('cancle')">{{ cancleText }}</a-button>
        <a-button type="primary" @click="$emit('serviceOk')" :loading="loading">{{ okText }}</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonModal',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    cancleText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    tipText: {
      type: [String, Boolean],
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.foot-button {
  text-align: right;
  display: flex;
  justify-content: space-between;
}
.tip {
  background: #effaff;
  border-radius: 2px;
  margin-top: 24px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 17px;
}
</style>
