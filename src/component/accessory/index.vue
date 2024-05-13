<template>
  <div>
    <ul class="list-wrap">
      <li v-for="(item, index) in attachments" :key="index" class="list">
        <div>
          <a-icon type="minus-circle" class="button" @click="deleteAttachments(index)" />
          【{{ item.typeText }}】:
          {{ item.title || item.linkTitle }}
        </div>
        <a-icon type="form" class="button" @click="editAttachments(item, index)" />
      </li>
    </ul>
    <a-dropdown placement="topCenter" :trigger="['click']">
      <a-button type="link" block class="add-button" size="large">
        <a-icon type="plus-circle" />
        添加附件
      </a-button>
      <a-menu slot="overlay">
        <a-menu-item v-for="item in menuList" :key="item.id" @click="openAccessory(item.key)">
          {{ item.text }}
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!-- 图片 -->
    <a-modal v-model="visibileAddImg" :footer="null" destroyOnClose centered width="580px">
      <AddImg @cancle="visibileAddImg = false" @serviceOk="serviceOk" :editData="editData"></AddImg>
    </a-modal>
    <!-- 链接 -->
    <a-modal v-model="visibileAddLink" :footer="null" destroyOnClose centered width="580px">
      <AddLink
        @cancle="visibileAddLink = false"
        @serviceOk="serviceOk"
        :editData="editData"
        :source="source"
        :isNeedSelectRadar="isNeedSelectRadar"
        :isNeedRader="isNeedRader"
      ></AddLink>
    </a-modal>
    <!-- 自定义表单 -->
    <a-modal v-model="visibileForm" :footer="null" destroyOnClose centered width="880px">
      <AddForm @cancle="visibileForm = false" @serviceOk="serviceOk" :editData="editData" :source="source"></AddForm>
    </a-modal>
    <!-- 抽奖活动 -->
    <a-modal v-model="visibileLuckDraw" :footer="null" destroyOnClose centered width="880px">
      <AddluckyDraw
        @cancle="visibileLuckDraw = false"
        @serviceOk="serviceOk"
        :editData="editData"
        :source="source"
      ></AddluckyDraw>
    </a-modal>
  </div>
</template>

<script>
import AddImg from './AddImg'
import AddLink from './AddLink'
import AddForm from './AddForm'
import AddluckyDraw from './AddluckyDraw'
export default {
  name: 'Accessory',
  components: { AddImg, AddLink, AddForm, AddluckyDraw },
  props: {
    // 来源
    source: {
      type: String,
      default: ''
    },
    // 最大上传数量限制
    maxLength: {
      type: Number,
      default: 9
    },
    // 是否需要雷达
    isNeedRader: {
      type: Boolean,
      default: true
    },
    isNeedSelectRadar: {
      type: Boolean,
      default: true
    },
    attachmentsWrap: {
      type: Array,
      default() {
        return []
      }
    },
    // 需要的附件
    menuList: {
      type: Array,
      default() {
        return [
          { text: '图片', id: 1, key: 'visibileAddImg' },
          { text: '链接', id: 2, key: 'visibileAddLink' },
          // { text: '小程序', id: 3 },
          { text: '自定义表单', id: 4, key: 'visibileForm' },
          { text: '抽奖活动', id: 5, key: 'visibileLuckDraw' }
        ]
      }
    }
  },
  data() {
    return {
      visibileAddImg: false,
      visibileAddLink: false,
      visibileForm: false,
      visibileLuckDraw: false,
      key: '',
      editData: {}, // 要编辑的内容
      editIndex: undefined, // 要编辑的下标
      attachments: [] // 附件列表
    }
  },
  watch: {
    attachmentsWrap: {
      handler() {
        this.attachments = this.attachmentsWrap
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 打开弹窗
    openAccessory(key) {
      console.log(key)
      if (this.attachments.length >= this.maxLength) {
        this.$message.warning(`最多上传${this.maxLength}个附件`)
        return
      }
      this.editData = {}
      this.editIndex = undefined
      this.key = key
      this[this.key] = true
    },
    // 保存内容
    serviceOk(form) {
      // 新增或者编辑
      console.log(form)
      if (this.editIndex === undefined) {
        if (this.attachments.length >= this.maxLength) {
          this.$message.warning(`最多上传${this.maxLength}个附件`)
        } else {
          this.attachments.push(form)
        }
      } else {
        this.$set(this.attachments, this.editIndex, form)
      }
      this[this.key] = false
      this.$emit('serviceOk', this.attachments)
    },
    // 删除附件
    deleteAttachments(index) {
      this.attachments.splice(index, 1)
    },
    // 编辑附件
    editAttachments(item, index) {
      console.log(this.key, item)
      this.editData = item
      this.editIndex = index
      this.key = item.key
      this[this.key] = true
    }
  }
}
</script>

<style lang="less" scoped>
.list-wrap {
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border: 1px solid #ccc;
    border-bottom: none;
  }
  .button {
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
}
.add-button {
  border: 1px solid #ccc;
  text-align: left;
  display: block;
}
</style>
