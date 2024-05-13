<template>
  <CommonModal v-bind="source" @cancle="$emit('cancle')" @serviceOk="serviceOk">
    <TagComponents
      :tagslist="tagsItem"
      :isEdit="source.isEdit"
      @addTag="addTag"
      :selectTagList="tagsItem.selectTagList"
      @closeTag="closeTag"
      :closable="source.isEdit"
    />
    <a-empty v-if="!(tagsItem.tags && tagsItem.tags.length > 0)" class="empty" />
  </CommonModal>
</template>

<script>
import CommonModal from '@/component/CommonModal'
import TagComponents from './TagComponents'
export default {
  name: 'CommonInput',
  components: { CommonModal, TagComponents },
  props: {
    // 绑定的属性
    source: {
      type: Object,
      default() {
        return {}
      }
    },
    tagsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {},
  data() {
    return {}
  },
  created() {
    console.log(this.tagsItem)
  },
  methods: {
    // 关闭标签
    closeTag(tag) {
      this.$emit('closeTag', tag)
    },
    addTag(value) {
      this.$emit('addTag', value)
    },
    serviceOk() {
      console.log(this.tagsItem)
      this.$emit('serviceOk', this.tagsItem)
    }
  }
}
</script>

<style lang="less" scoped>
.empty {
  padding: 55px 0;
}
</style>
