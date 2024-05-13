// 新增标签组组件 用例 customerService/customerTages
<template>
  <div>
    <a-form-model-item
      prop="tagList"
      v-for="(domain, index) in form.tagList"
      :key="domain.key"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :label="index === 0 ? '标签名称' : ''"
    >
      <a-input
        v-model="domain.value"
        placeholder="请输入标签名称"
        :maxLength="10"
        style="width: 60%; margin-right: 8px"
      />
      <a-icon
        v-if="form.tagList.length > 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="form.tagList.length === 1"
        @click="removeDomain(domain)"
      />
      <a-space class="using" v-if="domain.tagCount || domain.tagCount === 0">
        <a-tag color="green" v-if="domain.tagCount > 0">使用中</a-tag>
        <a-tag color="orange" v-else>未使用</a-tag>
      </a-space>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ offset: 4 }">
      <a-button type="link" @click="addDomain">
        <a-icon type="plus-circle" />
        添加标签
      </a-button>
    </a-form-model-item>
  </div>
</template>

<script>
export default {
  name: 'FormlabelAdd',
  props: {
    form: {
      type: [Object],
      default() {
        return {}
      }
    }
  },
  mounted() {
    console.log(this.form.tagList)
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          sm: { span: 5 }
        },
        wrapperCol: {
          sm: { span: 19 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          sm: { span: 19, offset: 5 }
        }
      }
    }
  },
  methods: {
    removeDomain(item) {
      const index = this.form.tagList.indexOf(item)
      if (index !== -1) {
        this.form.tagList.splice(index, 1)
      }
    },
    addDomain() {
      this.form.tagList.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>
<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.using {
  margin-left: 10px;
}
</style>
