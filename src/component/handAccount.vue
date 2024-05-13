<template>
  <a-form-model
    class="ruleForm"
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="editorId" label="剪辑手" prop="editorId">
      <a-select
        mode="multiple"
        label-in-value
        :value="form.editorId"
        placeholder="请输入剪辑手"
        class="item"
        :filter-option="false"
        :not-found-content="fetching ? undefined : null"
        @search="fetchUserSeach"
        @change="handleChange"
        style="width:300px"
      >
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />
        <a-select-option v-for="d in userArrList" :key="d.value">
          {{ d.text }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :label="`${platForm}号`" required prop="account_no">
      <a-input placeholder="请输入" v-model="form.account_no" />
    </a-form-model-item>
    <a-form-model-item :label="`${platForm}昵称`" required prop="nickname">
      <a-input placeholder="请输入" v-model="form.nickname" />
    </a-form-model-item>
    <a-form-model-item label="手机号" prop="mobile"
      :rules="[{
        required: true,
        message: '请输入手机号',
        trigger: 'blur',
      },{
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入有效的手机号',
      trigger: 'change',
    }]"
    >
      <a-input-number :maxLength="11" placeholder="请输入" style="width: 300px" v-model="form.mobile"></a-input-number>
    </a-form-model-item>
    <a-form-model-item label="账号类型" required prop="accountType" v-if="platFormValue!='1'">
      <a-select style="width: 300px" placeholder="请选择账号类型"  v-model="form.accountType">
        <a-select-option value="7">普通号</a-select-option>
        <a-select-option value="8">企业号-公司主体</a-select-option>
        <a-select-option value="9">企业号-外部服务商</a-select-option>
        <a-select-option value="10">企业号-个体工商户</a-select-option>
        <a-select-option value="11">员工授权号</a-select-option>
        <a-select-option value="6">员工号</a-select-option>
        <a-select-option value="5">KOC账号</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="账号类型" required prop="accountType" v-else>
      <a-select style="width: 300px" placeholder="请选择账号类型"  v-model="form.accountType">
        <a-select-option value="1">普通号</a-select-option>
        <a-select-option value="2">客服号</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="账号级别" required prop="accountLevel">
      <a-select style="width: 300px" placeholder="请选择账号级别"  v-model="form.accountLevel">
        <a-select-option :value="1">核心运营账号</a-select-option>
        <a-select-option :value="2">次要运营账号</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="是否ip号" required prop="isIp">
      <a-select style="width: 300px" placeholder="请选择是否ip号"  v-model="form.isIp">
        <a-select-option value="1">是</a-select-option>
        <a-select-option value="0">否</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="ip属地" required prop="ipLocation">
      <a-select style="width: 300px" placeholder="请选择ip属地"  v-model="form.ipLocation" show-search
      :filterOption="filterOption">
        <a-select-option :value="item.name" v-for="(item,index) in areaIpList" :key="index">{{item.name}}</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="平台" required prop="platForm">
      <a-select style="width: 300px" placeholder="请选择平台" disabled  v-model="form.platForm">
        <a-select-option value="0">抖音</a-select-option>
        <a-select-option value="1">视频号</a-select-option>
        <a-select-option value="2">快手</a-select-option>
        <a-select-option value="3">B站</a-select-option>
        <a-select-option value="4">小红书</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="分类" required prop="category">
      <a-select style="width: 300px" placeholder="请选择分类"  v-model="form.category">
        <a-select-option value="全职">全职</a-select-option>
        <a-select-option value="兼职">兼职</a-select-option>
        <a-select-option value="2B">2B</a-select-option>
        <a-select-option value="TM-老师">TM-老师</a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- <a-form-model-item label="人群定位" required prop="personPosition">
      <a-select style="width: 300px" placeholder="请选择人群定位"  v-model="form.personPosition">
        <a-select-option :value="item.id" v-for="(item,index) in renqundingweiList" :key="index">{{item.name}}</a-select-option>
      </a-select>
    </a-form-model-item> -->
    <a-form-model-item label="八大人群" required prop="crowd">
      <a-select style="width: 300px" placeholder="请选择八大人群"  v-model="form.crowd">
        <a-select-option :value="1">小镇青年</a-select-option>
        <a-select-option :value="2">小镇中老年</a-select-option>
        <a-select-option :value="3">Z时代</a-select-option>
        <a-select-option :value="4">精致妈妈</a-select-option>
        <a-select-option :value="5">新锐白领</a-select-option>
        <a-select-option :value="6">资深中产</a-select-option>
        <a-select-option :value="7">都市银发</a-select-option>
        <a-select-option :value="8">都市蓝领</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="市场地域" required prop="marketArea">
      <a-cascader
        :options="optionCity"
        style="width: 300px" placeholder="市场地域"
        v-model="form.marketArea"
      />
    </a-form-model-item>
    <a-form-model-item label="行业细分" required prop="industry">
      <a-select style="width: 300px" placeholder="请选择行业细分"  v-model="form.industry">
        <a-select-option value="生活日化">生活日化</a-select-option>
        <a-select-option value="美妆时尚">美妆时尚</a-select-option>
        <a-select-option value="少儿">少儿</a-select-option>
        <a-select-option value="老人">老人</a-select-option>
        <a-select-option value="宝妈">宝妈</a-select-option>
        <a-select-option value="学生">学生</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="产品定位" required prop="productPosition">
      <a-select style="width: 300px" placeholder="请选择产品定位"  v-model="form.productPosition">
          <a-select-option :value="item.id" v-for="(item,index) in productList" :key="index">{{item.name}}</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="品牌" required prop="brand">
      <a-select style="width: 300px" placeholder="请选择品牌"  v-model="form.brand">
        <a-select-option :value="item.id" v-for="(item,index) in pinpaiList" :key="index">{{item.name}}</a-select-option>
      </a-select>
    </a-form-model-item>
    <div v-for="(item,index) in form.buList" :key="index">
      <a-form-model-item :label="`BU${index+1}`" required :prop="'buList.' + index + '.bu'"
        :rules="{
          required: true,
          message: 'bu 不能为空',
          trigger: 'blur',
        }"
      >
        <a-select style="width: 150px" placeholder="请选择分类"  v-model="item.bu">
          <a-select-option value="短视频+无人直播">短视频+无人直播</a-select-option>
          <a-select-option value="短视频+IP组">短视频+IP组</a-select-option>
          <a-select-option value="短视频+叫卖组">短视频+叫卖组</a-select-option>
        </a-select>
        <a-icon type="plus-circle" :class="['ml-15 icon-dv']" @click="addList(index)"/>
        <a-icon type="minus-circle" :class="['ml-15 icon-dv',{disBtn:1===form.buList.length}]"  @click="removeList(index)"/>
      </a-form-model-item>
      <a-form-model-item label="负责人" required :prop="'buList.' + index + '.person'"   :rules="{
          required: true,
          message: '请输入负责人',
          trigger: 'change',
        }">
        <a-select
          mode="multiple"
          label-in-value
          :value="item.person"
          placeholder="请输入负责人"
          class="item"
          :filter-option="false"
          :not-found-content="fetching ? undefined : null"
          @search="fetchUser"
          @change="value => handleChangeperson(value, index)"
          style="width:300px"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="d in userArrList" :key="d.value">
            {{ d.text }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="所在组织" required :prop="'buList.' + index + '.organization'" :rules="[{
              required: true,
              message: '请输入所在组织',
              trigger: 'blur',
            },{
      }]">
        <a-input allowClear placeholder="所在组织" style="width: 300px" v-model="item.organization"/>
      </a-form-model-item>
      <a-form-model-item label="AB角" required :prop="'buList.' + index + '.role'" :rules="[{
              required: true,
              message: '请选择分类',
              trigger: 'blur',
            },{
      }]">
        <a-select style="width: 300px" placeholder="请选择分类"  v-model="item.role">
          <a-select-option value="A角">A角</a-select-option>
          <a-select-option value="B角">B角</a-select-option>
        </a-select>
      </a-form-model-item>
      <!-- <a-form-model-item label="Code" prop="code">
        <a-input placeholder="请输入" v-model="item.code" />
      </a-form-model-item> -->
    </div>

    <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        Create
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        Reset
      </a-button>
    </a-form-model-item> -->
  </a-form-model>
