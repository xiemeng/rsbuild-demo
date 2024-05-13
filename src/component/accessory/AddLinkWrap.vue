<template>
  <div class="model-wrap">
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol">
      <a-button type="primary" class="choose-radar" @click="visibleRadar = true" v-if="isNeedSelectRadar">
        选择互动雷达
      </a-button>
      <a-form-model-item :label="item.title" :prop="item.prop" v-for="item in formInfoList" :key="item.prop">
        <FormList :formInfo="item" class="input"></FormList>
      </a-form-model-item>
    </a-form-model>
    <ul class="form-list">
      <li v-if="isNeedTag">
        <a-checkbox v-model="form.isTag" @change="changeTag">
          选择素材标签
        </a-checkbox>
        <div v-if="form.isTag" class="checkout-box">
          <a-button icon="plus" size="small" @click="visibleTags = true">选择标签</a-button>
          <a-tag
            v-for="(item, index) in selectTagList"
            closable
            @close="deleteTag(index)"
            :key="item.tagId"
            class="checkout-tag"
          >
            {{ item.tagName }}
          </a-tag>
        </div>
      </li>
      <li v-if="isNeedRader" v-bind:class="{ exhibition: !randerIsEdit }">
        <a-checkbox v-model="form.isRadar" :disabled="!randerIsEdit || isMaterial">
          同步到雷达链接
        </a-checkbox>
        <p class="aks-tips">使用雷达链接发送，可追踪链接打开记录，设置客户标签和客户评分</p>
        <div v-if="form.isRadar && !isMaterial" class="checkout-box">
          <div style="margin-top:10px;">
            <span>雷达标题:</span>
            <a-input
              :maxLength="30"
              v-model="form.radarTitle"
              placeholder="必填，输入标题后即可保存该条链接为雷达链接"
              style="width:300px;margin-left:10px;"
            />
          </div>
          <h4>链接追踪设置</h4>
          <div class="checkout-list">
            <a-checkbox v-model="form.behaviorNotify" :disabled="!randerIsEdit">
              <span>行为通知</span>
              <small class="aks-tips">（当客户点击雷达链接时，发送雷达链接的员工将会收到消息提醒）</small>
            </a-checkbox>
          </div>
          <div class="checkout-list">
            <a-checkbox v-model="form.activityNotify" :disabled="!randerIsEdit">
              <span>动态通知</span>
              <small class="aks-tips">（当客户点击雷达链接时，会将客户的打开行为记录在客户动态里）</small>
            </a-checkbox>
          </div>
          <div class="checkout-list">
            <a-checkbox v-model="form.isCustomerTag" :disabled="!randerIsEdit">
              <span>客户标签</span><small class="aks-tips">（给点击雷达链接的客户打上选中的标签）</small>
            </a-checkbox>
            <div v-if="form.isCustomerTag" class="checkout-box">
              <a-button icon="plus" size="small" @click="visibleCustomerTag = true">选择标签</a-button>
              <a-tag
                v-for="(item, index) in form.selectCustomerTagList"
                closable
                @close="deleteCustomerTag(index)"
                :key="item.tagId"
                class="checkout-tag"
              >
                {{ item.tagName }}
              </a-tag>
            </div>
          </div>
          <div class="checkout-list">
            <a-checkbox v-model="form.isScoreRule" :disabled="!randerIsEdit">
              <span>设置客户评分</span>
            </a-checkbox>
            <CustomerRating
              v-if="form.isScoreRule"
              :ruleDetails="form.ruleDetails"
              :randerIsEdit="randerIsEdit"
            ></CustomerRating>
          </div>
        </div>
      </li>
    </ul>
    <!-- 选择素材标签 -->
    <a-modal v-model="visibleTags" centered @ok="selectTag" destroyOnClose>
      <SelectMaterialTags ref="SelectMaterialTags" :selectTagWrap="selectTagList"></SelectMaterialTags>
    </a-modal>
    <!-- 选择客户标签 -->
    <a-modal v-model="visibleCustomerTag" :footer="null" centered destroyOnClose>
      <SelectTags
        @cancle="visibleCustomerTag = false"
        @serviceOk="serviceTagCustomer"
        :selectTagList="form.selectCustomerTagList"
      ></SelectTags>
    </a-modal>
    <!-- 选择互动雷达 -->
    <a-modal v-model="visibleRadar" centered :footer="null" width="880px" destroyOnClose>
      <SelectRadar @cancle="visibleRadar = false" @serviceOk="serviceRadar" :source="source"></SelectRadar>
    </a-modal>
  </div>
</template>

<script>
import SelectTags from '@/component/tags/SelectTags'

