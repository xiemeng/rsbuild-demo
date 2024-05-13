<template>
  <div>
    <h6 class="dialog-title">{{ title }}</h6>
    <div class="tips" v-if="tips">
      <slot name="tips">
        {{ tips }}
      </slot>
    </div>
    <a-spin :spinning="spinning">
      <a-transfer
        class="transfer"
        show-search
        :data-source="dataSource"
        :target-keys="targetKeys"
        :render="item => item.title"
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
            @expand="expand"
            :expandedKeys="defaultExpandedKeys"
            :load-data="onLoadData"
            :checkedKeys="[...selectedKeys, ...targetKeys]"
            :treeData="filterleftTreeData"
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
              <div class="title-chilred" v-if="info.dataRef.source.staffId">
                <a-avatar :size="40" :src="info.dataRef.source.thumbAvatar" shape="square"></a-avatar>
                <div class="info-wrap">
                  <p>{{ info.dataRef.source.name }}</p>
                  <a-tag>{{ info.dataRef.source.roleName }}</a-tag>
                </div>
              </div>
              <div v-else>{{ info.title }}</div>
              <a-radio
                :checked="[...selectedKeys, ...targetKeys].includes(info.key)"
                v-if="info.dataRef.selectable"
              ></a-radio>
            </div>
          </a-tree>
          <ul v-else class="right-wrap">
            <li v-for="item in filterRightTreeData" :key="item.key">
              <div class="title-chilred">
                <a-icon class="icon" v-if="item.icon" :type="item.icon" />
                <a-avatar class="img" v-else :size="40" :src="item.source.thumbAvatar" shape="square"></a-avatar>
                <div class="info-wrap">
                  <a-tooltip :title="item.source.name">
                    <p>{{ item.source.name }}</p>
                  </a-tooltip>
                  <a-tag v-if="!item.icon">{{ item.source.roleName }}</a-tag>
                </div>
              </div>
              <a-icon type="close" @click="canclePerson(item)" />
            </li>
          </ul>
        </template>
      </a-transfer>
    </a-spin>

    <div class="foot-button">
      <a-space :size="12">
        <a-button @click="$emit('cancle')">取消</a-button>
        <a-button type="primary" @click="$emit('serviceOk', filterRightTreeData)">确定</a-button>
      </a-space>
    </div>
  </div>
