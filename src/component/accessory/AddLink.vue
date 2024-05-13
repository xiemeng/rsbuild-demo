<template>
  <CommonModal v-bind="sourceModal" @cancle="$emit('cancle')" @serviceOk="serviceOk" :loading="loading">
    <AddLinkWrap
      :editData="editData"
      :isNeedTag="isNeedTag"
      ref="AddLinkWrap"
      class="add-link-wrap"
      :source="source"
      :isNeedRader="isNeedRader"
      :isNeedSelectRadar="isNeedSelectRadar"
    ></AddLinkWrap>
  </CommonModal>
</template>

<script>
import AddLinkWrap from './AddLinkWrap'
import CommonModal from '@/component/CommonModal'
export default {
  name: 'AddLink',
  components: { AddLinkWrap, CommonModal },
  props: {
    // 编辑的数据
    editData: {
      type: Object,
      default() {
        return {}
      }
    },
    source: {
      type: String,
      default: ''
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    isNeedTag: {
      type: Boolean,
      default: false
    },
    // 是否需要雷达
    isNeedRader: {
      type: Boolean,
      default: true
    },
    isNeedSelectRadar: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    editData: {
      handler() {
        this.sourceModal.title = this.editData.id ? '修改链接' : '添加链接'
      },
      immediate: true
    }
  },
  data() {
    return {
      sourceModal: {}
    }
  },
  methods: {
    serviceOk() {
      if (this.$refs.AddLinkWrap.getFormValue()) {
        this.$refs.AddLinkWrap.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$emit('serviceOk', this.$refs.AddLinkWrap.form)
          } else {
            return false
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-link-wrap {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
