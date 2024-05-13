<template>
  <div class="add-tags">
    <section id="operator-tag-group-dialog">
      <p class="dialog-title dialog-tag-title">{{ statusText }}标签组</p>
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <!-- TODO 暂时隐藏 -->
        <!-- <div class="blue-tips-filled">
          <a-icon type="bell" theme="filled" style="color: #1890ff" />
          管理员可根据不同部门选择展示不同的标签组，部门管理员可创建部门可见的标签
        </div> -->
        <a-form-model-item label="标签组名称" prop="tagGroupName">
          <a-input v-model="form.tagGroupName" placeholder="请输入标签组名称" class="tags-name" :maxLength="15" />
        </a-form-model-item>
        <a-form-model-item label="可见范围" prop="scope">
          <a-radio-group v-model="form.scope">
            <a-radio :value="0">
              全部员工
            </a-radio>
            <a-radio :value="1">
              部门可用
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item v-if="form.scope === 1" label="选择可用部门">
          <AddContent
            title="请选择部门"
            type="wxDepartmentId"
            tip=""
            :dataList="selectList"
            @selectPerson="selectPerson"
          >
          </AddContent>
        </a-form-model-item>
        <FormlabelAdd :form="form"></FormlabelAdd>
      </a-form-model>
    </section>
    <div class="foot-button">
      <a-space :size="12">
        <a-button @click="$emit('cancle')">取消</a-button>
        <a-button type="primary" @click="submitForm('ruleForm')">确定</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import AddContent from '@/component/AddContent'
import FormlabelAdd from '@/component/tags/FormlabelAdd'
import { addOrEditTagGroup } from '@/api/customerService/tags'
export default {
  props: {
    tagDetail: {
      type: [Object],
      default() {
        return {}
      }
    }
  },
  computed: {
    statusText() {
      return this.tagDetail.groupId ? '修改' : '新增'
    }
  },
  data() {
    return {
      formLayout: 'horizontal',
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      selectList: [],
      form: {
        tagGroupName: '',
        scope: 0,
        value: '',
        tagList: [
          {
            value: '',
            key: Date.now()
          }
        ]
      },
      rules: {
        tagGroupName: [
          {
            required: true,
            message: '标签组名称不能为空'
          }
        ],
        tagList: [
          {
            required: true,
            message: '标签名称不能为空'
          }
        ]
      }
    }
  },
  created() {
    if (this.tagDetail?.groupId) {
      this.form = {
        tagGroupName: this.tagDetail.groupName,
        scope: this.tagDetail.depScope ? 1 : 0,
        tagList: this.tagDetail.tags.map(item => {
          return {
            ...item,
            value: item.tagName,
            key: item.tagId,
            tagId: item.tagId,
            wxTagId: item.wxTagId
          }
        })
      }
      if (this.tagDetail.depNames && this.tagDetail.depScope) {
        const nameList = this.tagDetail.depNames.split(',')
        const idList = this.tagDetail.depScope.split(',')
        this.selectList = nameList.map((item, index) => {
          return {
            icon: 'file',
            key: idList[index],
            source: {
              departmentId: idList[index],
              wxDepartmentId: idList[index],
              name: item
            },
            title: item
          }
        })
      }
    }
    console.log(this.tagDetail)
  },
  components: {
    AddContent,
    FormlabelAdd
  },
  methods: {
    selectPerson(list) {
      this.selectList = list
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.validate()
            .then(() => {
              this.addOrEditTagGroup()
            })
            .catch(error => {
              this.$message.warning(error.message || error)
            })
        } else {
          return false
        }
      })
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (this.form.scope === 1 && this.selectList.length < 1) {
          reject('请选择部门')
        }
        const taglist = this.form.tagList
        for (let index = 0; index < taglist.length; index++) {
          const element = taglist[index]
          if (!element.value) {
            reject('请填写标签名称')
          }
          for (let i = index + 1; i < taglist.length; i++) {
            if (element.value === taglist[i].value) {
              reject(`第${index + 1}个和第${i + 1}个标签名重复`)
            }
          }
        }
        resolve()
      })
    },
    getAddParams() {
      const params = {
        tagGroupName: this.form.tagGroupName,
        scope: this.form.scope,
        addOrEditTags: this.form.tagList?.map(item => {
          return {
            tagName: item.value
          }
        }),
        departments: this.selectList?.map(item => {
          return {
            wxDepartmentId: item.source.wxDepartmentId
          }
        })
      }
      return params
    },
    getEditParams() {
      const delTags = [],
        addOrEditTags = []
      this.tagDetail.tags.forEach(item => {
        const index = this.form.tagList.findIndex(tag => {
          if (item.wxTagId === tag.wxTagId) {
            return tag
          }
        })
        if (index < 0) {
          delTags.push({
            tagName: item.tagName,
            wxTagId: item.wxTagId
          })
        }
      })
      this.form.tagList.forEach(tag => {
        if (!tag.wxTagId) {
          addOrEditTags.push({
            tagName: tag.value
          })
        } else {
          this.tagDetail.tags.forEach(item => {
            if (item.wxTagId === tag.wxTagId && item.tagName !== tag.value) {
              addOrEditTags.push({
                tagName: tag.value,
                wxTagId: item.wxTagId
              })
            }
          })
        }
      })
      this.form.tagList?.map(item => {
        return {
          tagName: item.value,
          wxTagId: item.wxTagId
        }
      })
      const params = {
        wxGroupId: this.tagDetail.wxGroupId,
        tagGroupName: this.form.tagGroupName,
        scope: this.form.scope,
        delTags: delTags,
        addOrEditTags: addOrEditTags,
        departments: this.selectList?.map(item => {
          return {
            wxDepartmentId: item.source.wxDepartmentId
          }
        })
      }
      if (this.form.scope === 0) {
        delete params.departments
      }
      return params
    },
    addOrEditTagGroup() {
      const params = this.tagDetail?.groupId ? this.getEditParams() : this.getAddParams()
      addOrEditTagGroup(params)
        .then(() => {
          this.$message.success(`${this.statusText}标签成功`)
          this.$emit('serviceOk')
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
    },
    removeDomain(item) {
      const index = this.form.tagList.indexOf(item)
      if (index !== -1) {
        this.form.tagList.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped lang="less">
#operator-tag-group-dialog {
  max-height: 500px;
  overflow: auto;
}
.dialog-tag-title {
  margin-bottom: 16px;
}
.dialog-title {
  font-size: 17px;
  width: 100%;
  text-align: center;
  margin-top: 2px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 1px;
}
.blue-tips-filled {
  background: #effaff;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 18px;
  padding: 8px 12px;
  margin-bottom: 24px;
}
.tags-name {
  margin-right: 8px;
  width: 361px;
  height: 36px;
}
.foot-button {
  text-align: right;
}
</style>