</template>
<script>
import { getStaff, department, departmentStaff, getQuitStaff, getDepartmentStaff } from '@/api/businessAdmin'
import { getPage, groupList } from '@/api/getCilent/channelCode'
import { getCustGrpList, getCustGrpOwner } from '@/api/clientBaseOperation/groupList'
export default {
  name: 'AddTransfer',
  props: {
    selectList: {
      type: [Array],
      default() {
        return []
      }
    },
    // 最大选择限制
    maxLength: {
      type: [String, Number],
      default: 9999
    },
    title: {
      type: [String],
      default: '选择成员'
    },
    // 提示语
    tips: {
      type: [String],
      default: ''
    },
    // 人员类型 员工就传员工id,部门就传部门id 该id值由后台接口定义
    type: {
      type: [String],
      default: 'wxDepartmentId'
    },
    // 需要禁止选中的id
    selectRoleIdList: {
      type: [Array, String],
      default() {
        return ''
      }
    },
    // 需要禁止选中的key值
    disabledId: {
      type: [String],
      default: 'roleId'
    }
  },
  data() {
    return {
      targetKeys: [],
      dataSource: [],
      treeData: [],
      spinning: false,
      searchLeftTreeData: '', // 左搜索框
      rightSearch: '', // 右搜索框的值
      defaultExpandedKeys: [],
      pagination: {
        current: 1,
        pageSize: 500,
        total: 0
      }
    }
  },
  watch: {
    selectList: {
      handler() {
        if (this.type === 'deptId' && (this.selectList[0]?.source?.userIds || this.selectList[0]?.source?.userid)) {
          this.dataSource.push(...this.flatten(JSON.parse(JSON.stringify(this.selectList))))
        }
        if (this.type === 'groupList' && this.selectList[0]?.source?.id) {
          this.dataSource.push(...this.flatten(JSON.parse(JSON.stringify(this.selectList))))
        }
        this.targetKeys = this.selectList?.map(item => {
          return item.key
        })
      },
      immediate: true
    }
  },
  computed: {
    filterleftTreeData() {
      return this.searchLeftTreeData ? this.searchLeftTreeData : this.treeData
    },
    filterRightTreeData() {
      console.log(this.targetItems)
      return this.targetItems.filter(item => {
        return item.source.name.search(this.rightSearch) >= 0
      })
    },
    targetItems() {
      const list = this.dataSource.filter(item => {
        const target = this.targetKeys.includes(item.key)
        if (target) {
          if (item.source.wxDepartmentId) {
            item.icon = 'file'
          }
          return item
        }
      })

      // 去除重复数据
      let newArray = []
      const obj = {}
      if (list?.length > 1) {
        for (let index = 0; index < list.length; index++) {
          const element = list[index].key
          if (!obj[element]) {
            obj[element] = 1
            newArray.push(list[index])
          }
        }
      } else {
        newArray = list
      }
      // 合并传进来的数据
      if (!['groupList'].includes(this.type)) {
        newArray.forEach(item => {
          this.selectList.forEach(select => {
            if (item.source.groupId && item.source.groupId == select.source.groupId) {
              item.source = {
                ...item.source,
                ...select.source
              }
            }
          })
        })
      }
      return newArray
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 展开收起节点
    expand(expandedKeys) {
      this.defaultExpandedKeys = expandedKeys
    },
    getDataList() {
      this.spinning = true
      switch (this.type) {
        case 'staffId': // 获取客服人员列表  注：需要使用 staffId的场景，请使用 deptId
          getStaff({ name: '' })
            .then(res => {
              this.treeData = this.getTreeData(res.data, 'staffId')
              this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
            })
            .catch(error => {
              this.$message.error(error || error.message)
            })
            .finally(() => {
              this.spinning = false
            })
          break
        case 'wxDepartmentId': // 获取部门列表
          department()
            .then(res => {
              this.treeData = this.getTreeData(res.data, 'wxDepartmentId')
              this.defaultExpandedKeys = [this.treeData[0]?.key]
              this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
            })
            .catch(error => {
              this.$message.error(error || error.message)
            })
            .finally(() => {
              this.spinning = false
            })
          break
        case 'deptId': // 获取所有部门下的员工
          departmentStaff()
            .then(res => {
              this.treeData = this.getTreeData(res.data, 'deptId')
              this.defaultExpandedKeys = [this.treeData[0]?.key]
              this.dataSource.push(...this.flatten(JSON.parse(JSON.stringify(this.treeData))))
            })
            .catch(error => {
              this.$message.error(error?.message)
            })
            .finally(() => {
              this.spinning = false
            })
          break
        case 'custGrpList': //群聊列表
          const params = {
            filterType: 0,
            grpStatus: 0,
            orderCondition: 1,
            orderWay: 1,
            date: '',
            currentPage: 1,
            pageSize: 9999
          }
          getCustGrpList(params)
            .then(res => {
              this.treeData = this.getTreeData(res.data.list, 'groupId')
              this.defaultExpandedKeys = [this.treeData[0]?.key]
              this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
            })
            .catch(error => {
              this.$message.error(error || error.message)
            })
            .finally(() => {
              this.spinning = false
            })
          break
        case 'getQuitStaff': //获取离职员工
          getQuitStaff({ name: '' })
            .then(res => {
              this.treeData = this.getTreeData(res.data.list, 'staffId')
              this.defaultExpandedKeys = [this.treeData[0]?.key]
              this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
            })
            .catch(error => {
              this.$message.error(error || error.message)
            })
            .finally(() => {
              this.spinning = false
            })
          break
        case 'groupList': //获取渠道活码分组列表
          var param = {
            pageSize: 999,
            currentPage: 1
          }
          groupList(param)
            .then(res => {
              this.treeData = this.getTreeData(res.data.list, 'id')
              this.defaultExpandedKeys = [this.treeData[0]?.key]
              this.dataSource.push(...this.flatten(JSON.parse(JSON.stringify(this.treeData))))
            })
            .catch(error => {
              this.$message.error(error || error.message)
            })
            .finally(() => {
              this.spinning = false
            })
          break
        case 'groupOwnId': // 获取群主列表
          getCustGrpOwner({ ownerName: '' })
            .then(res => {
              this.treeData = this.getTreeData(res.data, 'staffId')
              this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
            })
            .catch(error => {
              this.$message.error(error || error.message)
            })
            .finally(() => {
              this.spinning = false
            })
          break
      }
    },
    // 异步加载数据
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (this.type === 'groupList' && !treeNode.dataRef.children) {
          this.getPageData(treeNode)
        }
        if (this.type === 'deptId') {
          let isStaff = false
          if (treeNode.dataRef.children) {
            const staff = treeNode.dataRef.children.find(item => item.staffId || item.source.staffId)
            if (staff) {
              isStaff = true
            }
          }
          if ((treeNode.dataRef.children || this.type !== 'deptId') && isStaff) {
            resolve()
            return
          }
        } else {
          if (treeNode.dataRef.children || this.type !== 'deptId') {
            resolve()
            return
          }
        }
        this.getDepartmentStaff(treeNode.dataRef.source.deptId)
          .then(res => {
            if (res) {
              if (!treeNode.dataRef.children) {
                treeNode.dataRef.children = []
              }
              treeNode.dataRef.children.push(...res)
              this.treeData = [...this.treeData]
              this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
            }
          })
          .finally(() => {
            resolve()
          })
      })
    },
    // 得到渠道码接口
    getPageData(treeNode) {
      const params = {
        groupId: treeNode.dataRef.source.id,
        currentPage: 1,
        pageSize: 9999
      }
      getPage(params)
        .then(res => {
          treeNode.dataRef.children = this.getTreeData(res.data.list, 'id')
          this.treeData = [...this.treeData]
          this.dataSource = this.flatten(JSON.parse(JSON.stringify(this.treeData)))
          this.dataSource.push(...this.flatten(JSON.parse(JSON.stringify(this.selectList))))
        })
        .catch(error => {
          this.$message.error(error)
        })
    },
    // 通过部门id获取员工
    getDepartmentStaff(deptId) {
      return getDepartmentStaff({ deptId: deptId })
        .then(res => {
          return this.getTreeData(res.data, 'deptId')
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
    },
    // 取消选中
    canclePerson(target) {
      const index = this.targetKeys.findIndex(item => {
        return item === target.key
      })
      if (index >= 0) this.targetKeys.splice(index, 1)
    },
    // 得到穿梭框数据
    flatten(list = []) {
      const transferDataSource = []
      list.forEach(item => {
        transferDataSource.push({
          key: item.key,
          title: item.title || item.key,
          source: item.source,
          disabled: false
        })
        if (item.children) {
          transferDataSource.push(...this.flatten(item.children))
        }
      })
      return transferDataSource
    },
    // 得到树形结构数据
    getTreeData(list, key) {
      const newList = []
      if (list?.length > 0) {
        list.forEach(item => {
          let obj = {
            key: String(item[key]),
            title: item.name || item.groupName || item.deptName || item.group_name,
            source: item,
            disabled: this.selectRoleIdList?.includes(item[this.disabledId]) ? true : false,
            selectable: this.selectRoleIdList && !item.userid ? false : true,
            scopedSlots: {
              title: 'title'
            },
            children: item.children && this.getTreeData(item.children, key),
            isLeaf: item.children ? false : true
          }
          // 获取部门下的员工
          if (this.type === 'deptId') {
            obj.key = item.userid ? String(item.userid) : String(item.deptId)
            obj.isLeaf = item.userid ? true : false
            if (item.staffs) {
              obj.children = obj.children
                ? this.getTreeData(item.staffs, key).concat(obj.children)
                : this.getTreeData(item.staffs, key)
            }
          }
          // case 'groupList'://获取渠道活码分组列表
          if (this.type === 'groupList') {
            if (item.group_name) {
              obj.key = 'group_' + String(item[key])
            }
            obj.isLeaf = item.tagList ? true : false
            obj.selectable = item.group_name ? false : true
          }
          if (!obj.children) delete obj.children
          // 获取群列表
          if (key == 'groupId') {
            obj = {
              key: String(item[key]),
              title: item.groupName,
              source: {
                ...item,
                staffId: item.staffId,
                name: item.groupName,
                thumbAvatar: '/icons/groupChat.png'
              },
              scopedSlots: {
                title: 'title'
              },
              disabled: this.selectRoleIdList.includes(item[this.disabledId]) ? true : false,
              selectable: this.selectRoleIdList.length > 0 && item.children ? false : true,
              name: item.ownerName,
              isLeaf: true
            }
          }
          newList.push(obj)
        })
      }
      return newList
    },
    handleChange(targetKeys) {
      this.targetKeys = targetKeys
      this.$emit('getTargetKeys', this.targetKeys)
    },
    // 搜索
    handleSearch(dir, value) {
      console.log(dir, value)
      if (dir === 'left') {
        if (this.type === 'deptId' && value) {
          this.searchStaffName(value?.trim()).then(res => {
            this.searchLeftTreeData = res || []
            this.dataSource.push(...this.flatten(JSON.parse(JSON.stringify(this.searchLeftTreeData))))
          })
        } else {
          this.searchLeftTreeData = this.getSearchLeftTreeData(this.treeData, value)
        }
      } else {
        this.rightSearch = value
      }
    },
    getSearchLeftTreeData(list, value) {
      if (!value) return list
      const searchLeftTreeData = []
      const reg = new RegExp(value, 'i')
      list.forEach(item => {
        if (item.title.search(reg) >= 0) {
          searchLeftTreeData.push(item)
        }
        if (item.children) {
          searchLeftTreeData.push(...this.getSearchLeftTreeData(item.children, value))
        }
      })
      return searchLeftTreeData
    },
    searchStaffName(name) {
      this.spinning = true
      const params = {
        currentPage: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: name
      }
      return getStaff(params)
        .then(res => {
          return this.getTreeData(res.data.list, 'staffId')
        })
        .catch(error => {
          this.$message.error(error || error.message)
        })
        .finally(() => {
          this.spinning = false
        })
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node
      if (this.maxLength && checkedKeys.length >= this.maxLength && !this.isChecked(checkedKeys, eventKey)) {
        this.$message.warning(`最多只能选取${this.maxLength}个`)
      } else {
        itemSelect(eventKey, !this.isChecked(checkedKeys, eventKey))
      }
    },
    isChecked(selectedKeys, eventKey) {
      return selectedKeys.indexOf(eventKey) !== -1
    }
  }
}
</script>
<style lang="less" scoped>
.transfer {
  height: 420px;
}
.transfer-tree,
.right-wrap {
  height: 320px;
  overflow: auto;
  width: 270px;
}
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-chilred {
  display: flex;
  align-items: center;
  .info-wrap {
    margin-left: 8px;
    p {
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
.tips {
  background: #effaff;
  border-radius: 2px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 17px;
  padding: 10px 13px;
  margin-bottom: 16px;
}
</style>
