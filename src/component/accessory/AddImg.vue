<template>
  <CommonModal v-bind="source" @cancle="$emit('cancle')" @serviceOk="serviceOk" :loading="loading">
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item :label="item.title" v-for="(item, index) in formInfoList" :key="index" :prop="item.prop">
        <FormList :formInfo="item" class="input"></FormList>
      </a-form-model-item>
    </a-form-model>
  </CommonModal>
</template>

<script>
import CommonModal from '@/component/CommonModal'
import FormList from './FormList'
export default {
  name: 'AddImg',
  components: { CommonModal, FormList },
  props: {
    // 编辑的数据
    editData: {
      type: Object,
      default() {
        return {}
      }
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      source: {
        title: '添加图片'
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 6 },
      formInfoList: [
        {
          title: '图片标题',
          prop: 'title',
          type: 'input',
          tips: '请输入图片标题',
          maxLength: 30,
          value: ''
        },
        {
          title: '图片',
          prop: 'pic_url',
          type: 'img',
          tips: '',
          accept: '.jpg,.png',
          maxLength: 2097152,
          value: {}
        }
      ],
      form: {
        pic_url: {},
        title: '',
        type: 'img',
        typeText: '图片',
        key: 'visibileAddImg'
      },
      rules: {
        title: [{ required: false, message: '未填写图片标题' }],
        pic_url: [{ required: true, message: '未选择图片' }]
      }
    }
  },
  watch: {
    editData: {
      handler() {
        if (this.editData?.type) {
          this.form.title = this.editData.title || ''
          this.form.pic_url = this.editData.pic_url
          this.getlistValue()
        }
      },
      immediate: true
    }
  },
  methods: {
    serviceOk() {
      if (this.getFormValue()) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (!this.form.pic_url.compress) {
              this.$message.warning('图片没有上传')
            } else {
              this.$emit('serviceOk', this.form)
            }
          } else {
            return false
          }
        })
      }
    },
    // 赋值给form
    getFormValue() {
      this.formInfoList.forEach(item => {
        if (item.type === 'img') {
          this.form[item.prop] = item.value
        } else {
          this.form[item.prop] = item.value
        }
      })
      return true
    },
    // 赋值给infolist
    getlistValue() {
      this.formInfoList.forEach(item => {
        if (item.type === 'img') {
          item.value = this.form[item.prop]
        } else {
          item.value = this.form[item.prop]
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  display: inline-block;
  width: 80%;
}
</style>
