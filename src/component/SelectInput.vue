<template>
  <div class="aks-person" @click="$emit('open')">
    <ul class="a-line-omit">
      <li v-for="item in usePersionList" :key="item.key" class="a-line-omit">
        <a-tag>{{ item.tagName }}</a-tag>
      </li>
      <p class="font-color-black-25" v-if="usePersionList.length < 1">{{ placeHolder }}</p>
    </ul>
    <span v-if="usePersionList.length > 2" class="omit">等{{ usePersionList.length }}个账号</span>
    <a-icon type="caret-down" />
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    usePersionList: {
      type: [Array],
      default() {
        return []
      }
    },
    placeHolder: {
      type: [String],
      default: ''
    },
  }
}
</script>

<style lang="less" scoped>
.aks-person {
  width: 190px;
  height: 32px;
  border: 1px solid #d9d9d9;
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  ul {
    display: flex;
    flex: 1;
    li {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .omit {
    white-space: nowrap;
    margin-left: 8px;
  }
}
</style>
