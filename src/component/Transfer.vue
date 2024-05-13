// 不要使用我，即将删除，请使用   addTransfer或者  addContent
<template>
  <div>
    <h6 class="dialog-title">选择成员</h6>
    <a-transfer
      class="transfer"
      :data-source="dataSource"
      :target-keys="targetKeys"
      :filter-option="filterOption"
      :render="(item) => item.title"
      :show-select-all="false"
      @search="handleSearch"
      @change="handleChange"
    >
      <template slot="children" slot-scope="{ props: { direction, selectedKeys }, on: { itemSelect } }">
        <a-tree
          v-if="direction === 'left'"
          class="transfer-tree"
          blockNode
          checkStrictly
          defaultExpandAll
          :checkedKeys="[...selectedKeys, ...targetKeys]"
          :treeData="treeData"
          @check="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect)
            }
          "
          @select="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect)
            }
          "
        >
          <div slot="title" slot-scope="info" class="title-wrap">
            <div class="title-chilred" v-if="info.dataRef.staffId">
              <a-avatar :size="40" v-if="info.title && info.title.thumbAvatar" :src="info.title.thumbAvatar" shape="square"></a-avatar>
              <div class="info-wrap">
                <p>{{ info.title.name }}</p>
                <a-tag>{{ info.title.roleName }}</a-tag>
              </div>
            </div>
            <div v-else>{{ info.title }}</div>
            <a-radio :checked="[...selectedKeys, ...targetKeys].includes(info.key)"></a-radio>
          </div>
        </a-tree>
        <ul v-else class="right-wrap">
          <li v-for="item in targetItems" :key="item.title">
              <div>
                <a-icon class="icon" v-if="item.icon" :type="item.icon" />
                <a-avatar class="img" v-if="item.info && item.info.thumbAvatar" :size="40" :src="item.info.thumbAvatar" shape="square"></a-avatar>
                <span>{{ item.title }}</span>
              </div>
              <a-icon type="close" @click="canclePerson(item)"/>
          </li>
        </ul>
      </template>
    </a-transfer>
    <div class="foot-button">
      <a-space :size="12">
        <a-button @click="$emit('cancle')">取消</a-button>
        <a-button type="primary" @click="$emit('serviceOk',targetItems)">确定</a-button>
      </a-space>
    </div>

  </div>
</template>
<script>
import { departmentStaff } from '@/api/businessAdmin'
export default {
  name: 'Transfer',
  props: ['selectRoleId', 'serviceList'],
  data() {
    return {
      targetKeys: [],
      dataSource: [],
      treeData: [],
    }
  },
  computed: {
    targetItems() {
        const list = this.dataSource.filter(item => {
          const target = this.targetKeys.includes(item.key)
          if(target){
            if(!item.info){
              item.icon = 'file'
            }
            return item
          }
        })
        return list
    }
  },
  created() {
    this.getDepartmentStaff()
  },
  watch: {
    serviceList: {
      handler() {
        this.targetKeys = this.serviceList?.map(item => {
          return item.key
        })
        console.log(this.targetKeys,this.serviceList)
      },
      immediate: true
    }
  },
  methods: {
    // 取消选中
    canclePerson(target) {
        const index = this.targetKeys.findIndex(item => {
          return item.key === target.key
        })
        if(index)this.targetKeys.splice(index,1)
    },
    getDepartmentStaff() {
      departmentStaff().then((res) => {
        if (res?.data?.list?.length > 0) {
          this.treeData = this.getTreeData(res.data.list)
          this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
        }
      })
    },
    flatten(list = []) {
      const transferDataSource = []
      list.forEach((item) => {
          transferDataSource.push(item);
          if (item?.children) {
            item.children.forEach((children) => {
              const obj = {
                title: children.title.name,
                info: children.title,
                key: children.key,
                staffId: children.staffId
              }
              transferDataSource.push(obj)
            })
          }
      })
      return transferDataSource
    },
    // 得到树形结构数据
    getTreeData(list, children) {
      if (list?.length > 0) {
        const treeList = list.map((item) => {
          const obj = {
            title: item.deptName || item.name,
            deptId: item.deptId,
            staffId: item.staffId,
            roleId: item.roleId,
            scopedSlots: {
              title: 'title'
            },
            children: undefined,
          }
          obj.key = item.staffInfos ? String(item.deptId) : String(item.userid + item.deptId)
          if (children) {
            obj.title = {
              thumbAvatar: item.thumbAvatar,
              name: item.name,
              roleName: item.roleName,
            }
            obj.disabled = this.selectRoleId === item.roleId ? true : false
          }
          if (item.staffInfos) {
            obj.children = this.getTreeData(item.staffInfos, 'children')
          }
          return obj
        })
        return treeList
      }
    },
    handleChange(targetKeys) {
      this.targetKeys = targetKeys
      this.$emit('getTargetKeys', this.targetKeys)
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node
      itemSelect(eventKey, !this.isChecked(checkedKeys, eventKey))
    },
    isChecked(selectedKeys, eventKey) {
      return selectedKeys.indexOf(eventKey) !== -1
    },
    filterOption(inputValue, option) {
      return option.title.name.indexOf(inputValue) > -1
    },
    handleSearch(dir, value) {
      console.log(dir, value)
    },
  },
}
</script>
<style lang="less" scoped>
.transfer {
  height: 400px;
}
.transfer-tree, .right-wrap {
  height: 300px;
  overflow: auto;
}
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title-chilred {
    display: flex;
    align-items: center;
    .info-wrap {
      margin-left: 8px;
    }
  }
}
.right-wrap li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .icon {
    color: rgb(71, 167, 255);
    margin-right: 10px;
  }
  .img {
    margin-right: 10px;
  }
}
/deep/ .ant-tree li .ant-tree-node-content-wrapper {
  height: auto;
}
.foot-button {
  text-align: right;
  padding: 15px;
}
</style>