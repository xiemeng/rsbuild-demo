<template>
  <div>
    <header v-if="state !== 'look'">
      <a-button type="primary" @click="visibleTree = true">
        <a-icon type="plus" />
        {{ title }}
      </a-button>
      <span class="font-color-black-25 tips" v-if="tip">{{ tip }}</span>
    </header>
    <ul>
      <a-tag
        :closable="state === 'look' ? false : true"
        v-for="(item, index) in selectList"
        :key="item.key"
        @close="closeTag(index)"
      >
        <a-avatar v-if="item.source.thumbAvatar" :size="26" :src="item.source.thumbAvatar" shape="square" />
        <a-avatar v-else :size="26" :icon="item.icon" shape="square" />
        {{ item.title }}
      </a-tag>
    </ul>
    <a-modal v-model="visibleTree" :footer="null" centered width="680px" destroyOnClose>
      <AddTransfer
        :selectRoleIdList="selectRoleIdList"
        :title="title"
        :type="type"
        :selectList="selectList"
        @serviceOk="serviceOk"
        @cancle="visibleTree = false"
      ></AddTransfer>
    </a-modal>
  </div>
</template>

<script>
import AddTransfer from './AddTransfer'
export default {
  name: 'AddContent',
  props: {
    value: {
      type: [Array],
      default() {
        return []
      }
    },
    state: {
      type: [String],
      default: ''
    },
    selectRoleIdList: {
      type: [Array, String],
      default() {
        return ''
      }
    },
    type: {
      type: [String],
      default: 'wxDepartmentId'
    },
    title: {
      type: [String],
      default: '添加成员'
    },
    tip: {
      type: [String],
      default: ''
    },
    dataList: {
      type: [Array],
      default() {
        return []
      }
    }
  },
  components: { AddTransfer },
  data() {
    return {
      visibleTree: false,
      selectList: []
    }
  },
  watch: {
    selectList() {
      this.$emit('selectPerson', this.selectList)
      this.$emit('input', this.selectList)
    },
    dataList: {
      handler() {
        this.selectList = this.dataList
      },
      immediate: true
    }
  },
  methods: {
    serviceOk(list) {
      const arr = list.map(item => {
        item.value = 100
        return item
      })
      this.selectList = arr
      this.visibleTree = false
    },
    closeTag(index) {
      this.selectList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  margin-left: 8px;
}
.ant-tag {
  padding: 5px;
  margin-top: 10px;
}
</style>
