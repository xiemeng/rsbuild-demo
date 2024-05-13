<template>
  <div class="aks-person" @click="$emit('open')">
    <div class="flex-row">
      <a-tag v-for="(item, index) in usePersionList" :key="item.key">{{ item.tagName }}
        <a-icon type="close" @click.stop="() => closeTag(index)" />
      </a-tag>
      <p v-if="usePersionList.length < 1">{{ placeHolder }}</p>
    </div>
    <a-icon type="caret-down" />
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  model: {
    prop: 'usePersionList', //指向props的参数名
    event: 'change', //事件名称
  },
  props: {
    usePersionList: {
      type: [Array],
      default() {
        return []
      },
    },
    placeHolder: {
      type: [String],
      default: '',
    },
  },
  methods: {
    closeTag(index) {
      this.usePersionList.splice(index, 1)
      this.$emit('change', this.usePersionList)
    },
  },
}
</script>

<style lang="less" scoped>
.box-space-between() {
  // 左右布局
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.aks-person {
  border-radius: 4px;
  height: 36px;
  width: 190px;
  border: 1px solid #d9d9d9;
  background: #fff;
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  .box-space-between();
  .flex-row {
    width: 190px;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
