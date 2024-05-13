/** * @params 选择员工可以使用这个通用组件 * */
<template>
  <div>
    <div class="use-person">
      <ul @click="visibleUsePerson = true" class="a-line-omit">
        <li v-for="item in usePersionList" :key="item.key" class="a-line-omit">
          <a-tooltip :title="item.title">
            <a-icon class="icon" v-if="item.icon" :type="item.icon" />
            <a-avatar v-else :size="23" :src="item.source.thumbAvatar || defaultThumbAvatar" class="imgs"></a-avatar>
            <span class="title"> {{ item.title }} </span>
          </a-tooltip>
        </li>
        <p class="font-color-black-25" v-if="usePersionList.length < 1">{{ placeHolder }}</p>
      </ul>
      <span v-if="usePersionList.length > 2" class="omit">等{{ usePersionList.length }}个账号</span>
      <a-icon type="caret-down" />
    </div>
    <a-modal v-model="visibleUsePerson" :footer="null" width="680px" centered>
      <AddTransfer
        :type="type"
        :title="title"
        v-bind="source"
        :selectList="usePersionList"
        :selectRoleIdList="selectRoleIdList"
        @serviceOk="serviceOk"
        @cancle="visibleUsePerson = false"
      >
      </AddTransfer>
    </a-modal>
  </div>
</template>

<script>
import AddTransfer from '@/component/AddTransfer'
export default {
  name: 'UsePerson',
  props: {
    defaultUsePerson: {
      type: [Array],
      default() {
        return []
      }
    },
    placeHolder: {
      type: [String],
      default: ''
    },
    type: {
      type: [String],
      default: ''
    },
    title: {
      type: [String],
      default: '选择成员'
    },
    value: {
      type: [Array],
      default() {
        return []
      }
    },
    // 是否需要控制确定返回按钮 ，默认不要，要的话，usePersionInfo会有个callback来关闭弹窗
    needControlReturn: {
      type: Boolean,
      default: false
    },
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: { AddTransfer },
  data() {
    return {
      defaultThumbAvatar: require('@/assets/icons/default.svg'),
      visibleUsePerson: false,
      selectRoleIdList: [],
      usePersionList: this.value
    }
  },
  watch: {
    value() {
      this.usePersionList = this.value
      console.log(this.usePersionList)
    }
  },
  methods: {
    serviceOk(usePersionList) {
      console.log(usePersionList)
      if (usePersionList.length < 1) {
        this.usePersionList = this.defaultUsePerson
      } else {
        this.usePersionList = usePersionList
      }
      this.usePersionList.map(item => {
        item.value = 100
      })
      if (!this.needControlReturn) {
        this.visibleUsePerson = false
      }
      this.$emit('input', this.usePersionList)
      this.$emit('usePersionInfo', this.usePersionList, () => {
        this.visibleUsePerson = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.use-person {
  width: 190px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  ul {
    display: flex;
    flex: 1;
    li {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // display: flex;
      // align-items: center;
      .title {
        margin-left: 5px;
      }
      .imgs {
        // min-width: 23px;
        // min-height: 23px;
      }
    }
  }
  .omit {
    white-space: nowrap;
    margin-left: 8px;
  }
}
</style>
