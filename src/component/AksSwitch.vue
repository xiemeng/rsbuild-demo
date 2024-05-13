<template>
  <div
    class="switch"
    :class="{ 'active': isActive === 'left' }"
  >
    <span
      :class="{ 'active': isActive === 'left' }"
      @click="changeSwitch('left')">
      {{ leftText }}
    </span>
    <span
      :class="{ 'active': isActive === 'right' }"
      @click="changeSwitch('right')">
      {{ rightText }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AksSwitch',
  props: {
    leftText: {
      type: String,
      default() {
        return '日历'
      }
    },
    rightText: {
      type: String,
      default() {
        return '时间轴'
      }
    }
  },
  data() {
    return {
      isActive: 'left',
    }
  },
  methods: {
    changeSwitch(direction) {
      if(this.isActive !== direction) {
        this.isActive = direction
        this.$emit('changeSwitch',direction)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .switch {
    width: 154px;
    height: 36px;
    background: #f8f8f8;
    border-radius: 20px;
    border: 1px solid #eee;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    transition: all .3s;
    cursor: pointer;
    &::after {
      transition: all .3s;
      position: absolute;
      content: "";
      display: block;
      top: 0;
      left: 75px;
      background: #1890ff;
      width: 77px;
      height: 36px;
      box-shadow: -3px 2px 4px 0 rgb(42 42 42 / 12%);
      border-radius: 20px;
      z-index: -1;
    }
    &.active {
      &::after {
        left: 0;
      }
    }
    span {
      width: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      word-break: keep-all;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(0,0,0,.65);
      &.active {
        color: #fff;
      }
    }
  }
</style>
