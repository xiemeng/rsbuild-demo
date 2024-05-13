<template>
  <ul class="add-rule">
    <li v-for="(item, index) in ruleDetails" :key="index" class="rule-list">
      <a-icon type="minus-circle" @click="delRule(index)" />
      <span :class="index === 0 ? 'first' : ''">规则{{ index + 1 }}：用户</span>
      <a-select v-model="item.ruleKind" style="width: 120px">
        <a-select-option :value="rule.id" v-for="rule in ruleKindList" :key="rule.id">
          {{ rule.text }}
        </a-select-option>
      </a-select>
      <span v-if="item.ruleKind !== ruleKindList[0].id">
        达到
        <a-input-number class="time" :min="1" v-model="item.count" />
      </span>
      次时，可评
      <a-input-number class="time" :min="1" v-model="item.score" />分
      <br />
      <a-space>
        并打上标签：<a-switch v-model="item.hasTag" :disabled="!randerIsEdit"></a-switch>
        <SelectInput
          v-if="item.hasTag"
          placeHolder="请选择标签"
          @open="openTag(item)"
          :usePersionList="item.selectTagList"
        ></SelectInput>
      </a-space>
    </li>
    <a-button type="link" @click="addRule">
      <a-space :size="12">
        <a-icon type="plus-circle" />添加规则
        <span class="font-color-black-25">(添加的多条规则，可同时生效,最多设置8个规则)</span>
      </a-space>
    </a-button>
    <!-- 选择标签 -->
    <a-modal v-model="visibleTag" :footer="null" width="600px" centered>
      <SelectTags
        @cancle="visibleTag = false"
        @serviceOk="serviceTagOk"
        :selectTagList="item.selectTagList"
      ></SelectTags>
    </a-modal>
  </ul>
</template>

<script>
import SelectInput from '@/component/SelectInput'
import SelectTags from '@/component/tags/SelectTags'
export default {
  name: 'CustomerRating',
  components: { SelectInput, SelectTags },
  props: {
    ruleDetails: {
      type: Array,
      default() {
        return []
      }
    },
    randerIsEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ruleKindList: [
        { id: 0, text: '每打开一次' },
        { id: 1, text: '累计打开次数' }
      ],
      defaultRuleDetails() {
        // 默认的规则列表
        return {
          autoMarkTagBitmaps: '', // 标签值
          hasTag: false, // 是否打上标签
          selectTagList: [],
          score: '', // 评分分数值
          ruleKind: 0, // 打开方式
          count: '' // 打开次数
        }
      },
      visibleTag: false,
      item: {
        selectTagList: []
      }
    }
  },
  methods: {
    openTag(item) {
      this.item = item
      this.visibleTag = true
    },
    // 删除规则
    delRule(index) {
      this.ruleDetails.splice(index, 1)
    },
    // 添加规则
    addRule() {
      if (this.ruleDetails.length >= 8) {
        this.$message.warning('最多设置8个规则')
      } else {
        this.ruleDetails.push(this.defaultRuleDetails())
      }
    },
    serviceTagOk(tagList) {
      this.item.selectTagList = tagList
        .filter(item => item.selectTagList.length > 0)
        .map(item => item.selectTagList)
        .flat()
      this.visibleTag = false
    }
  }
}
</script>

<style lang="less" scoped>
.add-rule {
  background: #fbfbfb;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid #eee;
  padding: 16px 20px 0 16px;
  margin-bottom: -8px;
  .rule-list {
    margin-bottom: 10px;
    line-height: 44px;
  }
}
</style>
