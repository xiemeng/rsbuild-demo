// 添加标签，样式组件，不能包含接口
<template>
  <div>
    <a-button @click="showInput" size="small" class="add-tag-button" v-if="isEdit">
      <a-icon type="plus" />
      添加
    </a-button>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      inputVisible="false"
      :maxLength="10"
      :style="{ width: '120px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter.stop="handleInputConfirm"
    />
    <template v-for="(tag, index) in tagslist.tags">
      <a-tooltip v-if="tag.tagName.length > 20" :key="index">
        <a-tag
          :key="tag.tagId"
          :closable="closable"
          @close="closeTag(tag)"
          :color="tagIdList.includes(tag.tagId) ? 'blue' : ''"
          @click="checkedTag(tag)"
        >
          {{ `${tag.tagName.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag
        v-else
        :key="tag.tagId"
        :closable="closable"
        @close="closeTag(tag)"
        :color="tagIdList.includes(tag.tagId) ? 'blue' : ''"
        @click="checkedTag(tag)"
      >
        {{ tag.tagName }}
      </a-tag>
    </template>
  </div>
</template>
<script>
export default {
  name: 'TagComponents',
  props: {
    selectTagList: {
      type: [Array],
      default() {
        return []
      }
    },
    tagslist: {
      type: [Object],
      default() {
        return {}
      }
    },
    // 标签是否可关闭
    closable: {
      type: Boolean,
      default: false
    },
    // 是否可以编辑
    isEdit: {
      type: Boolean,
      default: false
    },
    // 是否可以选中
    isSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      index: '',
      selectTags: [] // 选中的标签
    }
  },
  computed: {
    tagIdList() {
      return (
        this.selectTagList?.map(item => {
          return item.tagId
        }) || []
      )
    }
  },
  methods: {
    // 关闭标签
    closeTag(tag) {
      const index = this.tagslist.tags.findIndex(item => item.tagName === tag.tagName)
      this.tagslist.tags.splice(index, 1)
      console.log(this.tagslist.tags, tag)
      this.$emit('closeTag', tag)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(function() {
        this.$refs.input.focus()
      })
    },
    checkedTag(tags) {
      if (!this.isSelect) return
      const index = this.selectTagList.findIndex(item => {
        if (item.tagId === tags.tagId) {
          return item
        }
      })
      if (index >= 0) {
        this.selectTagList.splice(index, 1)
      } else {
        this.selectTagList.push(tags)
      }
      console.log(this.tagslist.tags)
    },
    handleInputChange(e) {
      this.inputValue = e.target.value?.trim()
    },
    clean() {
      this.inputValue = ''
      this.inputVisible = false
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (!inputValue) {
        this.clean()
        return
      }
      var tags = this.tagslist.tags || []
      var tagsdict = { tagName: inputValue }
      var nameList = tags?.map(item => item.tagName)
      console.log(nameList)
      if (nameList?.includes(tagsdict.tagName)) {
        this.$message.warning('存在重复标签')
        return
      }
      if (inputValue) {
        tags = [...tags, tagsdict]
      }
      this.tagslist.tags = tags
      this.$emit('addTag', { value: inputValue, tagItem: this.tagslist, callBack: this.clean })
    }
  }
}
</script>

<style scoped>
.ant-input-sm {
  margin-right: 10px;
}
.ant-tag {
  margin-bottom: 10px;
}
.add-tag-button {
  margin-right: 10px;
}
</style>