import SelectRadar from './SelectRadar'
import FormList from '@/component/accessory/FormList'
import SelectMaterialTags from '@/views/customerConversion/enterpriseMaterial/SelectMaterialTags'
import CustomerRating from './CustomerRating'
import { validateHttp, getUrlValue } from '@/utils/util'
export default {
  name: 'AddLinkWrap',
  components: { FormList, SelectMaterialTags, SelectRadar, SelectTags, CustomerRating },
  props: {
    // 编辑的数据
    editData: {
      type: Object,
      default() {
        return {}
      }
    },
    isNeedTag: {
      type: Boolean,
      default: false
    },
    // 是否需要同步雷达
    isNeedRader: {
      type: Boolean,
      default: true
    },
    // 是否需要选择互动雷达
    isNeedSelectRadar: {
      type: Boolean,
      default: true
    },
    source: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      labelCol: { span: 5 },
      visibleTags: false,
      selectTagList: [],
      visibleRadar: false,
      visibleCustomerTag: false,
      formInfoList: [
        {
          title: '链接地址',
          prop: 'url',
          type: 'input',
          tips: '链接地址请以http 或https开头',
          maxLength: 300,
          value: 'http://'
        },
        {
          title: '链接标题',
          prop: 'linkTitle',
          type: 'input',
          tips: '请输入链接标题',
          maxLength: 30,
          value: ''
        },
        {
          title: '链接描述',
          prop: 'desc',
          type: 'textarea',
          tips: '请输入链接描述',
          maxLength: 400,
          value: ''
        },
        {
          title: '封面图',
          prop: 'coverUrl',
          type: 'img',
          tips: '',
          accept:
            '.bmp,.jpg,.jpeg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp',
          maxLength: 2097152,
          value: {}
        }
      ],
      form: {
        url: '',
        type: 'link',
        typeText: '链接',
        coverUrl: {},
        linkTitle: '',
        radarTitle: '', // 雷达标题
        desc: '',
        tag: '',
        isTag: false, // 是否需要标签
        selectCustomerTagList: [], // 客户标签
        isRadar: false, // 是否同步雷达
        isCustomerTag: false, // 是否需要客户标签
        behaviorNotify: false, // 行为通知
        activityNotify: false, // 动态通知
        isScoreRule: false, // 是否打开客户评分
        tagRule: '', // 雷达标签集合
        key: 'visibileAddLink',
        ruleDetails: [
          {
            autoMarkTagBitmaps: '', // 标签值
            selectTagList: [],
            hasTag: false, // 是否打上标签
            score: '', // 评分分数值
            ruleKind: 0, // 打开方式
            count: '' // 打开次数
          }
        ], // 规则列表
        scoreRule: '' // 客户评分
      },
      rules: {
        url: [
          { required: true, message: '未填写链接地址' },
          {
            message: '请输入正确的网络链接',
            validator(rule, value, callback) {
              console.log(validateHttp(value))
              validateHttp(value) ? callback() : callback(true)
            }
          }
        ],
        linkTitle: [
          {
            required: true,
            message: '未填写链接标题'
          }
        ],
        desc: [{ required: true, message: '未填写链接描述' }]
      },
      copyUrl: '', // 复制的旧链接
      copyUrlIsRadar: '', // 复制的旧雷达
      randar: {} // 选中的雷达链接对象
    }
  },
  computed: {
    // 雷达是否可编辑
    randerIsEdit() {
      console.log(this.randar)
      if (
        (this.state === 'edit' &&
          this.form.radarId &&
          this.form.isRadar &&
          this.copyUrl &&
          this.copyUrl === this.formInfoList[0].value) ||
        (this.randar.radarLink && this.copyUrl === this.formInfoList[0].value)
      ) {
        return false
      } else {
        return true
      }
    },
    state() {
      return this.$route.query.state
    },
    // 素材库是否可以编辑
    isMaterial() {
      if (this.editData?.type && this.isNeedTag && this.copyUrlIsRadar) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    editData: {
      handler() {
        console.log(this.editData)
        if (this.editData?.type) {
          // 素材库
          if (this.isNeedTag) {
            this.formInfoList[0].disabled = true
          }
          this.form = this.editData
          if (getUrlValue(this.editData.url, 'radarId')) {
            this.form.isRadar = true
            this.form.radarTitle = 123
          }
          if (!this.copyUrl && this.form.url) {
            this.copyUrl = JSON.parse(JSON.stringify(this.form.url))
            this.copyUrlIsRadar = this.form.isRadar
          }
          if (this.editData?.tags) {
            this.selectTagList = this.editData.tags.map(item => {
              return item
            })
            this.form.isTag = true
          }
          this.getlistValue()
        }
      },
      immediate: true
    },
    formInfoList: {
      handler() {
        console.log(this.source)
        this.form.randerIsEdit = this.randerIsEdit
        this.form.isMaterial = this.isMaterial
        this.form.source = this.source
        this.$emit('input', {
          form: this.form,
          serviceOk: this.serviceOk.bind(this)
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeTag(value) {
      this.$forceUpdate()
    },
    serviceOk() {
      let isPass = false
      if (this.getFormValue()) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            isPass = true
            return true
          } else {
            return false
          }
        })
      }
      return isPass
    },
    // 保存客户标签
    serviceTagCustomer(tagList) {
      this.form.selectCustomerTagList = tagList
        .filter(item => item.selectTagList.length > 0)
        .map(item => item.selectTagList)
        .flat()
      this.visibleCustomerTag = false
    },
    selectTag() {
      this.selectTagList = this.$refs.SelectMaterialTags.selectTagList
      this.visibleTags = false
    },
    deleteTag(index) {
      this.selectTagList.splice(index, 1)
    },
    deleteCustomerTag(index) {
      this.form.selectCustomerTagList.splice(index, 1)
    },
    // 赋值给infolist
    getlistValue() {
      this.formInfoList.forEach((item, index) => {
        item.value = this.form[item.prop]
        if (index === 3) {
          this.$set(this.formInfoList[index].value, 'value', this.form[item.prop].compress)
        }
      })
    },
    // 赋值给form + 规则校验
    getFormValue() {
      this.formInfoList.forEach(item => {
        this.form[item.prop] = item.value
      })
      if (this.form.isTag) {
        if (this.selectTagList.length < 1) {
          this.$message.warning('请选择标签')
          return false
        } else {
          this.form.tag = this.selectTagList.map(item => item.tagId).join(',')
        }
      } else {
        this.form.tag = ''
      }
      if (this.form.isRadar && !this.form.radarTitle) {
        this.$message.warning(`雷达链接标题没有填写`)
        return false
      }
      if (this.form.isRadar && this.form.isScoreRule) {
        for (let index = 0; index < this.form.ruleDetails.length; index++) {
          const item = this.form.ruleDetails[index]
          if (!item.score && item.score !== 0) {
            this.$message.warning(`规则${index + 1}的评分没有写`)
            return false
          }
          if (item.ruleKind === 1 && !item.count && item.count !== 0) {
            this.$message.warning(`规则${index + 1}的次数没有写`)
            return false
          }
          if (item.hasTag && item.selectTagList.length < 1) {
            this.$message.warning(`规则${index + 1}的标签没有填`)
            return false
          }
        }
      }
      return true
    },
    // 添加互动雷达
    serviceRadar(randar) {
      console.log(randar)
      this.randar = randar
      this.form.isRadar = true
      this.form.radarId = randar.radarId
      this.form.behaviorNotify = Boolean(this.randar.behaviorNotify)
      this.form.activityNotify = Boolean(this.randar.activityNotify)
      this.form.isCustomerTag = this.randar.tagRules?.length > 0
      this.form.selectCustomerTagList = this.randar.tagRules?.[0]?.customerTags?.map(item => {
        return {
          ...item,
          key: item.tagId
        }
      })
      this.form.isScoreRule = this.randar.scoreRules?.length > 0
      this.form.ruleDetails = this.randar.scoreRules?.map(item => {
        return {
          ...item,
          autoMarkTagBitmaps: item.autoMarkTagBitmaps, // 标签值
          selectTagList: item.customerTags?.map(item => {
            return {
              ...item,
              key: item.tagId
            }
          }),
          hasTag: Boolean(item.hasTag), // 是否打上标签
          score: item.score, // 评分分数值
          ruleKind: item.ruleKind, // 打开方式
          count: item.count // 打开次数
        }
      })
      this.form.url = this.randar.radarLink // h5地址
      this.form.coverUrl.compress = this.randar.coverUrl
      this.form.radarTitle = this.randar.radarName
      this.form.linkTitle = this.randar.title
      this.form.desc = this.randar.desc
      this.getlistValue()
      this.visibleRadar = false
      this.copyUrl = JSON.parse(JSON.stringify(this.form.url))
      console.log(this.form.coverUrl.compress)
    }
  }
}
</script>

<style lang="less" scoped>
.model-wrap {
  .input {
    display: inline-block;
    width: 70%;
  }
  .choose-radar {
    margin-left: 6%;
    margin-bottom: 10px;
  }
}
.checkout-box {
  margin-top: 10px;
  button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .checkout-tag {
    margin-bottom: 10px;
  }
  .checkout-list {
    margin-top: 10px;
  }
}
.form-list {
  padding-bottom: 10px;
}
.exhibition {
  pointer-events: none;
}
</style>
