/**
*  添加标签组件
*/
<template>
  <div>
    <a-button @click="showInput" class="add-tag-button" :disabled='!examine'> <a-icon type="plus" />{{ title }}</a-button>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      inputVisible="false"
      :style="{ width: '120px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="cancle"
      @keyup.enter="handleInputConfirm"
    />
    <template v-if='examine'>
      <template v-for="(tag, index) in tagslist">
        <a-tooltip v-if="tag.tagName.length > 20" :key="index">
          <a-tag :key="tag.tagName" closable @close="close(index)">
            {{ `${tag.tagName.slice(0, 20)}...` }}
          </a-tag>
        </a-tooltip>
        <a-tag v-else :key="index" closable @close="close(index)">
          {{ tag.tagName }}
        </a-tag>
      </template>
    </template>
    <template v-else>
      <template v-for="(tag, index) in tagslist">
        <a-tooltip v-if="tag.tagName.length > 20" :key="index">
          <a-tag :key="tag.tagName">
            {{ `${tag.tagName.slice(0, 20)}...` }}
          </a-tag>
        </a-tooltip>
        <a-tag v-else :key="index">
          {{ tag.tagName }}
        </a-tag>
      </template>
    </template>

  </div>
</template>
<script>
export default {
  name: 'addTag',
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      index: ''
    }
  },
  props: {
    title: {
      type: [String],
      default: '添加'
    },
    tagslist: {
      type: [Array],
      default() {
        return []
      }
    },
    examine: {
      type: [Boolean],
      default: true
    },
  },
  methods: {
    showInput() {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },
    handleInputChange(e) {
      this.inputValue = e.target.value
    },
    cancle() {
      this.inputValue = ''
      this.inputVisible = false
    },
    close(index) {
      this.tagslist.splice(index,1)
    },
    handleInputConfirm() {
      if(this.inputValue == '') {
        this.cancle()
        return
      }
      const inputValue = this.inputValue
      this.tagslist.push({
        tagName: inputValue
      })
      this.cancle()
    },
  },
}
</script>

<style scoped>
  .ant-input-sm {
    margin-right: 10px;
  }
  .ant-tag {
    margin-bottom: 10px;
    height: 32px; line-height: 30px;
  }
  .add-tag-button {
    margin-right: 10px;
  }
</style>