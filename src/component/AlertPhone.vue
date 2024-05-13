<template>
  <div class="page-wrap">
    <div>
      <p style="text-align:right;">
        <a-icon type="close-circle" class="close-circle" @click="$emit('cancle')" />
      </p>
      <PhoneModel :textList="textList"></PhoneModel>
    </div>
  </div>
</template>

<script>
import PhoneModel from '@/component/PhoneModel'
export default {
  name: 'AlertPhone',
  components: { PhoneModel },
  props: {
    textList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.page-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  .close-circle {
    color: #fff;
    font-size: 30px;
  }
}
</style>