</template>
<script>
import { userSearch, entryUser } from '@/api/java'
import debounce from 'lodash/debounce'
import areaList from  '@/utils/areaList.json'
export default {
  props: {
    renqundingweiList: {
      type: Array,
      default: () => {
        return []
      }
    },
    optionCity: {
      type: Array,
      default: () => {
        return []
      }
    },
    productList: {
      type: Array,
      default: () => {
        return []
      }
    },
    pinpaiList: {
      type: Array,
      default: () => {
        return []
      }
    },
    platForm: {
      type: String,
      default: ''
    },
    platFormValue: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      areaIpList:areaList,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        accountType: '7',
        isIp: '0',
        category: '全职',
        industry: '宝妈',
        productPosition: 12,
        brand: 16,
        editorId: {
          key: 1,
          label: ` ${this.$store.state.user.info.nikeName || ''}(${this.$store.state.user.info.name}) `
        },
        buList: [{
          bu: undefined,
          organization: undefined,
          role: undefined,
          person: undefined,
        }],
      },
      rules: {
        editorId: [
          { required: true, message: '请选择剪辑手', trigger: 'blur' },
        ],
        account_no: [
          { required: true, message: '请输入'+this.platForm+'号', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '请输入'+this.platForm+'昵称', trigger: 'blur' },
        ],
        accountType: [
          { required: true, message: '请选择账号类型', trigger: 'blur' },
        ],
        accountLevel: [
          { required: true, message: '请选择账号级别', trigger: 'blur' },
        ],
        isIp: [
          { required: true, message: '请选择是否ip号', trigger: 'blur' },
        ],
        ipLocation: [
          { required: true, message: '请选择ip属地', trigger: 'blur' },
        ],
        platForm: [
          { required: true, message: '请选择平台', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '请选择分类', trigger: 'blur' },
        ],
        crowd: [
          { required: true, message: '请选择八大人群', trigger: 'blur' },
        ],
        marketArea: [
          { required: true, message: '请选择市场地域', trigger: 'blur' },
        ],
        industry: [
          { required: true, message: '请选择行业细分', trigger: 'blur' },
        ],
        productPosition: [
          { required: true, message: '请选择产品定位', trigger: 'blur' },
        ],
        brand: [
          { required: true, message: '请选择品牌', trigger: 'blur' },
        ],
      },
      fetchUser: debounce((value) => {
        this.fetchUserSeach(value)
      }, 800),

      userArrList: [],
      fetching: false,
      lastFetchId: ''
    };
  },
  created(){},
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    onSubmit(callback) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const arr = []
          this.form.buList.map((item) => {
            const obj = {
              bu: item.bu,
              organization: item.organization,
              role: item.role,
              code: item.code,
              id: item.id || undefined,
              person: item.person
            }
            arr.push(obj)
          })
          const params = {
            ...this.form,
            person: arr,
          }
          delete params.buList
          entryUser(params).then(res => {
            this.$message.success('新建成功')
            callback && callback(true)
          }).catch(error => {
            this.$message.error(error)
            callback && callback()
          })
        } else {
          console.log('error submit!!');
          callback && callback()
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleChangeperson(value, index) {
      this.$set(this.form.buList[index], 'person', value)
      const obj = (value[value.length - 1])
      userSearch({ id: obj.key })
        .then((res) => {
          const obj2 = res.data[0]
          this.$set(this.form.buList[index], 'organization', obj2?.departmentName)
        })
      this.userArrList = []
      this.fetching = false
    },
    addList() {
      const obj = {
        bu: undefined,
        organization: undefined,
        role: undefined,
        person: undefined,
        code: undefined
      }
      this.form.buList.push(obj)
    },
    removeList(idx) {
      if (this.form.buList.length === 1) {
        return
      }
      this.form.buList.splice(idx, 1)
    },
    // 搜索用户
    fetchUserSeach(value) {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.fetching = true
      userSearch({ name: value })
        .then((res) => {
          console.log(res, fetchId, this.lastFetchId)
          if (fetchId !== this.lastFetchId) {
            return
          }
          const data = res.data.map((user) => ({
            text: `${user.nickname}(${user.name})`,
            value: user.id,
          }))
          this.userArrList = data

          this.fetching = false
        })
        .catch((error) => {
          this.$message.error(error || '')
        })
    },
    //选择剪辑手
    handleChange(value) {
      this.form.editorId = value[value.length - 1]
      this.userArrList = []
      this.fetching = false
    },
  },
  watch: {
    platFormValue: {
      handler() {
        this.form.platForm = this.platFormValue
        if(this.platFormValue=='1'){
          this.form.accountType='1'
        }
        if(this.platFormValue=='0'){
          this.form.accountType='9'
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.ruleForm {
  height: 600px;
  overflow: auto;
}
</style>