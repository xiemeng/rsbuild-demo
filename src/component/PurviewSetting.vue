<template>
  <a-modal v-model="visiblePurviewSetting" title="权限设置" @ok="ok" @cancel="cancel" destroyOnClose>
    <a-form layout="inline">
      <a-form-item label="设置角色:">
        <a-select style="width: 200px" v-model="selectRole">
          <a-select-option v-for="item in roles" :key="item.roleId" :value="item.roleId">
            {{ item.roleName }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <div>
      <div class="font-color-black-25" v-if="findSelectRoles && findSelectRoles.desc">{{ findSelectRoles.desc }}</div>
      <div class="department-box" v-if="findSelectRoles && findSelectRoles.children">
        <a-tree v-model="checkedKeys" checkable :auto-expand-parent="autoExpandParent" :tree-data="treeData">
          <a-icon slot="switcherIcon" type="caret-down" class="primaryColor" />
        </a-tree>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { changeRole } from '@/api/businessAdmin'
export default {
  name: 'PurviewSetting',
  props: ['value', 'roles', 'selectRoleId', 'staffId', 'roleName'],
  data() {
    return {
      visiblePurviewSetting: false,
      selectRole: '',
      autoExpandParent: true,
      checkedKeys: []
    }
  },
  computed: {
    findSelectRoles() {
      return this.roles?.find(item => {
        return item.roleId === this.selectRole
      })
    },
    treeData() {
      let list = []
      if (this.findSelectRoles?.children?.length > 0) {
        list = this.getTreeData(this.findSelectRoles.children)
      }
      console.log(list)
      return list
    }
  },
  watch: {
    value() {
      this.visiblePurviewSetting = this.value
    },
    selectRoleId: {
      handler() {
        this.selectRole = this.selectRoleId
      },
      immediate: true
    },
    roleName: {
      handler() {
        this.selectRole = this.roles?.find(item => {
          return item.roleName === this.roleName
        })?.roleId
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    // 得到树形结构数据
    getTreeData(list) {
      if (list?.length > 0) {
        const treeList = list.map(item => {
          const obj = {
            title: item.roleName,
            key: item.roleId,
            slots: {
              icon: 'smile'
            },
            children: undefined
          }
          if (item.children) {
            obj.children = this.getTreeData(item.children)
          }
          return obj
        })
        return treeList
      }
    },
    cancel() {
      this.visiblePurviewSetting = false
      this.$emit('input', this.visiblePurviewSetting)
    },
    ok() {
      this.visiblePurviewSetting = false
      this.$emit('input', this.visiblePurviewSetting)
      const params = this.getParams()
      changeRole(params)
        .then(res => {
          this.$message.success('切换角色成功')
          this.$emit('changeRoleId', this.selectRole)
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
    },
    getParams() {
      let roleIds = this.selectRole
      if (this.findSelectRoles.children) {
        roleIds = this.checkedKeys.join(',')
      }
      return {
        staffId: this.staffId,
        roleIds: roleIds
      }
    }
  }
}
</script>
<style lang="less" scoped>
.department-box {
  margin-top: 20px;
  width: 460px;
  height: 223px;
  overflow: auto;
  padding-left: 24px;
  padding-top: 10px;
  background: #f9f9f9;
}
</style>
